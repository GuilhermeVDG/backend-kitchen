import { Request, Response } from "express";
import ProductServices from '../services/product';

class Product{
  productServices: ProductServices;
  
  constructor(){
    this.productServices = new ProductServices();

    this.store = this.store.bind(this);
  }

  async store(req: Request, res: Response){
    const { name, price, description, category_id } = req.body;

    if(!req.file) throw new Error("FILE_NOT_FOUND");
    
    const response = await this.productServices.store({
      name,
      price,
      description,
      banner: '',
      category_id
    })

    return res.json(response);
  }
}

export default Product;