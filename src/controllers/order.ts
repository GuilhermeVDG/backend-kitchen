import { Request, Response } from "express";
import OrderServices from '../services/order';

class Order{
  orderServices: OrderServices

  constructor(){
    this.orderServices = new OrderServices;

    this.store = this.store.bind(this);
    this.removeOrder = this.removeOrder.bind(this);
    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.sendOrder = this.sendOrder.bind(this);
    this.listAll = this.listAll.bind(this);
    this.detailOrder = this.detailOrder.bind(this);
    this.finishOrder = this.finishOrder.bind(this);
  }

  async store(req: Request, res: Response){
    const { table, name } = req.body;

    const response = await this.orderServices.store({
      table,
      name
    });

    return res.json(response);
  }

  async removeOrder(req: Request, res: Response) {
    const order_id = req.query.order_id as string;

    const response = await this.orderServices.removeOrder({ order_id });

    return res.json(response);
  }

  async addItem(req: Request, res: Response){
    const { order_id, product_id, amount } = req.body;

    const response = await this.orderServices.addItem({
      order_id,
      product_id,
      amount
    });

    return res.json(response);
  }

  async removeItem(req: Request, res: Response){
    const item_id = req.query.item_id as string;

    const response = await this.orderServices.removeItem({ item_id });

    return res.json(response);
  }

  async sendOrder(req: Request, res: Response){
    const { order_id } = req.body;
    
    const response = await this.orderServices.sendOrder({ order_id });

    return res.json(response);
  }

  async listAll(req: Request, res: Response){
    const response = await this.orderServices.listAll();

    return res.json(response);
  }

  async detailOrder(req: Request, res: Response){
    const order_id = req.query.order_id as string;

    const response = await this.orderServices.detailOrder({ order_id });

    return res.json(response);
  }

  async finishOrder(req: Request, res: Response){
    const { order_id } = req.body;

    const response = await this.orderServices.finishOrder({ order_id });

    return res.json(response);
  }
}

export default Order;