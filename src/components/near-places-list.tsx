import OfferCard from './offer-card';

type Props = {
  offers: Offer[];
  onOfferHover?: React.ComponentProps<typeof OfferCard>['onHover'];
};

function NearPlacesList({ offers, onOfferHover }: Props) {
  return (
    <section className="near-places places">
      <h2 className="near-places__title">Other places in the neighbourhood</h2>
      <div className="near-places__list places__list">
        {offers.map((x) => (
          <OfferCard
            price={x.price}
            title={x.title}
            type={x.type}
            imageSrc={x.imageSrc}
            id={x.id}
            rating={x.rating}
            key={x.id}
            isFavorite={x.isFavorite}
            isPremium={x.isPremium}
            onHover={onOfferHover}
          />
        ))}
      </div>
    </section>
  );
}

export default NearPlacesList;
