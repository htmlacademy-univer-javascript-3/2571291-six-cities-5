import { useAppDispatch, useAppSelector } from '@/store/hooks';
import OfferCard from './offer-card';
import React, { useEffect } from 'react';
import { setFilteredOffersAction } from '@/store/actions';

type Props = {
  onOfferHover?: React.ComponentProps<typeof OfferCard>['onHover'];
};

const OffersList = React.memo(({ onOfferHover }: Props) => {
  const {
    city: selectedCity,
    isOffersLoading,
    offers,
    filteredOffers,
  } = useAppSelector((state) => state.offersReducer);
  const dispatch = useAppDispatch();

  useEffect(() => {
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

  return (
    <div className="cities__places-list places__list tabs__content">
      {filteredOffers.map((x) => (
        <OfferCard
          key={`place-card-${x.id}`}
          price={x.price}
          title={x.title}
          type={x.type}
          isFavorite={x.isFavorite}
          id={x.id}
          isPremium={x.isPremium}
          rating={x.rating}
          previewImage={x.previewImage}
          onHover={onOfferHover}
          city={x.city}
          location={x.location}
        />
      ))}
    </div>
  );
});
OffersList.displayName = 'OffersList';

export default OffersList;
