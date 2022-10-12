import { Router } from 'express';
import multer from 'multer';
import UserRoutes from './routes/users'
import CategoryRoutes from './routes/category';
import ProductRoutes from './routes/product';
import uploadConfig from './config/multer';

class Routes {
  routes: Router;
  userRoutes: UserRoutes;
  categoryRoutes: CategoryRoutes;
  productRoutes: ProductRoutes;
  upload: multer.Multer;

  constructor(){
    this.routes = Router();
    this.upload = multer(uploadConfig.upload('./tmp'));

    this.userRoutes = new UserRoutes();
    this.categoryRoutes = new CategoryRoutes();
    this.productRoutes = new ProductRoutes();
  }

  setup(){
    this.routes.use('/', this.userRoutes.setup());
    this.routes.use('/category', this.categoryRoutes.setup());
    this.routes.use('/product', this.upload.single('file'), this.productRoutes.setup());
    return this.routes
  }
}

export default Routes;