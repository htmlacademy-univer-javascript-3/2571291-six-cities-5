import type { Review } from '@/types';
import ReviewsItem from './reviews-item';

type Props = {
  reviews: Review[];
};

function ReviewsList({ reviews }: Props) {
  return (
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
  );
}

export default ReviewsList;
