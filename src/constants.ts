export const MarkersIcons = {
  UrlMarkerDefault: '/img/pin.svg',
  UrlMarkerCurrent: '/img/pin-active.svg',
} as const;

export const CityLocations = {
  Paris: {
    title: 'Paris',
    latitude: 48.8566,
    longitude: 2.3522,
    zoom: 12,
  },
  Cologne: {
    title: 'Cologne',
    latitude: 50.93333,
    longitude: 6.95,
    zoom: 12,
  },
  Brussels: {
    title: 'Brussels',
    latitude: 50.85,
    longitude: 4.35,
    zoom: 12,
  },
  Amsterdam: {
    title: 'Amsterdam',
    latitude: 52.38333,
    longitude: 4.9,
    zoom: 12,
  },
  Hamburg: {
    title: 'Hamburg',
    latitude: 53.57532,
    longitude: 10.01534,
    zoom: 12,
  },
  Dusseldorf: {
    title: 'Dusseldorf',
    latitude: 51.22172,
    longitude: 6.77616,
    zoom: 12,
  },
} as const;

export const SortingOptions = {
  Popular: 'Popular',
  PriceLowToHigh: 'Price: low to high',
  PriceHighToLow: 'Price: high to low',
  TopRatedFirst: 'Top rated first',
} as const;
