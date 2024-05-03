import { ForbiddenException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { AuthDto } from './dto';
import { PrismaService } from '../../shared/services';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class AuthService {
  constructor(private db: PrismaService) {}

  async signup(dto: AuthDto): Promise<any> {
    const password = bcrypt.hashSync(dto.password, 10);
    try {
      const user = await this.db.user.create({
        data: {
          email: dto.email,
          password: password,
          first_name: dto.firstName,
          last_name: dto.lastName,
          position: dto.position,
        },
      });
      delete user.id;
      delete user.password;

      return { user };
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ForbiddenException('Credentials already taken');
      }
      throw error;
    }
  }

  singin() {}
}
