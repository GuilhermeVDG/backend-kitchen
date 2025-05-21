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
const jsonwebtoken_1 = require("jsonwebtoken");
const auth_1 = __importDefault(require("../config/auth"));
exports.default = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authToken = req.headers.authorization;
    if (!authToken)
        return res.status(401).json({ error: 'INVALID_TOKEN' });
    const token = authToken.split(' ')[1];
    try {
        const { sub } = (0, jsonwebtoken_1.verify)(token, auth_1.default.secret);
        req.userId = sub;
        return next();
    }
    catch (err) {
        return res.status(401).json({ error: 'INVALID_TOKEN' });
    }
});
