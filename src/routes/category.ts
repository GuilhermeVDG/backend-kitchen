import { Router } from "express";
import CategoryController from '../controllers/category';
import AuthMiddleware from '../middlewares/auth';

class Category {
  routes: Router;
  categoryController: CategoryController

  constructor(){
    this.routes = Router();
    this.categoryController = new CategoryController;
  }

  setup(){
    this.routes.use(AuthMiddleware);

    this.routes.post('/create', this.categoryController.store);
    this.routes.get('/list', this.categoryController.list);

    return this.routes;
  }
}

export default Category;