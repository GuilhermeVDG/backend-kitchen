"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const path_1 = __importDefault(require("path"));
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.routes = new routes_1.default();
        this.app.use(express_1.default.json());
        this.app.use((0, cors_1.default)());
        this.app.use(this.routes.setup());
        this.app.use('/files', express_1.default.static(path_1.default.resolve(__dirname, '..', 'tmp')));
        this.app.use((err, req, res, next) => {
            if (err instanceof Error) {
                return res.status(400).json({
                    error: err.message
                });
            }
            return res.status(500).json({
                status: 'error',
                message: 'Internal server error.'
            });
        });
    }
    startServer() {
        this.app.listen(3333, () => {
            console.log('Server started in port 3333');
        });
    }
}
exports.default = App;
