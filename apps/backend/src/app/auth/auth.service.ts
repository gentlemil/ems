import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { PrismaService } from '../../shared/services';

import { AuthDto } from './dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private db: PrismaService, private jwt: JwtService) {}

  async register(dto: AuthDto): Promise<{ access_token: string }> {
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

      return this.signToken(user.public_id, user.email);
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ForbiddenException('Credentials already taken');
      }
      throw error;
    }
  }

  async login(dto: LoginDto): Promise<{ access_token: string }> {
    const user = await this.db.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) {
      throw new ForbiddenException('Credentials incorrent');
    }

    const isPasswordMatch = await bcrypt.compare(dto.password, user.password);

    if (!isPasswordMatch) {
      throw new ForbiddenException('Credentials incorrent');
    }

    return this.signToken(user.public_id, user.email);
  }

  async signToken(
    userId: string,
    email: string
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };
    const secret = process.env.JWT_SECRET;

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: secret,
    });

    return {
      access_token: token,
    };
  }
}
