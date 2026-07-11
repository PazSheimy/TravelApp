export interface Post {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatarUrl: string | null;
  caption: string;
  mediaUrls: string[];
  mediaType: 'photo' | 'video';
  location: PostLocation | null;
  likesCount: number;
  commentsCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface PostLocation {
  placeId: string | null;
  placeName: string;
  cityName: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface Comment {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatarUrl: string | null;
  text: string;
  createdAt: Date;
}
