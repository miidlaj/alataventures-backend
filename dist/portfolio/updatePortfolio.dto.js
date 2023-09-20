"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePortfolioDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const createPortfolio_dto_1 = require("./createPortfolio.dto");
class UpdatePortfolioDto extends (0, mapped_types_1.PartialType)(createPortfolio_dto_1.CreatePortfolioDTO) {
}
exports.UpdatePortfolioDto = UpdatePortfolioDto;
//# sourceMappingURL=updatePortfolio.dto.js.map