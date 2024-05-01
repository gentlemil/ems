import { Controller, Get, Delete, Param, Patch, Query } from '@nestjs/common';
import { ReviewService } from './review.service';

@Controller('reviews') // localhost:3000/api/reviews
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get()
  async getAllReviews(@Query() query?: any) {
    const reviews = await this.reviewService.getAllReviews(query);
    return { reviews };
  }

  @Get('stats')
  async getReviewsStats() {
    const stats = await this.reviewService.getReviewsStats();
    return { stats };
  }

  @Get(':id') // localhost:3000/api/reviews/:id
  getReviewById(@Param('id') id: string) {
    return this.reviewService.getReviewById(id);
  }

  @Patch(':id/confirm') // localhost:3000/api/reviews/:id/confirm
  updateReview(@Param('id') id: string) {
    return this.reviewService.updateReview(id);
  }

  // TODO: AuthGuards (check if user is logged in)
  @Delete(':id') // localhost:3000/api/reviews/:id
  deleteReview(@Param('id') id: string) {
    return this.reviewService.deleteReview(id);
  }
}
