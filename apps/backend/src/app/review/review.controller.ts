import { Controller, Get, Delete, Param, Patch, Query } from '@nestjs/common';

import { ReviewService } from './review.service';
import { ReviewsResponseInterface } from './types/reviewsResponse.interface';
import { ReviewStatisticsResponseInterface } from './types/reviewStatisticsResponse.interface';
import { ReviewResponseInterface } from './types/reviewResponse.interface';

@Controller('reviews') // localhost:3000/api/reviews
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get()
  async getAllReviews(@Query() query?: any): Promise<ReviewsResponseInterface> {
    return await this.reviewService.getAllReviews(query);
  }

  @Get('statistics')
  async getReviewsStatistics(): Promise<ReviewStatisticsResponseInterface> {
    return await this.reviewService.getReviewsStatistics();
  }

  @Get(':id') // localhost:3000/api/reviews/:id
  async getReviewById(
    @Param('id') id: string
  ): Promise<ReviewResponseInterface> {
    const review = await this.reviewService.getReviewById(id);
    return this.reviewService.buildReviewResponse(review);
  }

  @Patch(':id/confirm') // localhost:3000/api/reviews/:id/confirm
  async updateReview(
    @Param('id') id: string
  ): Promise<ReviewResponseInterface> {
    const review = await this.reviewService.updateReview(id);
    return this.reviewService.buildReviewResponse(review);
  }

  // TODO: AuthGuards (check if user is logged in)
  @Delete(':id') // localhost:3000/api/reviews/:id
  async deleteReview(@Param('id') id: string): Promise<{ status: 'ok' }> {
    await this.reviewService.deleteReview(id);
    return { status: 'ok' };
  }
}
