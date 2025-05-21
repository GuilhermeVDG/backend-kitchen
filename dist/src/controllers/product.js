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
const product_1 = __importDefault(require("../services/product"));
class Product {
    constructor() {
        this.productServices = new product_1.default();
        this.store = this.store.bind(this);
        this.listByCategory = this.listByCategory.bind(this);
        this.find = this.find.bind(this);
    }
    store(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, price, description, category_id } = req.body;
            if (!req.file)
                throw new Error("FILE_NOT_FOUND");
            const { originalname, filename: banner } = req.file;
            const response = yield this.productServices.store({
                name,
                price,
                description,
                banner,
                category_id
            });
            return res.json(response);
        });
    }
    listByCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const category_id = req.query.category_id;
            const response = yield this.productServices.listByCategory({ category_id });
            return res.json(response);
        });
    }
    find(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const product_id = req.body.product_id;
            const response = yield this.productServices.find({ product_id });
            return res.json(response);
        });
    }
}
exports.default = Product;
