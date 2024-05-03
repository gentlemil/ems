import { Controller, Get, UseGuards } from '@nestjs/common';

import { JwtGuard } from '../auth/guard';
import { GetUser } from '../auth/decorator';
import { UserService } from './user.service';

import { User } from '@prisma/client';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtGuard)
  @Get('me')
  getMe(@GetUser() user: User) {
    return user;
  }
}
