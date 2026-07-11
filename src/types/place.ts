export interface Place {
  id: string;
  name: string;
  address: string;
  rating: number;
  totalRatings: number;
  priceLevel: number;
  photoRef: string | null;
  types: string[];
  location: {
    lat: number;
    lng: number;
  };
  isOpen?: boolean;
}

export interface PlaceDetail extends Place {
  phone: string | null;
  website: string | null;
  hours: string[];
  reviews: Review[];
  photos: string[];
  editorialSummary: string | null;
}

export interface Review {
  authorName: string;
  rating: number;
  text: string;
  relativeTime: string;
}

export interface PlaceSearchResult {
  places: Place[];
  nextPageToken: string | null;
}
