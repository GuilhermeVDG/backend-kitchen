import { Router } from "express";
import AuthMiddleware from "../middlewares/auth";
import OrderController from '../controllers/order';

class Order{
  routes: Router;
  orderController: OrderController;

  constructor(){
    this.routes = Router();
    this.orderController = new OrderController();
  }

  setup(){
    this.routes.use(AuthMiddleware);

    this.routes.post('/', this.orderController.store);
    this.routes.delete('/', this.orderController.removeOrder);

    return this.routes;
  }
}

export default Order;