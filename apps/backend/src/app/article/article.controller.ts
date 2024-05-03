import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { ArticleService } from './article.service';
import { ArticleResponseInterface } from './types/articleResponse.interface';
import { ArticlesResponseInterface } from './types/articlesResponse.interface';

import { CreateArticleDto } from './dto/createArticle.dto';
import { UpdateArticleDto } from './dto/updateArticle.dto';

@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get()
  async getAllArticles(): Promise<ArticlesResponseInterface> {
    return await this.articleService.getAllArticles();
  }

  // TODO
  // @Post()
  // async createArticle(
  //   @Body('article') createArticleDto: CreateArticleDto
  // ): Promise<ArticleResponseInterface> {
  //   const article = await this.articleService.createArticle(createArticleDto);
  //   return this.articleService.buildArticleResponse(article);
  // }

  @Get(':id')
  async getSingleArticle(
    @Param('id') id: string
  ): Promise<ArticleResponseInterface> {
    const article = await this.articleService.findById(id);
    return { article };
  }

  @Patch(':id')
  async updateArticle(
    @Param('id') id: string,
    @Body('article') updateArticleDto: UpdateArticleDto
  ): Promise<ArticleResponseInterface> {
    const article = await this.articleService.updateArticle(
      id,
      updateArticleDto
    );
    return this.articleService.buildArticleResponse(article);
  }

  @Delete(':id')
  async deleteArticle(@Param('id') id: string) {
    return await this.articleService.deleteArticle(id);
  }
}
