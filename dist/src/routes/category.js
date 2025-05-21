"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const category_1 = __importDefault(require("../controllers/category"));
const auth_1 = __importDefault(require("../middlewares/auth"));
class Category {
    constructor() {
        this.routes = (0, express_1.Router)();
        this.categoryController = new category_1.default();
    }
    setup() {
        this.routes.use(auth_1.default);
        this.routes.post('/', this.categoryController.store);
        this.routes.get('/', this.categoryController.list);
        return this.routes;
    }
}
exports.default = Category;
