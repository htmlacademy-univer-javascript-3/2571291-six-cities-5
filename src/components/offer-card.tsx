import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const OfferCard = React.memo(
  ({
    id,
    price,
    title,
    type,
    isFavorite,
    isPremium,
    previewImage,
    rating = 4,
    onHover,
  }: OfferType & { onHover?: (id?: OfferType['id']) => void }) => {
    const [isBookmarked, setIsBookmarked] = useState(isFavorite);

    return (
      <article
        className="cities__card place-card"
        onMouseEnter={() => onHover?.(id)}
        onMouseLeave={() => onHover?.()}
      >
        {isPremium && (
          <div className="place-card__mark">
            <span>Premium</span>
          </div>
        )}
        <div className="cities__image-wrapper place-card__image-wrapper">
          <Link to={`/offer/${id}`}>
            <img
              className="place-card__image"
              src={previewImage}
              width="260"
              height="200"
              alt="Place image"
            />
          </Link>
        </div>
        <div className="place-card__info">
          <div className="place-card__price-wrapper">
            <div className="place-card__price">
              <b className="place-card__price-value">&euro;{price}&nbsp;</b>
              <span className="place-card__price-text">&#47;&nbsp;night</span>
            </div>
            <button
              className={`place-card__bookmark-button button ${
                isBookmarked ? 'place-card__bookmark-button--active' : ''
              }`}
              type="button"
              onClick={() => setIsBookmarked(!isBookmarked)}
            >
              <svg className="place-card__bookmark-icon" width="18" height="19">
                <use xlinkHref="#icon-bookmark"></use>
              </svg>
              <span className="visually-hidden">
                {isBookmarked ? 'In' : 'To'} bookmarks
              </span>
            </button>
          </div>
          <div className="place-card__rating rating">
            <div className="place-card__stars rating__stars">
              <span style={{ width: `${(rating / 5) * 100}%` }}></span>
              <span className="visually-hidden">Rating</span>
            </div>
          </div>
          <h2 className="place-card__name">
            <Link to={`/offer/${id}`}>{title}</Link>
          </h2>
          <p className="place-card__type">{type}</p>
        </div>
      </article>
    );
  }
);
OfferCard.displayName = 'OfferCard';

export default OfferCard;
