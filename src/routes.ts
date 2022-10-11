import { Router } from 'express';
import UserController from './controllers/users'
import UserRoutes from './routes/users'
import CategoryRoutes from './routes/category';

class Routes {
  routes: Router;
  userCotroller: UserController;
  userRoutes: UserRoutes;
  categoryRoutes: CategoryRoutes

  constructor(){
    this.routes = Router();
    this.userCotroller = new UserController();
    this.userRoutes = new UserRoutes();
    this.categoryRoutes = new CategoryRoutes();
  }

  setup(){
    this.routes.use('/', this.userRoutes.setup());
    this.routes.use('/category', this.categoryRoutes.setup());

    return this.routes
  }
}

export default Routes;