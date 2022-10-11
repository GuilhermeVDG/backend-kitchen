import { Request, Response } from 'express';
import CategoryServices from '../services/category';

class Category {
  categoryServices: CategoryServices;
  constructor(){
    this.categoryServices = new CategoryServices();
    
    this.store = this.store.bind(this);
  }
  
  async store(req: Request, res: Response){
    const response = await this.categoryServices.store(req.body);
    return res.json(response);
  }
}

export default Category;