import React from 'react';
import OfferCard from './offer-card';

type Props = {
  offers: OfferType[];
  onOfferHover?: React.ComponentProps<typeof OfferCard>['onHover'];
};

const NearPlacesList = React.memo(
  ({ offers, onOfferHover }: Props) => (
    <section className="near-places places">
      <h2 className="near-places__title">Other places in the neighbourhood</h2>
      <div className="near-places__list places__list">
        {offers.map((x) => (
          <OfferCard
            price={x.price}
            title={x.title}
            type={x.type}
            previewImage={x.previewImage}
            id={x.id}
            rating={x.rating}
            key={x.id}
            isFavorite={x.isFavorite}
            isPremium={x.isPremium}
            onHover={onOfferHover}
            city={x.city}
            location={x.location}
          />
        ))}
      </div>
    </section>
  ),
  (prev, next) =>
    prev.onOfferHover === next.onOfferHover &&
    JSON.stringify(prev.offers) === JSON.stringify(next.offers)
);
NearPlacesList.displayName = 'NearPlacesList';

export default NearPlacesList;
