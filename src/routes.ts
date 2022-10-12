import { Router } from 'express';
import UserRoutes from './routes/users'
import CategoryRoutes from './routes/category';
import ProductRoutes from './routes/product';

class Routes {
  routes: Router;
  userRoutes: UserRoutes;
  categoryRoutes: CategoryRoutes;
  productRoutes: ProductRoutes;

  constructor(){
    this.routes = Router();

    this.userRoutes = new UserRoutes();
    this.categoryRoutes = new CategoryRoutes();
    this.productRoutes = new ProductRoutes();
  }

  setup(){
    this.routes.use('/', this.userRoutes.setup());
    this.routes.use('/category', this.categoryRoutes.setup());
    this.routes.use('/product', this.productRoutes.setup());
    return this.routes
  }
}

export default Routes;