"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../prisma"));
class Category {
    store({ name }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!name)
                throw new Error("INVALID_NAME");
            const nameAlreadyExists = yield prisma_1.default.category.findFirst({
                where: {
                    name: name
                }
            });
            if (nameAlreadyExists)
                throw new Error("CATEGORY_ALREADY_EXISTS");
            const response = yield prisma_1.default.category.create({
                data: {
                    name: name
                },
                select: {
                    name: true,
                    id: true
                }
            });
            return response;
        });
    }
    list() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield prisma_1.default.category.findMany({
                select: {
                    id: true,
                    name: true
                }
            });
            if (!response)
                throw new Error("NOT_FOUND");
            return response;
        });
    }
}
exports.default = Category;
