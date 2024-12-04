import faker from 'faker';

const OfferTypes = ['apartment', 'room', 'house', 'hotel'] as const;

const Cities = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf',
] as const;

const offers: Offer[] = Array.from({ length: 200 }, (_, i) => {
  const id = faker.datatype.uuid();
  return {
    id: id,
    title: faker.lorem.words(2).replace(/\b\w/g, (l) => l.toUpperCase()),
    type: faker.random.arrayElement(OfferTypes),
    isFavorite: faker.datatype.boolean(),
    isPremium: faker.datatype.boolean(),
    price: faker.datatype.number(200),
    imageSrc: `img/apartment-0${(i % 3) + 1}.jpg`,
    rating: faker.datatype.float({ min: 1, max: 5, precision: 0.5 }),
    city: faker.random.arrayElement(Cities),
    location: {
      id: id,
      latitude: Number(faker.address.latitude(52.2, 52.5)),
      longitude: Number(faker.address.longitude(4.65, 5)),
    },
  };
});

export { Cities, OfferTypes, offers };
