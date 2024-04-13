import { User } from '@prisma/client';

export interface UsersResponseInterface {
  users: User[];
  usersCount: number;
}
