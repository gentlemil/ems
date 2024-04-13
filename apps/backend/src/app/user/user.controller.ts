import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { CreateUserDto, UpdateUserDto } from './dto/createUserDto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers() {
    // return await this.userService.getAllUsers();
  }

  @Post()
  async createUser(@Body('user') createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);
    return this.userService.buildUserResponse(user);
  }

  @Get(':id')
  findOne(@Param('id') public_d: string) {
    return this.userService.findOneById(public_d);
  }

  @Patch(':id')
  async updateuser(
    @Param('id') public_id: string,
    @Body('user') updateUserDto: UpdateUserDto
  ) {
    const user = await this.userService.updateUser(public_id, updateUserDto);
    return this.userService.buildUserResponse(user);
  }

  @Delete(':id')
  async deleteUser(@Param('id') public_id: string) {
    return await this.userService.deleteUser(public_id);
  }
}
