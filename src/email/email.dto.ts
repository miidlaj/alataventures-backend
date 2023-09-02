/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class EmailDto {

  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  name: string;

  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  emailAddress: string;

  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  subject: string;

  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  phone: string;

  @IsString()
  @MaxLength(1024)
  @IsNotEmpty()
  message: string;
}
