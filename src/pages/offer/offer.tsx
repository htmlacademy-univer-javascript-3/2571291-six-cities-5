import Layout from '@/layout';
import ReviewsForm from '@/components/reviews-form';
import ReviewsList from '@/components/reviews-list';
import Map from '@/components/map';
import { CityLocations } from '@/constants';
import { useLayoutEffect, useMemo, useState } from 'react';
import NearPlacesList from '@/components/near-places-list';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useParams } from 'react-router-dom';
import {
  changeFavoriteStatusAction,
  fetchOfferByIdAction,
  sendCommentAction,
} from '@/store/api-actions';
import Spinner from '@/components/spinner';
import { NotFound } from '..';
import { AuthorizationStatus, FavoriteStatus } from '@/store/types';
import classNames from 'classnames';

function Offer() {
  const [hoveredOffer, setHoveredOffer] = useState<OffersType['id']>();
  const { id: offerId } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { comments, isOfferLoading, offer } = useAppSelector(
    (state) => state.offerReducer
  );
  const { offers, isOffersLoading } = useAppSelector(
    (state) => state.offersReducer
  );
  const { authorizationStatus } = useAppSelector((state) => state.userReducer);
  const nearbyOffers = useMemo(() => {
    if (isOfferLoading || isOfferLoading || !offer) {
      return [];
    }
    return offers
      .filter((x) => x.city.name === offer.city.name && x.id !== offer.id)
      .slice(0, 3);
  }, [isOffersLoading, isOfferLoading, !!offer]);

  useLayoutEffect(() => {
    if (!offerId) {
      return;
    }
    dispatch(fetchOfferByIdAction(offerId));
  }, [offerId]);

  if (isOfferLoading) {
    return <Spinner />;
  }

  if (!offer) {
    return <NotFound />;
  }

  return (
    <Layout>
      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {offer.images.map((image) => {
                return (
                  <div className="offer__image-wrapper" key={image}>
                    <img
                      className="offer__image"
                      src={image}
                      alt="Photo studio"
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {offer.isPremium && (
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
              )}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">{offer.title}</h1>
                <button
                  className={classNames(
                    'offer__bookmark-button button',
                    offer.isFavorite ? 'offer__bookmark-button--active' : ''
                  )}
                  type="button"
                  onClick={() =>
                    dispatch(
                      changeFavoriteStatusAction({
                        id: offer.id,
                        status: offer.isFavorite
                          ? FavoriteStatus.NotFavorite
                          : FavoriteStatus.Favorite,
                      })
                    )
                  }
                >
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark" />
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span
                    style={{ width: `${(offer.rating / 5) * 100}%` }}
                  ></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">
                  {offer.rating}
                </span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  Apartment
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {offer.bedrooms} Bedrooms
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {offer.maxAdults} adults
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{offer.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {offer.goods.map((good) => (
                    <li className="offer__inside-item" key={good}>
                      {good}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                    <img
                      className="offer__avatar user__avatar"
                      src={offer.host.avatarUrl}
                      width="74"
                      height="74"
                      alt="Host avatar"
                    />
                  </div>
                  <span className="offer__user-name">{offer.host.name}</span>
                  {offer.host.isPro && (
                    <span className="offer__user-status">Pro</span>
                  )}
                </div>
                <div className="offer__description">
                  <p className="offer__text">{offer.description}</p>
                </div>
              </div>
              <section className="offer__reviews reviews">
                <ReviewsList comments={comments} />
                {authorizationStatus === AuthorizationStatus.Authorized && (
                  <ReviewsForm
                    onSubmit={(data) =>
                      dispatch(
                        sendCommentAction({
                          id: offer.id,
                          comment: data.review,
                          rating: data.rating,
                        })
                      ).unwrap()
                    }
                  />
                )}
              </section>
            </div>
          </div>
          <section className="offer__map map">
            <Map
              city={CityLocations.Amsterdam}
              points={[
                ...nearbyOffers.map((offer) => ({
                  id: offer.id,
                  latitude: offer.location.latitude,
                  longitude: offer.location.longitude,
                })),
                {
                  id: offer.id,
                  latitude: offer.location.latitude,
                  longitude: offer.location.longitude,
                },
              ]}
              selectedPoint={hoveredOffer}
            />
          </section>
        </section>
        <div className="container">
          <NearPlacesList
            offers={nearbyOffers}
            onOfferHover={setHoveredOffer}
          />
        </div>
      </main>
    </Layout>
  );
}

export { Offer };
