/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  HttpStatus,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  Put,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { CreatePortfolioDTO } from './createPortfolio.dto';
import { UpdatePortfolioDto } from './updatePortfolio.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('portfolio')
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async createPortfolio(
    @Res() response,
    @Body() createPortfolioDto: CreatePortfolioDTO,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 4 }),
        ],
      }),
    )
    image: Express.Multer.File,
  ) {
    const newPortfolio = await this.portfolioService.createPortfolio(
      createPortfolioDto,
      image,
    );
    return response.status(HttpStatus.CREATED).json({
      message: 'Portfolio has been created successfully',
      newPortfolio,
    });
  }
  @Put('/:id')
  @UseInterceptors(FileInterceptor('image'))
  async updatePortfolio(
    @Res() response,
    @Param('id') portfolioId: string,
    @Body() updatePortfolioDto: UpdatePortfolioDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 4 }),
        ],
        fileIsRequired: false
      }),
    )
    image: Express.Multer.File,
  ) {
    
      const existingPortfolio = await this.portfolioService.updatePortfolio(
        portfolioId,
        updatePortfolioDto,
        image,
      );
      return response.status(HttpStatus.OK).json({
        message: 'Portfolio has been successfully updated',
        existingPortfolio,
      });
    
  }
  @Get()
  async getPortfolios(@Res() response) {
    try {
      const portfolioData = await this.portfolioService.getAllPortfolios();
      return response.status(HttpStatus.OK).json({
        message: 'All portfolio datas found successfully',
        portfolioData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
  @Get('/:id')
  async getPortfolio(@Res() response, @Param('id') portfolioId: string) {
    try {
      const existingPortfolio =
        await this.portfolioService.getPortfolio(portfolioId);
      return response.status(HttpStatus.OK).json({
        message: 'Portfolio found successfully',
        existingPortfolio,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
  @Delete('/:id')
  async deletePortfolio(@Res() response, @Param('id') portfolioId: string) {
    try {
      const deletedPortfolio =
        await this.portfolioService.deletePortfolio(portfolioId);
      return response.status(HttpStatus.OK).json({
        message: 'Student deleted successfully',
        deletedPortfolio,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
