import { Request, Response } from "express";
import OrderServices from '../services/order';

class Order{
  orderServices: OrderServices

  constructor(){
    this.orderServices = new OrderServices;

    this.store = this.store.bind(this);
  }

  async store(req: Request, res: Response){
    const { table, name } = req.body;

    const response = await this.orderServices.store({
      table,
      name
    });

    return res.json(response);
  }
}

export default Order;