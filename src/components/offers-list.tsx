import { useAppDispatch, useAppSelector } from '@/store/hooks';
import OfferCard from './offer-card';
import { useEffect } from 'react';
import { setFilteredOffersAction } from '@/store/actions';

type Props = {
  onOfferHover?: React.ComponentProps<typeof OfferCard>['onHover'];
};

function OffersList({ onOfferHover }: Props) {
  const {
    city: selectedCity,
    isOffersLoading,
    offers,
    filteredOffers,
  } = useAppSelector((state) => state.reducer);
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
  }, [selectedCity, isOffersLoading]);

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
}

export default OffersList;
