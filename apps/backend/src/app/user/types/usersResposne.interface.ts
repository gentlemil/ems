import { UserType } from "./user.type";

export interface UsersResponseInterface {
  users: UserType[];
  usersCount: number;
}