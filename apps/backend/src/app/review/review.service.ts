import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { Review } from '@prisma/client';

import { PrismaService } from '../../shared/services';
import {
  ReviewsResponseInterface,
  ReviewType,
  ReviewStatisticsResponseInterface,
  ReviewStatistics,
  ReviewResponseInterface,
} from './types';

@Injectable()
export class ReviewService {
  constructor(private readonly db: PrismaService) {}

  async getAllReviews(query: any): Promise<ReviewsResponseInterface> {
    const reviews = await this.db.review.findMany({
      orderBy: {
        created_at: 'desc',
      },
      take: +query?.limit || 10,
    });

    if (!reviews) {
      throw new HttpException('Reviews not found', HttpStatus.NOT_FOUND);
    }
    const reviewsWithoutId: ReviewType[] = reviews.map((review: Review) => {
      const { id, ...rest } = review;
      return rest;
    });
    const reviewsCount = await this.db.review.count();

    return { reviews: reviewsWithoutId, reviewsCount };
  }

  async getReviewsStatistics(): Promise<ReviewStatisticsResponseInterface> {
    const reviews = await this.db.review.findMany();

    if (!reviews) {
      throw new HttpException('Reviews not found', HttpStatus.NOT_FOUND);
    }

    const statistics: ReviewStatistics = {
      positive: reviews.filter(
        (review: Review) => review.sentiment === 'POSITIVE'
      ).length,
      neutral: reviews.filter(
        (review: Review) => review.sentiment === 'NEUTRAL'
      ).length,
      negative: reviews.filter(
        (review: Review) => review.sentiment === 'NEGATIVE'
      ).length,
    };

    const total: number = await this.db.review.count();

    return { statistics, total };
  }

  async findById(public_id: string): Promise<Review> {
    const review = await this.db.review.findUnique({
      where: {
        public_id,
      },
    });

    if (!review) {
      throw new HttpException('Review not found', HttpStatus.NOT_FOUND);
    }

    return review;
  }

  async getReviewById(public_id: string): Promise<ReviewType> {
    const review = await this.findById(public_id);

    const { id, ...rest } = review;

    return rest;
  }

  async updateReview(public_id: string): Promise<ReviewType> {
    const review = await this.findById(public_id);

    const data = await this.db.review.update({
      where: {
        public_id,
      },
      data: {
        is_confirmed: !(await review).is_confirmed,
      },
    });

    const { id, ...rest } = data;

    return rest;
  }

  async deleteReview(public_id: string): Promise<any> {
    const review: Review = await this.findById(public_id);

    return await this.db.review.delete({
      where: {
        public_id,
      },
    });
  }

  buildReviewResponse(review: ReviewType): ReviewResponseInterface {
    return { review };
  }
}
