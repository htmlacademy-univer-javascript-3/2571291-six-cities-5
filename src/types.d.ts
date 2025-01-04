import type { CityLocations } from './constants';
import type { store } from './store';

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

type OfferTypeType = 'apartment' | 'room' | 'house' | 'hotel';

type OfferType = {
  id: string;
  title: string;
  type: OfferTypeType;
  isFavorite?: boolean;
  isPremium?: boolean;
  price: number;
  imageSrc: string;
  rating: number;
  city?: (typeof CityLocations)[keyof typeof CityLocations]['title'];
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

type CityLocation = {
  title: string;
  latitude: number;
  longitude: number;
  zoom: number;
};

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

type ValueOf<T> = T[keyof T];
