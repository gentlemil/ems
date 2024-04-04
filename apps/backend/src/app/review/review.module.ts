import { PrismaService } from './prisma.service';
import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';

@Module({
  providers: [ReviewService, PrismaService],
  controllers: [ReviewController],
})
export class ReviewModule {}
