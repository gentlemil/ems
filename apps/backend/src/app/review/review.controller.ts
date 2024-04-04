import { Controller, Get, Delete, Param } from '@nestjs/common';
import { ReviewService } from './review.service';

@Controller('reviews') // localhost:3000/api/reviews
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get()
  async getAllReviews() {
    const reviews = await this.reviewService.getAllReviews();
    return { reviews };
  }

  @Get(':id') // localhost:3000/api/reviews/:id
  getReviewById(@Param('id') id: string) {
    return this.reviewService.getReviewById(id);
  }

  // @Put(':id')
  // updateReview(@Param('id') id: number, @Body() review: Review): Promise<Review> {
  //   return this.reviewService.updateReview(id, review);
  // }

  // TODO: AuthGuards (check if user is logged in)
  @Delete(':id') // localhost:3000/api/reviews/:id
  deleteReview(@Param('id') id: string) {
    return this.reviewService.deleteReview(id);
  }
}
