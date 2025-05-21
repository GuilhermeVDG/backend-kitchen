"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("../middlewares/auth"));
const order_1 = __importDefault(require("../controllers/order"));
class Order {
    constructor() {
        this.routes = (0, express_1.Router)();
        this.orderController = new order_1.default();
    }
    setup() {
        this.routes.use(auth_1.default);
        this.routes.post('/', this.orderController.store);
        this.routes.delete('/', this.orderController.removeOrder);
        this.routes.post('/add', this.orderController.addItem);
        this.routes.delete('/remove', this.orderController.removeItem);
        this.routes.put('/send', this.orderController.sendOrder);
        this.routes.get('/list', this.orderController.listAll);
        this.routes.get('/detail', this.orderController.detailOrder);
        this.routes.put('/finish', this.orderController.finishOrder);
        return this.routes;
    }
}
exports.default = Order;
