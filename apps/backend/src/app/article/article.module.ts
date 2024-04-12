import { Module } from '@nestjs/common';

import { PrismaService } from '../../shared/services/prisma.service';

import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';

@Module({
  providers: [ArticleService, PrismaService],
  controllers: [ArticleController],
})
export class ArticleModule {}
