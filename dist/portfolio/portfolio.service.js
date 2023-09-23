"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PortfolioService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const file_upload_service_1 = require("../file-upload/file-upload.service");
let PortfolioService = class PortfolioService {
    constructor(porfolioModel, fileUploadService) {
        this.porfolioModel = porfolioModel;
        this.fileUploadService = fileUploadService;
    }
    async createPortfolio(createPortfolioDTO, image) {
        const existingPortfolio = await this.porfolioModel.findOne({
            title: createPortfolioDTO.title,
        });
        if (existingPortfolio) {
            const error = new Error('Portfolio with this title already exists.');
            error['statusCode'] = 409;
            throw error;
        }
        try {
            const newPortfolio = await new this.porfolioModel(createPortfolioDTO);
            this.fileUploadService
                .uploadFileToFirebase(image, 'portfolio-images')
                .then((url) => (newPortfolio.imageUrl = url));
            return newPortfolio.save();
        }
        catch (err) {
            const error = new Error('Portfolio not created!');
            error['statusCode'] = 400;
            throw error;
        }
    }
    async updatePortfolio(portfolioId, updatePortfolioDTO, image) {
        const existingPortfolio = await this.porfolioModel.findByIdAndUpdate(portfolioId, updatePortfolioDTO, { new: true });
        if (!existingPortfolio) {
            throw new common_1.NotFoundException(`POrtfolio #${portfolioId} not found`);
        }
        else {
            if (image) {
                try {
                    const prefixToRemove = 'https://storage.googleapis.com/alataventures-1bb4a.appspot.com/';
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
                }
                catch (err) {
                    const error = new Error('Cannot upload images');
                    error['statusCode'] = 503;
                    throw error;
                }
            }
        }
        return existingPortfolio.save();
    }
    async getLatestPortfolios() {
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
            throw new common_1.NotFoundException('Portfolio data not found!');
        }
        const portfolios = portfolioData.map((item) => item.portfolios);
        const combinedPortfolios = portfolios.reduce((acc, curr) => acc.concat(curr), []);
        return combinedPortfolios;
    }
    async getAllPortfolios(page, size, type) {
        try {
            const pageSize = parseInt(size);
            console.log(type);
            const offset = (parseInt(page) - 1) * pageSize;
            const aggregation = [
                {
                    $match: {
                        ...(type !== 'ALL' && { status: type }),
                    },
                },
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
                ...(type !== 'ALL' ? [{ $sort: { status: 1 } }] : []),
            ];
            const [result] = await this.porfolioModel.aggregate(aggregation);
            const portfolioData = result?.items;
            const count = result?.totalCount;
            console.log(result);
            if (!portfolioData || portfolioData.length == 0) {
                throw new common_1.NotFoundException('Portfolio data not found!');
            }
            return { data: portfolioData, count: count };
        }
        catch (err) {
            console.log(err);
        }
    }
    async getPortfolio(portfolioId) {
        const existingPortfolio = await this.porfolioModel
            .findById(portfolioId)
            .exec();
        if (!existingPortfolio) {
            throw new common_1.NotFoundException(`Portfolio #${portfolioId} not found`);
        }
        return existingPortfolio;
    }
    async deletePortfolio(portfolioId) {
        const deletedPortfolio = await this.porfolioModel.findByIdAndDelete(portfolioId);
        if (!deletedPortfolio) {
            throw new common_1.NotFoundException(`Portfolio #${portfolioId} not found`);
        }
        else {
            const prefixToRemove = 'https://storage.googleapis.com/alataventures-1bb4a.appspot.com/';
            const imgUrl = deletedPortfolio.imageUrl;
            const queryStringStart = '?GoogleAccessId=';
            const parts = imgUrl.split(queryStringStart);
            const path = parts[0].replace(prefixToRemove, '');
            this.fileUploadService.deleteFile(path);
        }
        return deletedPortfolio;
    }
};
exports.PortfolioService = PortfolioService;
exports.PortfolioService = PortfolioService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Portfolio')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        file_upload_service_1.FileUploadService])
], PortfolioService);
//# sourceMappingURL=portfolio.service.js.map