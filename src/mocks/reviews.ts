import faker from 'faker';

const reviews: Review[] = Array.from({ length: 10 }, () => ({
  id: faker.datatype.uuid(),
  avatar: 'img/avatar-max.jpg',
  name: faker.name.findName(),
  rating: faker.datatype.float({ min: 1, max: 5, precision: 0.5 }),
  text: faker.lorem.paragraph(),
  date: faker.date.recent().toString(),
}));

export { reviews };
