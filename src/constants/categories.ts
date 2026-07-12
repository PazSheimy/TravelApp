export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  googlePlacesType: string | null;
  textSearchFallback: string;
}

export interface Subcategory {
  id: string;
  name: string;
  searchQuery: string;
}

export const CATEGORIES: Category[] = [
  {
    id: 'restaurants',
    name: 'Restaurants',
    icon: 'cutlery',
    color: '#ef4444',
    googlePlacesType: 'restaurant',
    textSearchFallback: 'restaurants',
  },
  {
    id: 'shopping',
    name: 'Shopping',
    icon: 'shopping-bag',
    color: '#e11d48',
    googlePlacesType: 'clothing_store',
    textSearchFallback: 'clothing stores fashion shopping',
  },
  {
    id: 'mercadillos',
    name: 'Flea Markets',
    icon: 'tags',
    color: '#ca8a04',
    googlePlacesType: null,
    textSearchFallback: 'flea market street market open air market mercadillo rastro',
  },
  {
    id: 'classes',
    name: 'Classes',
    icon: 'graduation-cap',
    color: '#4f46e5',
    googlePlacesType: null,
    textSearchFallback: 'classes lessons studio school academy',
  },
  {
    id: 'nature',
    name: 'Nature',
    icon: 'leaf',
    color: '#059669',
    googlePlacesType: null,
    textSearchFallback: 'beaches lakes rivers hiking nature',
  },
  {
    id: 'waterfun',
    name: 'Water Fun',
    icon: 'tint',
    color: '#0284c7',
    googlePlacesType: null,
    textSearchFallback: 'water park pool aquatic center',
  },
  {
    id: 'pets',
    name: 'Pets',
    icon: 'paw',
    color: '#a16207',
    googlePlacesType: null,
    textSearchFallback: 'dog park pet friendly dog beach',
  },
  {
    id: 'nightlife',
    name: 'Nightlife',
    icon: 'moon-o',
    color: '#7c3aed',
    googlePlacesType: 'night_club',
    textSearchFallback: 'nightclubs discos clubs dancing',
  },
  {
    id: 'tardeos',
    name: 'Tardeos',
    icon: 'sun-o',
    color: '#f97316',
    googlePlacesType: null,
    textSearchFallback: 'tardeo afternoon party bars terraces drinks',
  },
  {
    id: 'afterwork',
    name: 'After Work',
    icon: 'glass',
    color: '#b45309',
    googlePlacesType: null,
    textSearchFallback: 'after work bars happy hour drinks pub',
  },
  {
    id: 'rooftops',
    name: 'Rooftops',
    icon: 'building-o',
    color: '#0ea5e9',
    googlePlacesType: null,
    textSearchFallback: 'rooftop bars rooftop restaurants terrace views',
  },
  {
    id: 'museums',
    name: 'Museums',
    icon: 'institution',
    color: '#8b5cf6',
    googlePlacesType: 'museum',
    textSearchFallback: 'museums',
  },
  {
    id: 'landmarks',
    name: 'Landmarks',
    icon: 'star',
    color: '#f59e0b',
    googlePlacesType: 'tourist_attraction',
    textSearchFallback: 'famous landmarks tourist attractions',
  },
  {
    id: 'gyms',
    name: 'Gyms',
    icon: 'heartbeat',
    color: '#10b981',
    googlePlacesType: 'gym',
    textSearchFallback: 'gyms fitness centers',
  },
  {
    id: 'parks',
    name: 'Parks',
    icon: 'tree',
    color: '#22c55e',
    googlePlacesType: 'park',
    textSearchFallback: 'parks gardens',
  },
  {
    id: 'monuments',
    name: 'Monuments',
    icon: 'university',
    color: '#6366f1',
    googlePlacesType: null,
    textSearchFallback: 'monuments statues memorials',
  },
  {
    id: 'churches',
    name: 'Churches',
    icon: 'building',
    color: '#ec4899',
    googlePlacesType: 'church',
    textSearchFallback: 'churches cathedrals temples',
  },
  {
    id: 'historical',
    name: 'Historical',
    icon: 'book',
    color: '#d97706',
    googlePlacesType: null,
    textSearchFallback: 'historical sites heritage',
  },
  {
    id: 'transport',
    name: 'Transport',
    icon: 'plane',
    color: '#475569',
    googlePlacesType: 'airport',
    textSearchFallback: 'airport train station bus station',
  },
  {
    id: 'parking',
    name: 'Parking',
    icon: 'car',
    color: '#64748b',
    googlePlacesType: 'parking',
    textSearchFallback: 'parking garage parking lot',
  },
  {
    id: 'carrental',
    name: 'Car Rental',
    icon: 'automobile',
    color: '#0891b2',
    googlePlacesType: 'car_rental',
    textSearchFallback: 'car rental rent a car vehicle hire',
  },
  {
    id: 'emergency',
    name: 'Emergency',
    icon: 'plus-square',
    color: '#dc2626',
    googlePlacesType: 'hospital',
    textSearchFallback: 'hospital emergency room urgent care',
  },
];

export const RESTAURANT_SUBCATEGORIES: Subcategory[] = [
  { id: 'all', name: 'All', searchQuery: 'restaurants' },
  { id: 'breakfast', name: 'Breakfast', searchQuery: 'breakfast brunch cafes' },
  { id: 'lunch', name: 'Lunch', searchQuery: 'lunch restaurants' },
  { id: 'dinner', name: 'Dinner', searchQuery: 'dinner restaurants fine dining' },
];

export const SHOPPING_SUBCATEGORIES: Subcategory[] = [
  { id: 'all', name: 'All', searchQuery: 'clothing stores fashion shopping' },
  { id: 'clothing', name: 'Clothing', searchQuery: 'clothing stores fashion brands Zara Mango H&M' },
  { id: 'vintage', name: 'Vintage', searchQuery: 'thrift stores vintage clothing second hand shops' },
  { id: 'shoes', name: 'Shoes', searchQuery: 'shoe stores footwear sneakers' },
  { id: 'malls', name: 'Malls', searchQuery: 'shopping malls shopping centers' },
  { id: 'department', name: 'Department', searchQuery: 'department stores' },
  { id: 'outlets', name: 'Outlets', searchQuery: 'outlet stores outlet mall discount' },
];

export const CLASSES_SUBCATEGORIES: Subcategory[] = [
  { id: 'all', name: 'All', searchQuery: 'classes lessons studios academy' },
  { id: 'dance', name: 'Dance', searchQuery: 'dance classes ballet salsa dance studio' },
  { id: 'martial', name: 'Martial Arts', searchQuery: 'martial arts jiu jitsu karate boxing gym' },
  { id: 'yoga', name: 'Yoga & Pilates', searchQuery: 'yoga studio pilates classes' },
  { id: 'music', name: 'Music', searchQuery: 'music lessons guitar piano music school' },
  { id: 'art', name: 'Art', searchQuery: 'art classes painting drawing studio workshop' },
  { id: 'cooking', name: 'Cooking', searchQuery: 'cooking class culinary school chef workshop' },
  { id: 'swimming', name: 'Swimming', searchQuery: 'swimming lessons swim school swim classes' },
  { id: 'language', name: 'Languages', searchQuery: 'language school language classes' },
];

export const NATURE_SUBCATEGORIES: Subcategory[] = [
  { id: 'all', name: 'All', searchQuery: 'nature parks beaches hiking trails lakes' },
  { id: 'beaches', name: 'Beaches', searchQuery: 'public beach playa swimming beach' },
  { id: 'hiking', name: 'Hiking', searchQuery: 'hiking trail nature walk scenic path' },
  { id: 'lakes', name: 'Lakes & Rivers', searchQuery: 'lake river natural pool swimming hole' },
  { id: 'waterfalls', name: 'Waterfalls', searchQuery: 'waterfall cascade natural falls' },
  { id: 'caves', name: 'Caves', searchQuery: 'cave grotto cavern underground' },
  { id: 'fishing', name: 'Fishing', searchQuery: 'fishing spot fishing pier fishing lake' },
];

export const PETS_SUBCATEGORIES: Subcategory[] = [
  { id: 'all', name: 'All', searchQuery: 'dog park pet friendly dog beach pet store' },
  { id: 'dogparks', name: 'Dog Parks', searchQuery: 'dog park off leash park' },
  { id: 'dogbeach', name: 'Dog Beaches', searchQuery: 'dog beach off leash beach dogs allowed beach' },
  { id: 'petstores', name: 'Pet Stores', searchQuery: 'pet store pet shop pet supplies' },
  { id: 'vets', name: 'Vets', searchQuery: 'veterinarian vet clinic animal hospital' },
  { id: 'grooming', name: 'Grooming', searchQuery: 'dog grooming pet grooming pet salon' },
];

export const WATERFUN_SUBCATEGORIES: Subcategory[] = [
  { id: 'all', name: 'All', searchQuery: 'water park pool aquatic center splash pad' },
  { id: 'waterparks', name: 'Water Parks', searchQuery: 'water park water slides theme park' },
  { id: 'pools', name: 'Pools', searchQuery: 'community pool public pool swimming pool aquatic center' },
  { id: 'splash', name: 'Splash Pads', searchQuery: 'splash pad spray park water playground' },
  { id: 'lazy', name: 'Lazy Rivers', searchQuery: 'lazy river water park resort pool' },
];

export const TRANSPORT_SUBCATEGORIES: Subcategory[] = [
  { id: 'all', name: 'All', searchQuery: 'airport train station bus station' },
  { id: 'airports', name: 'Airports', searchQuery: 'airport international airport' },
  { id: 'trains', name: 'Train Stations', searchQuery: 'train station railway station' },
  { id: 'bus', name: 'Bus Stations', searchQuery: 'bus station bus terminal' },
  { id: 'parking', name: 'Airport Parking', searchQuery: 'airport parking long term parking' },
];

export const CARRENTAL_SUBCATEGORIES: Subcategory[] = [
  { id: 'all', name: 'All', searchQuery: 'car rental rent a car vehicle hire' },
  { id: 'airport', name: 'Airport Rentals', searchQuery: 'airport car rental car hire airport' },
  { id: 'luxury', name: 'Luxury', searchQuery: 'luxury car rental exotic car rental premium vehicles' },
  { id: 'budget', name: 'Budget', searchQuery: 'cheap car rental budget car hire economy rental' },
  { id: 'suv', name: 'SUV & Van', searchQuery: 'SUV rental van rental minivan car hire' },
  { id: 'motorcycle', name: 'Motorcycle & Scooter', searchQuery: 'motorcycle rental scooter rental moped hire' },
];

export const EMERGENCY_SUBCATEGORIES: Subcategory[] = [
  { id: 'all', name: 'All', searchQuery: 'hospital emergency room urgent care pharmacy' },
  { id: 'hospitals', name: 'Hospitals', searchQuery: 'hospital emergency room ER' },
  { id: 'urgent', name: 'Urgent Care', searchQuery: 'urgent care walk in clinic' },
  { id: 'pharmacy', name: 'Pharmacies', searchQuery: 'pharmacy drugstore' },
  { id: 'primary', name: 'Primary Care', searchQuery: 'general practitioner family doctor primary care physician medical clinic' },
  { id: 'dentist', name: 'Dentist', searchQuery: 'dentist dental clinic dental office' },
  { id: 'dermatology', name: 'Dermatologist', searchQuery: 'dermatologist skin doctor skin clinic' },
  { id: 'eye', name: 'Eye Doctor', searchQuery: 'ophthalmologist optometrist eye doctor eye clinic' },
  { id: 'orthopedic', name: 'Orthopedic', searchQuery: 'orthopedic doctor bone specialist sports medicine' },
  { id: 'pediatric', name: 'Pediatrician', searchQuery: 'pediatrician children doctor kids clinic' },
  { id: 'obgyn', name: 'OB/GYN', searchQuery: 'obgyn gynecologist women health clinic' },
  { id: 'police', name: 'Police', searchQuery: 'police station' },
];

export const CATEGORY_SUBCATEGORIES: Record<string, Subcategory[]> = {
  restaurants: RESTAURANT_SUBCATEGORIES,
  shopping: SHOPPING_SUBCATEGORIES,
  classes: CLASSES_SUBCATEGORIES,
  nature: NATURE_SUBCATEGORIES,
  waterfun: WATERFUN_SUBCATEGORIES,
  pets: PETS_SUBCATEGORIES,
  transport: TRANSPORT_SUBCATEGORIES,
  carrental: CARRENTAL_SUBCATEGORIES,
  emergency: EMERGENCY_SUBCATEGORIES,
};

// Emergency numbers by country — shown as info header in Emergency screen
export const EMERGENCY_NUMBERS: Record<string, { police: string; ambulance: string; fire: string; general: string }> = {
  'United States': { police: '911', ambulance: '911', fire: '911', general: '911' },
  'Canada': { police: '911', ambulance: '911', fire: '911', general: '911' },
  'United Kingdom': { police: '999', ambulance: '999', fire: '999', general: '112' },
  'Spain': { police: '091', ambulance: '112', fire: '080', general: '112' },
  'France': { police: '17', ambulance: '15', fire: '18', general: '112' },
  'Italy': { police: '112', ambulance: '118', fire: '115', general: '112' },
  'Germany': { police: '110', ambulance: '112', fire: '112', general: '112' },
  'Netherlands': { police: '112', ambulance: '112', fire: '112', general: '112' },
  'Japan': { police: '110', ambulance: '119', fire: '119', general: '110' },
  'Australia': { police: '000', ambulance: '000', fire: '000', general: '000' },
  'Mexico': { police: '911', ambulance: '911', fire: '911', general: '911' },
  'Brazil': { police: '190', ambulance: '192', fire: '193', general: '190' },
  'Colombia': { police: '123', ambulance: '123', fire: '123', general: '123' },
  'Argentina': { police: '911', ambulance: '107', fire: '100', general: '911' },
  'Portugal': { police: '112', ambulance: '112', fire: '112', general: '112' },
  'Greece': { police: '100', ambulance: '166', fire: '199', general: '112' },
  'Thailand': { police: '191', ambulance: '1669', fire: '199', general: '191' },
  'India': { police: '100', ambulance: '102', fire: '101', general: '112' },
  'South Korea': { police: '112', ambulance: '119', fire: '119', general: '112' },
  'Turkey': { police: '155', ambulance: '112', fire: '110', general: '112' },
};

// Alcohol/driving info by country
export const COUNTRY_INFO: Record<string, { drinkingAge: number; drivingLimit: string }> = {
  'United States': { drinkingAge: 21, drivingLimit: '0.08% BAC' },
  'Canada': { drinkingAge: 19, drivingLimit: '0.08% BAC' },
  'United Kingdom': { drinkingAge: 18, drivingLimit: '0.08% BAC' },
  'Spain': { drinkingAge: 18, drivingLimit: '0.05% BAC' },
  'France': { drinkingAge: 18, drivingLimit: '0.05% BAC' },
  'Italy': { drinkingAge: 18, drivingLimit: '0.05% BAC' },
  'Germany': { drinkingAge: 18, drivingLimit: '0.05% BAC' },
  'Netherlands': { drinkingAge: 18, drivingLimit: '0.05% BAC' },
  'Japan': { drinkingAge: 20, drivingLimit: '0.03% BAC' },
  'Australia': { drinkingAge: 18, drivingLimit: '0.05% BAC' },
  'Mexico': { drinkingAge: 18, drivingLimit: '0.08% BAC' },
  'Brazil': { drinkingAge: 18, drivingLimit: '0.00% (zero tolerance)' },
  'Colombia': { drinkingAge: 18, drivingLimit: '0.04% BAC' },
  'Argentina': { drinkingAge: 18, drivingLimit: '0.05% BAC' },
  'Portugal': { drinkingAge: 18, drivingLimit: '0.05% BAC' },
  'Greece': { drinkingAge: 18, drivingLimit: '0.05% BAC' },
  'Thailand': { drinkingAge: 20, drivingLimit: '0.05% BAC' },
  'India': { drinkingAge: 21, drivingLimit: '0.03% BAC' },
  'South Korea': { drinkingAge: 19, drivingLimit: '0.03% BAC' },
  'Turkey': { drinkingAge: 18, drivingLimit: '0.05% BAC' },
};
