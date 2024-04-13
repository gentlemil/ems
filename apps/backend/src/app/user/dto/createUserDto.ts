import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  password: string;

  @IsBoolean()
  isConfirmed?: boolean = false;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
