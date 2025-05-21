"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_1 = __importDefault(require("../controllers/product"));
const auth_1 = __importDefault(require("../middlewares/auth"));
class Product {
    constructor() {
        this.routes = (0, express_1.Router)();
        this.productController = new product_1.default();
    }
    setup() {
        this.routes.use(auth_1.default);
        this.routes.post('/', this.productController.store);
        this.routes.get('/', this.productController.listByCategory);
        this.routes.get('/find', this.productController.find);
        return this.routes;
    }
}
exports.default = Product;
