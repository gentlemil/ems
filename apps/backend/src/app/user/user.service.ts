import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import * as bcrypt from 'bcrypt';

import { User } from '@prisma/client';

import { PrismaService } from '../../shared/services/prisma.service';

import { CreateUserDto, UpdateUserDto } from './dto/createUserDto';
import { UserResponseInterface } from './types/userResponse.interface';

const saltOrRounds: number = process.env.SALT_ROUNDS
  ? parseInt(process.env.SALT_ROUNDS)
  : 10;

@Injectable()
export class UserService {
  constructor(private readonly db: PrismaService) {}

  async findOneById(public_id: string) {
    return await this.db.user.findUnique({ where: { public_id } });
  }

  async findOneWithEmail(email: string) {
    return await this.db.user.findUnique({ where: { email } });
  }

  async create(createUserDto: CreateUserDto) {
    const hashPass = await bcrypt.hash(createUserDto.password, saltOrRounds);

    return await this.db.user.create({
      data: {
        email: createUserDto.email,
        first_name: createUserDto.firstName,
        last_name: createUserDto.lastName,
        password: hashPass,
        is_confirmed: createUserDto.isConfirmed || false,
      },
    });
  }

  async updateUser(public_id: string, updateUserDto: UpdateUserDto) {
    const user = this.findOneById(public_id);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return await this.db.user.update({
      where: {
        public_id,
      },
      data: {
        ...updateUserDto,
      },
    });
  }

  async deleteUser(public_id: string) {
    const user = this.findOneById(public_id);

    if (!user) {
      throw new HttpException('User does not exist', HttpStatus.NOT_FOUND);
    }

    // TODO: check if user has admin permissions

    await this.db.user.delete({
      where: {
        public_id,
      },
    });

    return { status: 'ok' };
  }

  buildUserResponse(user: User): UserResponseInterface {
    return { user };
  }
}
