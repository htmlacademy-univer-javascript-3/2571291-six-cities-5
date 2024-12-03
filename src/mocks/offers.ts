import faker from 'faker';

export const OfferTypes = ['apartment', 'room', 'house', 'hotel'] as const;

export const Cities = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf',
] as const;

export const offers: Offer[] = Array.from({ length: 312 }, (_, i) => ({
  id: faker.datatype.uuid(),
  title: faker.lorem.words(2).replace(/\b\w/g, (l) => l.toUpperCase()),
  type: faker.random.arrayElement(OfferTypes),
  isFavorite: faker.datatype.boolean(),
  isPremium: faker.datatype.boolean(),
  price: faker.datatype.number(200),
  imageSrc: `img/apartment-0${(i % 3) + 1}.jpg`,
  rating: faker.datatype.float({ min: 1, max: 5, precision: 0.5 }),
  city: faker.random.arrayElement(Cities),
}));
