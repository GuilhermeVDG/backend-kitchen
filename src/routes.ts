import { Router } from 'express';
import multer from 'multer';
import UserRoutes from './routes/users'
import CategoryRoutes from './routes/category';
import ProductRoutes from './routes/product';
import OrderRoutes from './routes/order';
import uploadConfig from './config/multer';

class Routes {
  routes: Router;
  userRoutes: UserRoutes;
  categoryRoutes: CategoryRoutes;
  productRoutes: ProductRoutes;
  orderRoutes: OrderRoutes;
  upload: multer.Multer;

  constructor(){
    this.routes = Router();
    this.upload = multer(uploadConfig.upload('./tmp'));

    this.userRoutes = new UserRoutes();
    this.categoryRoutes = new CategoryRoutes();
    this.productRoutes = new ProductRoutes();
    this.orderRoutes = new OrderRoutes();
  }

  setup(){
    this.routes.use('/', this.userRoutes.setup());
    this.routes.use('/category', this.categoryRoutes.setup());
    this.routes.use('/product', this.upload.single('file'), this.productRoutes.setup());
    this.routes.use('/order', this.orderRoutes.setup());
    return this.routes
  }
}

export default Routes;