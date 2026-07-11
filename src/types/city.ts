export interface City {
  placeId: string;
  name: string;
  country: string;
  location: {
    lat: number;
    lng: number;
  };
  photoRef: string | null;
}

export interface CityAutocomplete {
  placeId: string;
  name: string;
  fullName: string;
}

export interface Excursion {
  city: City;
  distance: number;
  travelTime: string;
  topAttractions: string[];
}

export interface Bookmark {
  id: string;
  placeId: string;
  placeName: string;
  placeAddress: string;
  placePhotoRef: string | null;
  placeRating: number;
  cityName: string;
  category: string;
  createdAt: Date;
}
