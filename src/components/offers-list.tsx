import OfferCard from './offer-card';

export default function OffersList({ offers }: { offers: Offer[] }) {
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
          imageSrc={x.imageSrc}
        />
      ))}
    </div>
  );
}
