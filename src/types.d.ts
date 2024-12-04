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

type OfferType = 'apartment' | 'room' | 'house' | 'hotel';
type OfferCity =
  | 'Paris'
  | 'Cologne'
  | 'Brussels'
  | 'Amsterdam'
  | 'Hamburg'
  | 'Dusseldorf';

type Offer = {
  id: string;
  title: string;
  type: OfferType;
  isFavorite?: boolean;
  isPremium?: boolean;
  price: number;
  imageSrc: string;
  rating: number;
  city?: OfferCity;
  location?: PointMap;
};

type CityMap = {
  title: string;
  latitude: number;
  longitude: number;
  zoom: number;
};

type PointMap = {
  id: string;
  latitude: number;
  longitude: number;
};

type Review = {
  id: string;
  avatar: string;
  name: string;
  rating: number;
  text: string;
  date: string;
};
