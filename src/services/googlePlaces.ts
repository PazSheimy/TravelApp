import { Config } from '@/constants/config';
import type { Place, PlaceDetail, PlaceSearchResult } from '@/types';
import type { CityAutocomplete } from '@/types';
import { getCached, setCache } from './cache';

const API_KEY = Config.googlePlaces.apiKey;
const BASE_URL = Config.googlePlaces.baseUrl;

const TTL_SEARCH = 24 * 60 * 60 * 1000; // 24 hours
const TTL_DETAILS = 48 * 60 * 60 * 1000; // 48 hours
const TTL_GEOCODE = 7 * 24 * 60 * 60 * 1000; // 7 days

export async function autocompleteCity(input: string): Promise<CityAutocomplete[]> {
  if (!API_KEY) {
    console.warn('Google Places API key not configured');
    return [];
  }

  const cacheKey = `autocomplete:${input.toLowerCase()}`;
  const cached = await getCached<CityAutocomplete[]>(cacheKey);
  if (cached) return cached;

  const response = await fetch(`${BASE_URL}/places:autocomplete`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': API_KEY,
    },
    body: JSON.stringify({
      input,
      includedPrimaryTypes: ['(cities)'],
    }),
  });

  if (!response.ok) throw new Error('Autocomplete request failed');

  const data = await response.json();
  const results = (data.suggestions || []).map((s: any) => ({
    placeId: s.placePrediction?.placeId || '',
    name: s.placePrediction?.structuredFormat?.mainText?.text || '',
    fullName: s.placePrediction?.text?.text || '',
  }));

  await setCache(cacheKey, results, TTL_SEARCH);
  return results;
}

export async function searchPlaces(
  textQuery: string,
  location: { lat: number; lng: number },
  includedType?: string,
  pageToken?: string,
  radius?: number,
): Promise<PlaceSearchResult> {
  if (!API_KEY) {
    console.warn('Google Places API key not configured');
    return { places: [], nextPageToken: null };
  }

  const cacheKey = `search:${textQuery}:${location.lat.toFixed(3)}:${location.lng.toFixed(3)}:${includedType || ''}:${radius || 10000}:${pageToken || ''}`;
  const cached = await getCached<PlaceSearchResult>(cacheKey);
  if (cached) return cached;

  const body: any = {
    textQuery,
    locationBias: {
      circle: {
        center: { latitude: location.lat, longitude: location.lng },
        radius: radius || 10000,
      },
    },
    maxResultCount: 20,
  };

  if (includedType) body.includedType = includedType;
  if (pageToken) body.pageToken = pageToken;

  const response = await fetch(`${BASE_URL}/places:searchText`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': API_KEY,
      'X-Goog-FieldMask': 'places.id,places.displayName,places.formattedAddress,places.rating,places.userRatingCount,places.priceLevel,places.photos,places.types,places.location,places.currentOpeningHours,nextPageToken',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) throw new Error('Search request failed');

  const data = await response.json();
  const result: PlaceSearchResult = {
    places: (data.places || []).map(mapPlace),
    nextPageToken: data.nextPageToken || null,
  };

  await setCache(cacheKey, result, TTL_SEARCH);
  return result;
}

export async function getPlaceDetails(placeId: string): Promise<PlaceDetail | null> {
  if (!API_KEY) {
    console.warn('Google Places API key not configured');
    return null;
  }

  const cacheKey = `detail:${placeId}`;
  const cached = await getCached<PlaceDetail>(cacheKey);
  if (cached) return cached;

  const response = await fetch(`${BASE_URL}/places/${placeId}`, {
    headers: {
      'X-Goog-Api-Key': API_KEY,
      'X-Goog-FieldMask': 'id,displayName,formattedAddress,rating,userRatingCount,priceLevel,photos,types,location,currentOpeningHours,internationalPhoneNumber,websiteUri,editorialSummary,reviews',
    },
  });

  if (!response.ok) throw new Error('Place details request failed');

  const data = await response.json();
  const result: PlaceDetail = {
    ...mapPlace(data),
    phone: data.internationalPhoneNumber || null,
    website: data.websiteUri || null,
    hours: data.currentOpeningHours?.weekdayDescriptions || [],
    editorialSummary: data.editorialSummary?.text || null,
    photos: (data.photos || []).map((p: any) => p.name),
    reviews: (data.reviews || []).slice(0, 5).map((r: any) => ({
      authorName: r.authorAttribution?.displayName || 'Anonymous',
      rating: r.rating || 0,
      text: r.text?.text || '',
      relativeTime: r.relativePublishTimeDescription || '',
    })),
  };

  await setCache(cacheKey, result, TTL_DETAILS);
  return result;
}

export function getPhotoUrl(photoRef: string, maxWidth: number = 400): string {
  if (!API_KEY) return '';
  return `${BASE_URL}/${photoRef}/media?maxWidthPx=${maxWidth}&key=${API_KEY}`;
}

export async function geocodeCity(query: string): Promise<{ lat: number; lng: number } | null> {
  if (!API_KEY) return null;

  const cacheKey = `geocode:${query.toLowerCase()}`;
  const cached = await getCached<{ lat: number; lng: number }>(cacheKey);
  if (cached) return cached;

  const response = await fetch(`${BASE_URL}/places:searchText`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': API_KEY,
      'X-Goog-FieldMask': 'places.location',
    },
    body: JSON.stringify({
      textQuery: query,
      maxResultCount: 1,
    }),
  });

  if (!response.ok) return null;

  const data = await response.json();
  const place = data.places?.[0];
  if (!place?.location) return null;

  const result = {
    lat: place.location.latitude,
    lng: place.location.longitude,
  };

  await setCache(cacheKey, result, TTL_GEOCODE);
  return result;
}

function mapPlace(data: any): Place {
  return {
    id: data.id || '',
    name: data.displayName?.text || '',
    address: data.formattedAddress || '',
    rating: data.rating || 0,
    totalRatings: data.userRatingCount || 0,
    priceLevel: parsePriceLevel(data.priceLevel),
    photoRef: data.photos?.[0]?.name || null,
    types: data.types || [],
    location: {
      lat: data.location?.latitude || 0,
      lng: data.location?.longitude || 0,
    },
    isOpen: data.currentOpeningHours?.openNow,
  };
}

function parsePriceLevel(level: string | undefined): number {
  const map: Record<string, number> = {
    PRICE_LEVEL_FREE: 0,
    PRICE_LEVEL_INEXPENSIVE: 1,
    PRICE_LEVEL_MODERATE: 2,
    PRICE_LEVEL_EXPENSIVE: 3,
    PRICE_LEVEL_VERY_EXPENSIVE: 4,
  };
  return map[level || ''] ?? 0;
}
