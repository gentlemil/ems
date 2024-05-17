import { User } from '@prisma/client';

export type UserType = Omit<User, 'id' | 'password'>;
