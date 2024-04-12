import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ReviewModule } from './review/review.module';

import { ArticleModule } from './article/article.module';

@Module({
  imports: [ReviewModule, ArticleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
