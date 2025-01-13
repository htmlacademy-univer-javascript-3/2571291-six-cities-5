import { changeFavoriteStatusAction } from '@/store/api-actions';
import { useAppDispatch } from '@/store/hooks';
import { FavoriteStatus } from '@/store/types';
import React from 'react';
import { Link } from 'react-router-dom';

const FavoritesCard = React.memo(
  ({
    id,
    price,
    title,
    type,
    previewImage,
    isPremium,
    rating,
  }: Omit<OffersType, 'city'>) => {
    const dispatch = useAppDispatch();

    return (
      <article className="favorites__card place-card">
        {isPremium && (
          <div className="place-card__mark">
            <span>Premium</span>
          </div>
        )}
        <div className="favorites__image-wrapper place-card__image-wrapper">
          <Link to={`/offer/${id}`}>
            <img
              className="place-card__image"
              src={previewImage}
              width="150"
              height="110"
              alt="Place image"
            />
          </Link>
        </div>
        <div className="favorites__card-info place-card__info">
          <div className="place-card__price-wrapper">
            <div className="place-card__price">
              <b className="place-card__price-value">&euro;{price}&nbsp;</b>
              <span className="place-card__price-text">&#47;&nbsp;night</span>
            </div>
            <button
              className="place-card__bookmark-button place-card__bookmark-button--active button"
              type="button"
              onClick={() =>
                dispatch(
                  changeFavoriteStatusAction({
                    id,
                    status: FavoriteStatus.NotFavorite,
                  })
                )
              }
            >
              <svg className="place-card__bookmark-icon" width="18" height="19">
                <use xlinkHref="#icon-bookmark"></use>
              </svg>
              <span className="visually-hidden">In bookmarks</span>
            </button>
          </div>
          <div className="place-card__rating rating">
            <div className="place-card__stars rating__stars">
              <span style={{ width: `${(rating / 5) * 100}%` }}></span>
              <span className="visually-hidden">Rating</span>
            </div>
          </div>
          <h2 className="place-card__name">
            <Link to="#">{title}</Link>
          </h2>
          <p className="place-card__type">{type}</p>
        </div>
      </article>
    );
  }
);
FavoritesCard.displayName = 'FavoritesCard';

export default FavoritesCard;
