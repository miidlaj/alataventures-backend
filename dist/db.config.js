"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseConnectionProviders = void 0;
const mongoose_1 = require("mongoose");
const database_constants_1 = require("./database.constants");
const mongodb_config_1 = require("./mongodb.config");
exports.databaseConnectionProviders = [
    {
        provide: database_constants_1.DATABASE_CONNECTION,
        useFactory: (dbConfig) => (0, mongoose_1.createConnection)(dbConfig.uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        }),
        inject: [mongodb_config_1.default.KEY],
    }
];
//# sourceMappingURL=db.config.js.map