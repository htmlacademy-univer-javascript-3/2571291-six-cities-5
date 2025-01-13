import FavoritesCard from '@/components/favorites-card';
import { FavoritesEmptyPage } from '@/components/favorites-empty-page';
import Spinner from '@/components/spinner';
import Layout from '@/layout';
import { useAppSelector } from '@/store/hooks';
import React from 'react';
import { Link } from 'react-router-dom';

function Favorites() {
  const { favorites, isFavoritesLoading } = useAppSelector(
    (state) => state.favoritesReducer
  );

  const offersByCity = React.useMemo(() => {
    if (isFavoritesLoading) {
      return {};
    }
    return favorites.reduce((acc, o) => {
      if (!o.city.name) {
        return acc;
      }
      if (!acc[o.city.name]) {
        acc[o.city.name] = [];
      }
      acc[o.city.name].push(o);
      return acc;
    }, {} as Record<string, OffersType[]>);

    // Так как React не может обрабатывать массивы, а если передать points, то ререндер будет постоянным
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [isFavoritesLoading, favorites.length]);

  if (isFavoritesLoading) return <Spinner />;

  if (!favorites.length) return <FavoritesEmptyPage />;

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
                      <Link className="locations__item-link" to="#">
                        <span>{city}</span>
                      </Link>
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
