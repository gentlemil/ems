import { Review } from '@prisma/client';

import { Card } from '@ems/common-ui';

import ReviewCard from './ReviewCard';

const LastReviews = ({ reviews }: { reviews: Review[] }) => {
  return (
    <>
      {reviews &&
        reviews.map((review) => (
          <Card key={review.id}>
            <ReviewCard review={review} />
          </Card>
        ))}
      ;
    </>
  );
};

export default LastReviews;
