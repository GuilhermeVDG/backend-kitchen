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
    this.routes.post('/add', this.orderController.addItem);
    this.routes.delete('/remove', this.orderController.removeItem);
    this.routes.put('/send', this.orderController.sendOrder);
    this.routes.get('/list', this.orderController.listAll);
    this.routes.get('/detail', this.orderController.detailOrder);
    this.routes.put('/finish', this.orderController.finishOrder);

    return this.routes;
  }
}

export default Order;