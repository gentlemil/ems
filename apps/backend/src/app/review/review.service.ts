import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { Review } from '@prisma/client';

import { PrismaService } from '../../shared/services/prisma.service';

@Injectable()
export class ReviewService {
  constructor(private readonly db: PrismaService) {}

  async getAllReviews(query?: any): Promise<Omit<Review, 'id'>[]> {
    const reviews = await this.db.review.findMany({
      orderBy: {
        created_at: query.orderBy || 'desc',
      },
      take: +query?.limit || 10,
    });

    if (!reviews) {
      throw new HttpException('Reviews not found', HttpStatus.NOT_FOUND);
    }

    const reviewsWithoutId = reviews.map(({ id, ...rest }) => rest);

    return reviewsWithoutId;
  }

  async getReviewsStats() {
    const reviews = await this.db.review.findMany({});

    if (!reviews) {
      throw new HttpException('Reviews not found', HttpStatus.NOT_FOUND);
    }

    const stats: ReviewStats = {
      positive: reviews.filter(
        (review: Review) => review.sentiment === 'POSITIVE'
      ).length,
      neutral: reviews.filter(
        (review: Review) => review.sentiment === 'NEUTRAL'
      ).length,
      negative: reviews.filter(
        (review: Review) => review.sentiment === 'NEGATIVE'
      ).length,
      total: reviews.length,
    };

    return stats;
  }

  async findById(id: string): Promise<Review> {
    const review = await this.db.review.findUnique({
      where: {
        public_id: id,
      },
    });

    if (!review) {
      throw new HttpException('Review not found', HttpStatus.NOT_FOUND);
    }

    return review;
  }

  async getReviewById(id: string): Promise<Omit<Review, 'id'>> {
    const review = await this.findById(id);

    const { id: _, ...rest } = review;
    return rest;
  }

  async updateReview(id: string): Promise<Review> {
    const review = this.findById(id);

    await this.db.review.update({
      where: {
        public_id: id,
      },
      data: {
        is_confirmed: !(await review).is_confirmed,
      },
    });

    return review;
  }

  async deleteReview(id: string) {
    const review = this.findById(id);

    // TODO: if (user is not an author or is not an admin) throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);

    return await this.db.review.delete({
      where: {
        public_id: (await review).public_id,
      },
    });
  }
}

// TODO: move to shared folder
export type ReviewStats = {
  positive: number;
  neutral: number;
  negative: number;
  total: number;
};
