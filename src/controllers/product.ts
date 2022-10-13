import { Request, Response } from "express";
import ProductServices from '../services/product';

class Product{
  productServices: ProductServices;
  
  constructor(){
    this.productServices = new ProductServices();

    this.store = this.store.bind(this);
    this.listByCategory = this.listByCategory.bind(this);
  }

  async store(req: Request, res: Response){
    const { name, price, description, category_id } = req.body;

    if(!req.file) throw new Error("FILE_NOT_FOUND");

    const { originalname, filename: banner } = req.file;
    
    const response = await this.productServices.store({
      name,
      price,
      description,
      banner,
      category_id
    })

    return res.json(response);
  }

  async listByCategory(req: Request, res: Response){
    const category_id = req.query.category_id as string;

    const response = await this.productServices.listByCategory({ category_id });

    return res.json(response);

  }
}

export default Product;