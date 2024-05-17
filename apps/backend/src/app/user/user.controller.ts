import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';

import { JwtGuard } from '../auth/guard';
import { GetUser } from '../auth/decorator';
import { UserService } from './user.service';

import { User } from '@prisma/client';
import { UserResponseInterface, UsersResponseInterface } from './types';
import { UpdateUserDto } from './dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtGuard)
  @Get('me')
  getMe(@GetUser() user: User) {
    return user;
  }

  @Get()
  async getAllUsers(@Query() query?: any): Promise<UsersResponseInterface> {
    return await this.userService.getAllUsers(query);
  }

  @Get(':id')
  async getUserById(
    @Param('id') public_id: string
  ): Promise<UserResponseInterface> {
    return await this.userService.getUserById(public_id);
  }

  @Patch(':id')
  async updateUser(
    @Param('id') public_id: string,
    @Body('user') updateUserDto: UpdateUserDto
  ): Promise<UserResponseInterface> {
    return await this.userService.updateUser(public_id, updateUserDto);
  }

  @Delete(':id')
  async deleteUser(@Param('id') public_id: string): Promise<any> {
    return await this.userService.deleteUser(public_id);
  }
}
