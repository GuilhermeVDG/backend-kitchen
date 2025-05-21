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
class Order {
    store({ table, name }) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield prisma_1.default.order.create({
                data: {
                    table: table,
                    name: name
                }
            });
            return response;
        });
    }
    removeOrder({ order_id }) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield prisma_1.default.order.delete({
                where: {
                    id: order_id
                }
            });
            return response;
        });
    }
    addItem({ order_id, product_id, amount }) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield prisma_1.default.item.create({
                data: {
                    order_id: order_id,
                    product_id: product_id,
                    amount: amount
                }
            });
            return response;
        });
    }
    removeItem({ item_id }) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield prisma_1.default.item.delete({
                where: {
                    id: item_id
                }
            });
            return response;
        });
    }
    sendOrder({ order_id }) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield prisma_1.default.order.update({
                where: {
                    id: order_id
                },
                data: {
                    draft: false
                }
            });
            return response;
        });
    }
    listAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield prisma_1.default.order.findMany({
                where: {
                    draft: false,
                    status: false
                },
                orderBy: {
                    created_at: 'desc'
                }
            });
            return response;
        });
    }
    detailOrder({ order_id }) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield prisma_1.default.item.findMany({
                where: {
                    order_id: order_id
                },
                include: {
                    product: true,
                    order: true
                }
            });
            return response;
        });
    }
    finishOrder({ order_id }) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield prisma_1.default.order.update({
                where: {
                    id: order_id
                },
                data: {
                    status: true
                }
            });
            return response;
        });
    }
}
exports.default = Order;
