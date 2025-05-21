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
const users_1 = __importDefault(require("../services/users"));
class User {
    constructor() {
        this.userServices = new users_1.default();
        this.create = this.create.bind(this);
        this.login = this.login.bind(this);
        this.detail = this.detail.bind(this);
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, password } = req.body;
            const response = yield this.userServices.store({
                name,
                email,
                password
            });
            return res.json(response);
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            const response = yield this.userServices.login({
                email,
                password
            });
            return res.json(response);
        });
    }
    detail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.userServices.detail(req.userId);
            return res.json(response);
        });
    }
}
exports.default = User;
