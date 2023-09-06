/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreatePortfolioDTO {
    
  @IsString()
  @MaxLength(128)
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly company: string;

  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly location: string;

  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly status: string;

  @IsString()
  @MaxLength(1024)
  readonly imageUrl: string;
}
