import OfferCard from './offer-card';
import React from 'react';

type Props = {
  offers: OffersType[];
  onOfferHover?: React.ComponentProps<typeof OfferCard>['onHover'];
};

const OffersList = React.memo(({ offers, onOfferHover }: Props) => {
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((x) => (
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
