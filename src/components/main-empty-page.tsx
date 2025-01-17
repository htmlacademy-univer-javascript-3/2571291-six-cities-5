import LocationsList from '@/components/locations-list';
import Layout from '@/layout';
import { useAppSelector } from '@/store/hooks';

function MainEmptyPage() {
  const { city: selectedCity } = useAppSelector((state) => state.offersReducer);

  return (
    <Layout className="page--gray page--main" showFooter={false}>
      <main className="page__main page__main--index page__main--index-empty">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <LocationsList />
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container cities__places-container--empty container">
            <section className="cities__no-places">
              <div className="cities__status-wrapper tabs__content">
                <b className="cities__status">No places to stay available</b>
                <p className="cities__status-description">
                  We could not find any property available at the moment in{' '}
                  {selectedCity.name}
                </p>
              </div>
            </section>
            <div className="cities__right-section"></div>
          </div>
        </div>
      </main>
    </Layout>
  );
}

export { MainEmptyPage };
