import FavoritesCard from '@/components/favorites-card';
import Layout from '@/layout';

export default function Favorites() {
  return (
    <Layout>
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              <li className="favorites__locations-items">
                <div className="favorites__locations locations locations--current">
                  <div className="locations__item">
                    <a className="locations__item-link" href="#">
                      <span>Amsterdam</span>
                    </a>
                  </div>
                </div>
                <div className="favorites__places">
                  <FavoritesCard
                    price={180}
                    title="Nice, cozy, warm big bed apartment"
                    type="Apartment"
                    mark
                    imageSrc="img/apartment-small-03.jpg"
                    rate={5}
                  />
                  <FavoritesCard
                    price={80}
                    title="Wood and stone place"
                    type="Room"
                    imageSrc="img/room-small.jpg"
                  />
                </div>
              </li>

              <li className="favorites__locations-items">
                <div className="favorites__locations locations locations--current">
                  <div className="locations__item">
                    <a className="locations__item-link" href="#">
                      <span>Cologne</span>
                    </a>
                  </div>
                </div>
                <div className="favorites__places">
                  <FavoritesCard
                    price={180}
                    title="White castle"
                    type="Apartment"
                    imageSrc="img/apartment-small-04.jpg"
                    rate={5}
                  />
                </div>
              </li>
            </ul>
          </section>
        </div>
      </main>
    </Layout>
  );
}
