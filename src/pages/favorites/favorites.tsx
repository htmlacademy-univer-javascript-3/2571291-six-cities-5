import FavoritesCard from '@/components/favorites-card';
import Layout from '@/layout';

type Props = {
  offers: OfferType[];
};

function Favorites({ offers }: Props) {
  const offersByCity = offers.reduce((acc, o) => {
    if (!o.city.name) {
      return acc;
    }
    if (!acc[o.city.name]) {
      acc[o.city.name] = [];
    }
    acc[o.city.name].push(o);
    return acc;
  }, {} as Record<string, OfferType[]>);

  return (
    <Layout>
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {Object.entries(offersByCity).map(([city, o]) => (
                <li className="favorites__locations-items" key={city}>
                  <div className="favorites__locations locations locations--current">
                    <div className="locations__item">
                      <a className="locations__item-link" href="#">
                        <span>{city}</span>
                      </a>
                    </div>
                  </div>
                  <div className="favorites__places">
                    {o.map((x) => (
                      <FavoritesCard
                        previewImage={x.previewImage}
                        price={x.price}
                        title={x.title}
                        type={x.type}
                        id={x.id}
                        rating={x.rating}
                        key={x.id}
                        isFavorite={x.isFavorite}
                        isPremium={x.isPremium}
                        location={x.location}
                      />
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
    </Layout>
  );
}

export { Favorites };
