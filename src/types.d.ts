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
  name: string;
  avatarUrl: string;
  isPro: boolean;
  email: string;
  token: string;
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

type OffersType = {
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

type ValueOf<T> = T[keyof T];

type PointMap = {
  id: string;
  latitude: number;
  longitude: number;
};

type CommentType = {
  id: string;
  date: string;
  user: {
    name: string;
    avatarUrl: string;
    isPro: boolean;
  };
  comment: string;
  rating: number;
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
  description: string;
  bedrooms: number;
  goods: string[];
  host: {
    name: string;
    avatarUrl: string;
    isPro: boolean;
  };
  images: string[];
  maxAdults: number;
};
