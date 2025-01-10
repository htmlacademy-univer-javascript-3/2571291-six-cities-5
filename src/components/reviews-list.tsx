import React from 'react';
import ReviewsItem from './reviews-item';

type Props = {
  reviews: Review[];
};

const ReviewsList = React.memo(
  ({ reviews }: Props) => (
    <>
      <h2 className="reviews__title">
        Reviews &middot;{' '}
        <span className="reviews__amount">{reviews.length}</span>
      </h2>
      <ul className="reviews__list">
        {reviews.map((review) => (
          <ReviewsItem key={review.id} review={review} />
        ))}
      </ul>
    </>
  ),
  (prevProps, nextProps) =>
    JSON.stringify(prevProps.reviews) === JSON.stringify(nextProps.reviews)
);
ReviewsList.displayName = 'ReviewsList';

export default ReviewsList;
