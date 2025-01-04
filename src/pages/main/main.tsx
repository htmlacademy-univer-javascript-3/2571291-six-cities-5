import LocationsList from '@/components/locations-list';
import Map from '@/components/map';
import OffersList from '@/components/offers-list';
import { SortingForm } from '@/components/sorting-form';
import Layout from '@/layout';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import type { OfferType } from '@/types';
import { useEffect, useState } from 'react';
import { fillOffersAction } from '@/store/actions';
import { offers as mockOffers } from '@/mocks/offers';

function Main() {
  const [hoveredOffer, setHoveredOffer] = useState<OfferType['id']>();
  const selectedCity = useAppSelector((state) => state.cityReducer.city);
  const offers = useAppSelector((state) => state.cityReducer.offers);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      fillOffersAction(mockOffers.filter((o) => o.city === selectedCity.title))
    );
  }, [dispatch, selectedCity]);

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
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">
                {offers.length} places to stay in {selectedCity.title}
              </b>
              <SortingForm />
              <OffersList offers={offers} onOfferHover={setHoveredOffer} />
            </section>
            <div className="cities__right-section">
              <section className="cities__map">
                <Map
                  city={selectedCity}
                  points={offers
                    .filter((x) => !!x.location)
                    .map((offer) => ({
                      id: offer.id,
                      latitude: offer.location!.latitude,
                      longitude: offer.location!.longitude,
                    }))}
                  selectedPoint={hoveredOffer}
                />
              </section>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}

export { Main };
