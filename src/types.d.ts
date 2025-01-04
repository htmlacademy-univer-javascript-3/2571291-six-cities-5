/** https://stackoverflow.com/a/39495173/20785115 */
type Enumerate<
  N extends number,
  Acc extends number[] = []
> = Acc['length'] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc['length']]>;

/** https://stackoverflow.com/a/39495173/20785115 */
type IntRange<F extends number, T extends number> =
  | Exclude<Enumerate<T>, Enumerate<F>>
  | T;

type Prettify<T> = {
  [K in keyof T]: T[K];
} & object;

type User = {
  email: string;
};

type LocationType = {
  latitude: number;
  longitude: number;
  zoom: number;
};

type OfferCityType = {
  name: string;
  location: LocationType;
};

type OfferType = {
  id: string;
  title: string;
  type: string;
  price: number;
  city: OfferCityType;
  location: LocationType;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  previewImage: string;
};

type CityMap = {
  title: string;
  latitude: number;
  longitude: number;
  zoom: number;
};

type Review = {
  id: string;
  avatar: string;
  name: string;
  rating: number;
  text: string;
  date: string;
};

type ValueOf<T> = T[keyof T];

type PointMap = {
  id: string;
  latitude: number;
  longitude: number;
};
