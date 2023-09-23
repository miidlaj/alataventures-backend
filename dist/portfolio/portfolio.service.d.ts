/// <reference types="multer" />
import { CreatePortfolioDTO } from './createPortfolio.dto';
import { UpdatePortfolioDto } from './updatePortfolio.dto';
import { Model } from 'mongoose';
import { PortfolioDocument } from './portfolio.schema';
import { FileUploadService } from 'src/file-upload/file-upload.service';
export declare class PortfolioService {
    private porfolioModel;
    private readonly fileUploadService;
    constructor(porfolioModel: Model<PortfolioDocument>, fileUploadService: FileUploadService);
    createPortfolio(createPortfolioDTO: CreatePortfolioDTO, image: Express.Multer.File): Promise<PortfolioDocument>;
    updatePortfolio(portfolioId: string, updatePortfolioDTO: UpdatePortfolioDto, image: Express.Multer.File): Promise<PortfolioDocument>;
    getLatestPortfolios(): Promise<PortfolioDocument[]>;
    getAllPortfolios(page: string, size: string, type: string): Promise<{
        data: PortfolioDocument;
        count: number;
    }>;
    getPortfolio(portfolioId: string): Promise<PortfolioDocument>;
    deletePortfolio(portfolioId: string): Promise<PortfolioDocument>;
}
