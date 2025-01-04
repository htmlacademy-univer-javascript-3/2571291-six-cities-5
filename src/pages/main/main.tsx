import LocationsList from '@/components/locations-list';
import Map from '@/components/map';
import OffersList from '@/components/offers-list';
import { SortingForm } from '@/components/sorting-form';
import Spinner from '@/components/spinner';
import Layout from '@/layout';
import { useAppSelector } from '@/store/hooks';
import { useState } from 'react';
import { MainEmpty } from '..';

function Main() {
  const [hoveredOffer, setHoveredOffer] = useState<OfferType['id']>();
  const {
    city: selectedCity,
    isOffersLoading,
    filteredOffers,
  } = useAppSelector((state) => state.reducer);

  if (!isOffersLoading && !filteredOffers.length) {
    return <MainEmpty />;
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
                  <OffersList onOfferHover={setHoveredOffer} />
                </section>
                <div className="cities__right-section">
                  <section className="cities__map">
                    <Map
                      city={selectedCity}
                      points={filteredOffers
                        .filter((x) => !!x.location)
                        .map((offer) => ({
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
