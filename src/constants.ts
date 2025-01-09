export const MarkersIcons = {
  UrlMarkerDefault: '/img/pin.svg',
  UrlMarkerCurrent: '/img/pin-active.svg',
} as const;

export const CityLocations = {
  Paris: {
    name: 'Paris',
    location: { latitude: 48.8566, longitude: 2.3522, zoom: 12 },
  },
  Cologne: {
    name: 'Cologne',
    location: { latitude: 50.93333, longitude: 6.95, zoom: 12 },
  },
  Brussels: {
    name: 'Brussels',
    location: { latitude: 50.85, longitude: 4.35, zoom: 12 },
  },
  Amsterdam: {
    name: 'Amsterdam',
    location: { latitude: 52.38333, longitude: 4.9, zoom: 12 },
  },
  Hamburg: {
    name: 'Hamburg',
    location: { latitude: 53.57532, longitude: 10.01534, zoom: 12 },
  },
  Dusseldorf: {
    name: 'Dusseldorf',
    location: { latitude: 51.22172, longitude: 6.77616, zoom: 12 },
  },
} as const;

export const SortingOptions = {
  Popular: 'Popular',
  PriceLowToHigh: 'Price: low to high',
  PriceHighToLow: 'Price: high to low',
  TopRatedFirst: 'Top rated first',
} as const;

export const BASE_API_URL = 'https://14.design.htmlacademy.pro/six-cities';
export const REQUEST_TIMEOUT = 5000;

export const ApiRoutes = {
  Offers: '/offers',
  Login: '/login',
  Logout: '/logout',
} as const;
