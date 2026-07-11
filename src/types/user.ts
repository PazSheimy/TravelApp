export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  bio: string;
  avatarUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
  settings: UserSettings;
}

export interface UserSettings {
  distanceUnit: 'km' | 'mi';
  notificationsEnabled: boolean;
}
