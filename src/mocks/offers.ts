import { CityLocations } from '@/constants';
import type { OfferType } from '@/types';
import faker from 'faker';

const OfferTypes = ['apartment', 'room', 'house', 'hotel'] as const;

const offers: OfferType[] = Array.from({ length: 200 }, (_, i) => {
  const id = faker.datatype.uuid();
  const city = faker.random.arrayElement(Object.values(CityLocations)).title;

  return {
    id: id,
    title: faker.lorem.words(2).replace(/\b\w/g, (l) => l.toUpperCase()),
    type: faker.random.arrayElement(OfferTypes),
    isFavorite: faker.datatype.boolean(),
    isPremium: faker.datatype.boolean(),
    price: faker.datatype.number(200),
    imageSrc: `img/apartment-0${(i % 3) + 1}.jpg`,
    rating: faker.datatype.float({ min: 1, max: 5, precision: 0.5 }),
    city: city,
    location: {
      id: id,
      latitude: Number(
        faker.address.latitude(
          // @ts-expect-error TS7053, я не знаю как решить эту проблему для faker
          CityLocations[city.toUpperCase()].latitude - 0.1,
          // @ts-expect-error TS7053, я не знаю как решить эту проблему для faker
          CityLocations[city.toUpperCase()].latitude + 0.1
        )
      ),
      longitude: Number(
        faker.address.longitude(
          // @ts-expect-error TS7053, я не знаю как решить эту проблему для faker
          CityLocations[city.toUpperCase()].longitude - 0.1,
          // @ts-expect-error TS7053, я не знаю как решить эту проблему для faker
          CityLocations[city.toUpperCase()].longitude + 0.1
        )
      ),
    },
  };
});

export { OfferTypes, offers };
