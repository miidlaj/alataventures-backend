/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { CreatePortfolioDTO } from './createPortfolio.dto';

export class UpdatePortfolioDto extends PartialType(CreatePortfolioDTO) {}
