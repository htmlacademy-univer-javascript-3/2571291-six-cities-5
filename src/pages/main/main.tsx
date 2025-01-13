import LocationsList from '@/components/locations-list';
import { MainEmptyPage } from '@/components/main-empty-page';
import Map from '@/components/map';
import OffersList from '@/components/offers-list';
import { SortingForm } from '@/components/sorting-form';
import Spinner from '@/components/spinner';
import Layout from '@/layout';
import { setFilteredOffersAction } from '@/store/actions';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useLayoutEffect, useState, useEffect } from 'react';

function Main() {
  const [hoveredOffer, setHoveredOffer] = useState<OffersType['id']>();
  const {
    city: selectedCity,
    isOffersLoading,
    filteredOffers,
    offers,
  } = useAppSelector((state) => state.offersReducer);
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    if (isOffersLoading) {
      return;
    }

    dispatch(
      setFilteredOffersAction(
        offers.filter((x) => x.city.name === selectedCity.name)
      )
    );

    // Так как React не может обрабатывать массивы, а если передать offers, то ререндер будет постоянным
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [selectedCity, isOffersLoading, dispatch]);

  useEffect(
    () => console.log(filteredOffers),
    [JSON.stringify(filteredOffers)]
  );

  if (!isOffersLoading && !filteredOffers.length) {
    return <MainEmptyPage />;
  }

  return (
    <Layout className="page--gray page--main" showFooter={false}>
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <LocationsList />
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            {isOffersLoading ? (
              <Spinner />
            ) : (
              <>
                <section className="cities__places places">
                  <h2 className="visually-hidden">Places</h2>
                  <b className="places__found">
                    {filteredOffers.length} places to stay in{' '}
                    {selectedCity.name}
                  </b>
                  <SortingForm />
                  <OffersList
                    offers={filteredOffers}
                    onOfferHover={setHoveredOffer}
                  />
                </section>
                <div className="cities__right-section">
                  <section className="cities__map">
                    <Map
                      city={selectedCity}
                      points={filteredOffers.map((offer) => ({
                        id: offer.id,
                        latitude: offer.location.latitude,
                        longitude: offer.location.longitude,
                      }))}
                      selectedPoint={hoveredOffer}
                    />
                  </section>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </Layout>
  );
}

export { Main };
