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
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = require("jsonwebtoken");
const auth_1 = __importDefault(require("../config/auth"));
class User {
    store({ name, email, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!email) {
                throw new Error("INVALID_EMAIL");
            }
            const userAlreadyExists = yield prisma_1.default.user.findFirst({
                where: {
                    email: email
                }
            });
            if (userAlreadyExists)
                throw new Error("USER_ALREADY_EXISTS");
            const passwordHash = yield (0, bcryptjs_1.hash)(password, 8);
            const user = yield prisma_1.default.user.create({
                data: {
                    name: name,
                    email: email,
                    password: passwordHash
                },
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            });
            return user;
        });
    }
    login({ email, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield prisma_1.default.user.findFirst({
                where: {
                    email: email
                }
            });
            if (!user)
                throw new Error("USER_NOT_EXISTS");
            const samePassword = yield (0, bcryptjs_1.compare)(password, user.password);
            if (!samePassword)
                throw new Error("WRONG_PASSWORD");
            const token = (0, jsonwebtoken_1.sign)({
                name: user.name,
                email: user.email
            }, auth_1.default.secret, {
                subject: user.id,
                expiresIn: auth_1.default.expiresIn
            });
            return {
                id: user.id,
                name: user.name,
                email: user.email,
                token: token
            };
        });
    }
    detail(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield prisma_1.default.user.findFirst({
                where: {
                    id: userId
                },
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            });
            return user;
        });
    }
}
exports.default = User;
