import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Article } from '@prisma/client';

import { PrismaService } from '../../shared/services/prisma.service';

import { CreateArticleDto } from './dto/createArticle.dto';
import { UpdateArticleDto } from './dto/updateArticle.dto';

import { ArticlesResponseInterface } from './types/articlesResponse.interface';
import { ArticleResponseInterface } from './types/articleResponse.interface';

@Injectable()
export class ArticleService {
  constructor(private readonly db: PrismaService) {}

  async getAllArticles(): Promise<ArticlesResponseInterface> {
    const articles = await this.db.article.findMany({
      orderBy: {
        created_at: 'desc',
      },
    });

    if (!articles) {
      throw new HttpException('Articles not found', HttpStatus.NOT_FOUND);
    }

    const articlesCount = articles.length;

    return { articles, articlesCount };
  }

  async findById(id: string) {
    const article = await this.db.article.findUnique({
      where: {
        public_id: id,
      },
    });

    if (!article) {
      throw new HttpException('Article not found', HttpStatus.NOT_FOUND);
    }

    return article;
  }

  async createArticle(createArticleDto: CreateArticleDto): Promise<Article> {
    return await this.db.article.create({
      data: {
        ...createArticleDto,
      },
    });
  }

  async updateArticle(
    id: string,
    updateArticleDto: UpdateArticleDto
  ): Promise<Article> {
    const article = this.findById(id);

    if (!article) {
      throw new HttpException('Article does not exist', HttpStatus.NOT_FOUND);
    }

    // TODO: check if user has admin permissions

    return await this.db.article.update({
      where: {
        public_id: id,
      },
      data: {
        ...updateArticleDto,
      },
    });
  }

  async deleteArticle(id: string): Promise<{ status: string }> {
    const article = this.findById(id);

    if (!article) {
      throw new HttpException('Article does not exist', HttpStatus.NOT_FOUND);
    }

    // TODO: check if user has admin permissions

    await this.db.article.delete({
      where: {
        public_id: id,
      },
    });

    return { status: 'ok' };
  }

  buildArticleResponse(article: Article): ArticleResponseInterface {
    return { article };
  }
}
