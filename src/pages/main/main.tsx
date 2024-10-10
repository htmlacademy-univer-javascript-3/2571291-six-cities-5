import MainCard from '@/components/main-card';
import { SortingForm } from '@/components/sorting-form';
import Layout from '@/layout';

export default function Main() {
  const cards = [
    {
      price: 120,
      title: 'Beautiful & luxurious apartment at great location',
      type: 'Apartment',
      mark: true,
      imageSrc: 'img/apartment-01.jpg',
    },
    {
      price: 80,
      title: 'Wood and stone place',
      type: 'Room',
      imageSrc: 'img/room.jpg',
    },
    {
      price: 132,
      title: 'Canal View Prinsengracht',
      type: 'Apartment',
      imageSrc: 'img/apartment-02.jpg',
    },
    {
      price: 180,
      title: 'Nice, cozy, warm big bed apartment',
      type: 'Apartment',
      mark: true,
      imageSrc: 'img/apartment-03.jpg',
    },
    {
      price: 80,
      title: 'Wood and stone place',
      type: 'Room',
      imageSrc: 'img/room.jpg',
    },
  ];

  return (
    <Layout className="page--gray page--main" showFooter={false}>
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">
              <li className="locations__item">
                <a className="locations__item-link tabs__item" href="#">
                  <span>Paris</span>
                </a>
              </li>
              <li className="locations__item">
                <a className="locations__item-link tabs__item" href="#">
                  <span>Cologne</span>
                </a>
              </li>
              <li className="locations__item">
                <a className="locations__item-link tabs__item" href="#">
                  <span>Brussels</span>
                </a>
              </li>
              <li className="locations__item">
                <a className="locations__item-link tabs__item tabs__item--active">
                  <span>Amsterdam</span>
                </a>
              </li>
              <li className="locations__item">
                <a className="locations__item-link tabs__item" href="#">
                  <span>Hamburg</span>
                </a>
              </li>
              <li className="locations__item">
                <a className="locations__item-link tabs__item" href="#">
                  <span>Dusseldorf</span>
                </a>
              </li>
            </ul>
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">312 places to stay in Amsterdam</b>
              <SortingForm />
              <div className="cities__places-list places__list tabs__content">
                {Array.from({ length: 312 }).map((_, i) => (
                  <MainCard
                    // eslint-disable-next-line react/no-array-index-key
                    key={`place-card-${i}`}
                    price={cards[i % cards.length].price}
                    title={cards[i % cards.length].title}
                    type={cards[i % cards.length].type}
                    mark={cards[i % cards.length].mark}
                    imageSrc={cards[i % cards.length].imageSrc}
                  />
                ))}
              </div>
            </section>
            <div className="cities__right-section">
              <section className="cities__map map"></section>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
