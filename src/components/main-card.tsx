import { useState } from 'react';

export default function MainCard({
  price,
  title,
  type,
  mark,
  imageSrc,
  inBookmarks = false,
  rate = 4,
}: {
  price: number;
  title: string;
  type: string;
  mark?: boolean;
  imageSrc: string;
  inBookmarks?: boolean;
  rate?: IntRange<1, 5>;
}) {
  const [isBookmarked, setIsBookmarked] = useState(inBookmarks);

  return (
    <article className="cities__card place-card">
      {mark && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <a href="#">
          <img
            className="place-card__image"
            src={imageSrc}
            width="260"
            height="200"
            alt="Place image"
          />
        </a>
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
            <span style={{ width: `${(rate / 5) * 100}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <a href="#">{title}</a>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}
