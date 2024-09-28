import Footer from '../components/Footer';
import Header from '../components/Header';
import Card from './Card';
import { ListItem } from './ListItem';

export default function Favorites() {
  return (
    <div className="page">
      <Header />
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              <ListItem title="Amsterdam">
                <Card
                  price={180}
                  title="Nice, cozy, warm big bed apartment"
                  type="Apartment"
                  mark
                  imageSrc="img/apartment-small-03.jpg"
                  rate={5}
                />
                <Card
                  price={80}
                  title="Wood and stone place"
                  type="Room"
                  imageSrc="img/room-small.jpg"
                />
              </ListItem>

              <ListItem title="Cologne">
                <Card
                  price={180}
                  title="White castle"
                  type="Apartment"
                  imageSrc="img/apartment-small-04.jpg"
                  rate={5}
                />
              </ListItem>
            </ul>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
