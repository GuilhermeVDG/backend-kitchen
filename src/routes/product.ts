import { Router } from "express";
import ProductController from '../controllers/product';
import AuthMiddleware from '../middlewares/auth';

class Product{
  routes: Router;
  productController: ProductController;

  constructor(){
    this.routes = Router();
    this.productController = new ProductController();
  }

  setup(){
    this.routes.use(AuthMiddleware);

    this.routes.post('/', this.productController.store);

    return this.routes;
  }
}

export default Product;