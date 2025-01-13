import faker from 'faker';

const reviews: CommentType[] = Array.from({ length: 10 }, () => ({
  id: faker.datatype.uuid(),
  date: faker.date.recent().toString(),
  user: {
    avatarUrl: 'img/avatar-max.jpg',
    isPro: faker.datatype.boolean(),
    name: faker.name.findName(),
  },
  comment: faker.lorem.paragraph(),
  rating: faker.datatype.number({ min: 1, max: 5 }),
}));

export { reviews };
