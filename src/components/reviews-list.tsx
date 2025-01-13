import React from 'react';
import ReviewsItem from './reviews-item';

type Props = {
  comments: CommentType[];
};

const ReviewsList = React.memo(
  ({ comments }: Props) => (
    <>
      <h2 className="reviews__title">
        Reviews &middot;{' '}
        <span className="reviews__amount">{comments.length}</span>
      </h2>
      <ul className="reviews__list">
        {comments.map((review) => (
          <ReviewsItem key={review.id} comment={review} />
        ))}
      </ul>
    </>
  ),
  (prevProps, nextProps) =>
    JSON.stringify(prevProps.comments) === JSON.stringify(nextProps.comments) ||
    prevProps.comments.length === nextProps.comments.length
);
ReviewsList.displayName = 'ReviewsList';

export default ReviewsList;
