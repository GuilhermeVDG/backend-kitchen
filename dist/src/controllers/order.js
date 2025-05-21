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
const order_1 = __importDefault(require("../services/order"));
class Order {
    constructor() {
        this.orderServices = new order_1.default;
        this.store = this.store.bind(this);
        this.removeOrder = this.removeOrder.bind(this);
        this.addItem = this.addItem.bind(this);
        this.removeItem = this.removeItem.bind(this);
        this.sendOrder = this.sendOrder.bind(this);
        this.listAll = this.listAll.bind(this);
        this.detailOrder = this.detailOrder.bind(this);
        this.finishOrder = this.finishOrder.bind(this);
    }
    store(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { table, name } = req.body;
            const response = yield this.orderServices.store({
                table,
                name
            });
            return res.json(response);
        });
    }
    removeOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const order_id = req.query.order_id;
            const response = yield this.orderServices.removeOrder({ order_id });
            return res.json(response);
        });
    }
    addItem(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { order_id, product_id, amount } = req.body;
            const response = yield this.orderServices.addItem({
                order_id,
                product_id,
                amount
            });
            return res.json(response);
        });
    }
    removeItem(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const item_id = req.query.item_id;
            const response = yield this.orderServices.removeItem({ item_id });
            return res.json(response);
        });
    }
    sendOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { order_id } = req.body;
            const response = yield this.orderServices.sendOrder({ order_id });
            return res.json(response);
        });
    }
    listAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.orderServices.listAll();
            return res.json(response);
        });
    }
    detailOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const order_id = req.query.order_id;
            const response = yield this.orderServices.detailOrder({ order_id });
            return res.json(response);
        });
    }
    finishOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { order_id } = req.body;
            const response = yield this.orderServices.finishOrder({ order_id });
            return res.json(response);
        });
    }
}
exports.default = Order;
