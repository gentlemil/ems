import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserResponseInterface, UsersResponseInterface } from './types';
import { PrismaService } from '../../shared/services';
import { UpdateUserDto } from './dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly db: PrismaService) {}

  async getAllUsers(query: any): Promise<UsersResponseInterface> {
    const users = await this.db.user.findMany({
      orderBy: {
        created_at: 'desc',
      },
      take: +query?.limit || 10,
    });

    if (!users) {
      throw new HttpException('Users not found', HttpStatus.NOT_FOUND);
    }

    const usersCount = await this.db.user.count();

    return { users, usersCount };
  }

  async getUserById(id: string): Promise<UserResponseInterface> {
    const user = await this.db.user.findUnique({
      where: {
        public_id: id,
      },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return { user };
  }

  async updateUser(
    public_id: string,
    updateUserDto: UpdateUserDto
  ): Promise<UserResponseInterface> {
    const user = await this.db.user.findUnique({
      where: {
        public_id,
      },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const hashedPassword = updateUserDto.password
      ? bcrypt.hashSync(updateUserDto.password, 10)
      : null;

    const data = await this.db.user.update({
      where: {
        public_id,
      },
      data: {
        password: hashedPassword || user.password,
        first_name: updateUserDto.firstName || user.first_name,
        last_name: updateUserDto.lastName || user.last_name,
        // position: updateUserDto.position || user.position,
        // role: updateUserDto.role || user.role,
      },
    });

    const { id, password, ...rest } = data;

    return { user: rest };
  }

  async deleteUser(public_id: string): Promise<{ status: 'ok' }> {
    const user = await this.db.user.findUnique({
      where: {
        public_id,
      },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    await this.db.user.delete({
      where: {
        public_id,
      },
    });

    return { status: 'ok' };
  }
}
