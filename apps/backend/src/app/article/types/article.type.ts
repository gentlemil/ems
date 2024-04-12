import { Article } from '@prisma/client';

export type ArticleType = Omit<Article, 'id'>;
