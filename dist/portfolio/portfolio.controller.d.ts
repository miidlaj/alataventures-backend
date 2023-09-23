/// <reference types="multer" />
import { PortfolioService } from './portfolio.service';
import { CreatePortfolioDTO } from './createPortfolio.dto';
import { UpdatePortfolioDto } from './updatePortfolio.dto';
export declare class PortfolioController {
    private readonly portfolioService;
    constructor(portfolioService: PortfolioService);
    createPortfolio(response: any, createPortfolioDto: CreatePortfolioDTO, image: Express.Multer.File): Promise<any>;
    updatePortfolio(response: any, portfolioId: string, updatePortfolioDto: UpdatePortfolioDto, image: Express.Multer.File): Promise<any>;
    getPortfolios(response: any, page?: string, pageSize?: string, type?: string): Promise<any>;
    getLatestPortfolios(response: any): Promise<any>;
    getPortfolio(response: any, portfolioId: string): Promise<any>;
    deletePortfolio(response: any, portfolioId: string): Promise<any>;
}
