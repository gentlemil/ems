import { ReviewType } from './review.type';

export interface ReviewsResponseInterface {
  reviews: ReviewType[];
  reviewsCount: number;
}
