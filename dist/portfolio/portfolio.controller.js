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
exports.PortfolioController = void 0;
const common_1 = require("@nestjs/common");
const portfolio_service_1 = require("./portfolio.service");
const createPortfolio_dto_1 = require("./createPortfolio.dto");
const updatePortfolio_dto_1 = require("./updatePortfolio.dto");
const platform_express_1 = require("@nestjs/platform-express");
const auth_guard_1 = require("../auth/auth.guard");
let PortfolioController = class PortfolioController {
    constructor(portfolioService) {
        this.portfolioService = portfolioService;
    }
    async createPortfolio(response, createPortfolioDto, image) {
        try {
            const newPortfolio = await this.portfolioService.createPortfolio(createPortfolioDto, image);
            return response.status(common_1.HttpStatus.CREATED).json({
                message: 'Portfolio has been created successfully',
                newPortfolio,
            });
        }
        catch (err) {
            return response.status(err.status).json(err.response);
        }
    }
    async updatePortfolio(response, portfolioId, updatePortfolioDto, image) {
        try {
            const existingPortfolio = await this.portfolioService.updatePortfolio(portfolioId, updatePortfolioDto, image);
            return response.status(common_1.HttpStatus.OK).json({
                message: 'Portfolio has been successfully updated',
                existingPortfolio,
            });
        }
        catch (err) {
            return response.status(err.status).json(err.response);
        }
    }
    async getPortfolios(response, page = "1", pageSize = "6", type = 'ALL') {
        try {
            console.log(type);
            const portfolioData = await this.portfolioService.getAllPortfolios(page, pageSize, type);
            return response.status(common_1.HttpStatus.OK).json({
                message: 'All portfolio datas found successfully',
                portfolioData,
            });
        }
        catch (err) {
            return response.status(err.status).json(err.response);
        }
    }
    async getLatestPortfolios(response) {
        try {
            const portfolioData = await this.portfolioService.getLatestPortfolios();
            return response.status(common_1.HttpStatus.OK).json({
                message: 'Portfolio datas found successfully',
                portfolioData,
            });
        }
        catch (err) {
            return response.status(err.status).json(err.response);
        }
    }
    async getPortfolio(response, portfolioId) {
        try {
            const existingPortfolio = await this.portfolioService.getPortfolio(portfolioId);
            return response.status(common_1.HttpStatus.OK).json({
                message: 'Portfolio found successfully',
                existingPortfolio,
            });
        }
        catch (err) {
            return response.status(err.status).json(err.response);
        }
    }
    async deletePortfolio(response, portfolioId) {
        try {
            const deletedPortfolio = await this.portfolioService.deletePortfolio(portfolioId);
            return response.status(common_1.HttpStatus.OK).json({
                message: 'Portfolio deleted successfully',
                deletedPortfolio,
            });
        }
        catch (err) {
            return response.status(err.status).json(err.response);
        }
    }
};
exports.PortfolioController = PortfolioController;
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)(new common_1.ParseFilePipe({
        validators: [
            new common_1.FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
            new common_1.MaxFileSizeValidator({ maxSize: 1024 * 1024 * 4 }),
        ],
    }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, createPortfolio_dto_1.CreatePortfolioDTO, Object]),
    __metadata("design:returntype", Promise)
], PortfolioController.prototype, "createPortfolio", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Put)('/:id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.UploadedFile)(new common_1.ParseFilePipe({
        validators: [
            new common_1.FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
            new common_1.MaxFileSizeValidator({ maxSize: 1024 * 1024 * 4 }),
        ],
        fileIsRequired: false,
    }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, updatePortfolio_dto_1.UpdatePortfolioDto, Object]),
    __metadata("design:returntype", Promise)
], PortfolioController.prototype, "updatePortfolio", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('pageSize')),
    __param(3, (0, common_1.Query)('type')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String]),
    __metadata("design:returntype", Promise)
], PortfolioController.prototype, "getPortfolios", null);
__decorate([
    (0, common_1.Get)('latest'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PortfolioController.prototype, "getLatestPortfolios", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PortfolioController.prototype, "getPortfolio", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PortfolioController.prototype, "deletePortfolio", null);
exports.PortfolioController = PortfolioController = __decorate([
    (0, common_1.Controller)('portfolio'),
    __metadata("design:paramtypes", [portfolio_service_1.PortfolioService])
], PortfolioController);
//# sourceMappingURL=portfolio.controller.js.map