"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const users_1 = __importDefault(require("./routes/users"));
const category_1 = __importDefault(require("./routes/category"));
const product_1 = __importDefault(require("./routes/product"));
const order_1 = __importDefault(require("./routes/order"));
const multer_2 = __importDefault(require("./config/multer"));
class Routes {
    constructor() {
        this.routes = (0, express_1.Router)();
        this.upload = (0, multer_1.default)(multer_2.default.upload('./tmp'));
        this.userRoutes = new users_1.default();
        this.categoryRoutes = new category_1.default();
        this.productRoutes = new product_1.default();
        this.orderRoutes = new order_1.default();
    }
    setup() {
        this.routes.use('/', this.userRoutes.setup());
        this.routes.use('/category', this.categoryRoutes.setup());
        this.routes.use('/product', this.upload.single('file'), this.productRoutes.setup());
        this.routes.use('/order', this.orderRoutes.setup());
        return this.routes;
    }
}
exports.default = Routes;
