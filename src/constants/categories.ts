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
    name: 'Mercadillos',
    icon: 'tags',
    color: '#ca8a04',
    googlePlacesType: null,
    textSearchFallback: 'flea market street market open air market mercadillo rastro',
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
    id: 'nightlife',
    name: 'Nightlife',
    icon: 'moon-o',
    color: '#7c3aed',
    googlePlacesType: 'night_club',
    textSearchFallback: 'nightclubs discos clubs dancing',
  },
  {
    id: 'tardeaos',
    name: 'Tardeaos',
    icon: 'sun-o',
    color: '#f97316',
    googlePlacesType: null,
    textSearchFallback: 'afternoon party bars terraces drinks',
  },
  {
    id: 'rooftops',
    name: 'Rooftops',
    icon: 'building-o',
    color: '#0ea5e9',
    googlePlacesType: null,
    textSearchFallback: 'rooftop bars rooftop restaurants terrace views',
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

export const CATEGORY_SUBCATEGORIES: Record<string, Subcategory[]> = {
  restaurants: RESTAURANT_SUBCATEGORIES,
  shopping: SHOPPING_SUBCATEGORIES,
  nature: NATURE_SUBCATEGORIES,
  waterfun: WATERFUN_SUBCATEGORIES,
  pets: PETS_SUBCATEGORIES,
};
