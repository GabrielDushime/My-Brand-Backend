"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = exports.chaiHttp = exports.chai = void 0;
const chai_1 = __importDefault(require("chai"));
exports.chai = chai_1.default;
const chai_http_1 = __importDefault(require("chai-http"));
exports.chaiHttp = chai_http_1.default;
const app_1 = __importDefault(require("../app"));
exports.app = app_1.default;
chai_1.default.use(chai_http_1.default);
//# sourceMappingURL=setup.js.map