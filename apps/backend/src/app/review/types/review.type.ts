import { Review } from '@prisma/client';

export type ReviewType = Omit<Review, 'id'>;
