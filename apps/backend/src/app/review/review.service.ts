import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class ReviewService {
  constructor(private readonly db: PrismaService) {}

  getAllReviews() {
    const reviews = this.db.review.findMany({
      orderBy: {
        created_at: 'desc',
      },
    });

    if (!reviews) {
      throw new HttpException('Reviews not found', HttpStatus.NOT_FOUND);
    }

    return reviews;
  }

  async findById(id: string) {
    const review = await this.db.review.findUnique({
      where: {
        public_id: id,
      },
    });

    return review;
  }

  getReviewById(id: string) {
    const review = this.findById(id);

    if (!review) {
      throw new HttpException('Review not found', HttpStatus.NOT_FOUND);
    }

    return review;
  }

  async deleteReview(id: string) {
    const review = this.findById(id);

    if (!review) {
      throw new HttpException('Review not found', HttpStatus.NOT_FOUND);
    }

    // TODO: if (user is not an author or is not an admin) throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);

    return await this.db.review.delete({
      where: {
        public_id: id,
      },
    });
  }
}
