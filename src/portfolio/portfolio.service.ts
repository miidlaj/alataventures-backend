/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePortfolioDTO } from './createPortfolio.dto';
import { UpdatePortfolioDto } from './updatePortfolio.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PortfolioDocument } from './portfolio.schema';
import { FileUploadService } from 'src/file-upload/file-upload.service';

@Injectable()
export class PortfolioService {
  constructor(
    @InjectModel('Portfolio') private porfolioModel: Model<PortfolioDocument>,
    private readonly fileUploadService: FileUploadService,
  ) {}
  async createPortfolio(
    createPortfolioDTO: CreatePortfolioDTO,
    image: Express.Multer.File,
  ): Promise<PortfolioDocument> {
    const existingPortfolio = await this.porfolioModel.findOne({
      title: createPortfolioDTO.title,
    });
    if (existingPortfolio) {
      const error = new Error('Portfolio with this title already exists.');
      error['statusCode'] = 409; // HTTP status code for conflict
      throw error;
    }
    try {
      const newPortfolio = await new this.porfolioModel(createPortfolioDTO);
      this.fileUploadService
        .uploadFileToFirebase(image, 'portfolio-images')
        .then((url) => (newPortfolio.imageUrl = url));
      return newPortfolio.save();
    } catch (err) {
      const error = new Error('Portfolio not created!');
      error['statusCode'] = 400; // HTTP status code for conflict
      throw error;
    }
  }

  async updatePortfolio(
    portfolioId: string,
    updatePortfolioDTO: UpdatePortfolioDto,
    image: Express.Multer.File,
  ): Promise<PortfolioDocument> {
    const existingPortfolio = await this.porfolioModel.findByIdAndUpdate(
      portfolioId,
      updatePortfolioDTO,
      { new: true },
    );
    if (!existingPortfolio) {
      throw new NotFoundException(`POrtfolio #${portfolioId} not found`);
    } else {
      if (image) {
        try {
          const prefixToRemove =
            'https://storage.googleapis.com/alataventures-1bb4a.appspot.com/';
          const imgUrl = existingPortfolio.imageUrl;
          const queryStringStart = '?GoogleAccessId=';
          const parts = imgUrl.split(queryStringStart);
          const path = parts[0].replace(prefixToRemove, '');
          this.fileUploadService.deleteFile(path);

          this.fileUploadService
            .uploadFileToFirebase(image, 'portfolio-images')
            .then((url) => {
              existingPortfolio.imageUrl = url;
            });
        } catch (err) {
          const error = new Error('Cannot upload images');
          error['statusCode'] = 503; // HTTP status code for conflict
          throw error;
        }
      }
    }

    return existingPortfolio.save();
  }

  async getLatestPortfolios(): Promise<PortfolioDocument[]> {
    const aggregationPipeline = [
      {
        $group: {
          _id: '$status',
          portfolios: { $push: '$$ROOT' },
        },
      },
      {
        $project: {
          status: '$_id',
          portfolios: { $slice: ['$portfolios', 6] },
          _id: 0,
        },
      },
      {
        $unwind: '$portfolios',
      },
    ];

    const portfolioData = await this.porfolioModel
      .aggregate(aggregationPipeline)
      .exec();

    if (!portfolioData || portfolioData.length == 0) {
      throw new NotFoundException('Portfolio data not found!');
    }

    const portfolios = portfolioData.map((item) => item.portfolios);

    const combinedPortfolios = portfolios.reduce(
      (acc, curr) => acc.concat(curr),
      [],
    );

    return combinedPortfolios;

    // const portfolioData = await this.porfolioModel.find().sort({ createdAt: -1 }).limit(6);
    // if (!portfolioData || portfolioData.length == 0) {
    //   throw new NotFoundException('Portfolio data not found!');
    // }
    // return portfolioData;
  }

  async getAllPortfolios(
    page: string,
    size: string
  ): Promise<{ data: PortfolioDocument; count: number }> {

    try {      
      const pageSize = parseInt(size);

      const offset = (parseInt(page) - 1) * pageSize;

      const aggregation = [
        {
          $facet: {
            items: [
              { $skip: offset }, 
              { $limit: pageSize }, 
            ],
            totalCount: [{ $count: 'value' }],
          },
        },
        {
          $unwind: '$totalCount',
        },
      ];

      console.log(aggregation);
      
      const [result] = await this.porfolioModel.aggregate(aggregation);
      console.log(result);
      
      // const portfolioData = await this.porfolioModel.find().skip(offset).limit(pageSize).exec();
      const portfolioData = result?.items;
      const count = result?.totalCount;
      if (!portfolioData || portfolioData.length == 0) {
        throw new NotFoundException('Portfolio data not found!');
      }
      return { data: portfolioData, count: count };
    } catch (err) {
      console.log(err);
    }
  }

  async getPortfolio(portfolioId: string): Promise<PortfolioDocument> {
    const existingPortfolio = await this.porfolioModel
      .findById(portfolioId)
      .exec();
    if (!existingPortfolio) {
      throw new NotFoundException(`Portfolio #${portfolioId} not found`);
    }
    return existingPortfolio;
  }

  async deletePortfolio(portfolioId: string): Promise<PortfolioDocument> {
    const deletedPortfolio =
      await this.porfolioModel.findByIdAndDelete(portfolioId);
    if (!deletedPortfolio) {
      throw new NotFoundException(`Portfolio #${portfolioId} not found`);
    } else {
      const prefixToRemove =
        'https://storage.googleapis.com/alataventures-1bb4a.appspot.com/';
      const imgUrl = deletedPortfolio.imageUrl;
      const queryStringStart = '?GoogleAccessId=';
      const parts = imgUrl.split(queryStringStart);
      const path = parts[0].replace(prefixToRemove, '');
      this.fileUploadService.deleteFile(path);
    }
    return deletedPortfolio;
  }
}
