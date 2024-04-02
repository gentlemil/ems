import { Header } from '@ems/common-ui';
import { AddReviewForm } from './AddReviewForm';

export default async function AddReview() {
  return (
    <div>
      <Header>Add Review</Header>
      <AddReviewForm />
    </div>
  );
}
