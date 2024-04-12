import { Article } from '@prisma/client';

export interface ArticlesResponseInterface {
  articles: Article[];
  articlesCount: number;
}
