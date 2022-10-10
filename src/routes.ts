import { Router } from 'express';
import UserController from './controllers/users'
import UserRoutes from './routes/users'

class Routes {
  routes: Router;
  userCotroller: UserController;
  userRoutes: UserRoutes

  constructor(){
    this.routes = Router();
    this.userCotroller = new UserController();
    this,this.userRoutes = new UserRoutes();
  }

  setup(){
    this.routes.use('/', this.userRoutes.setup());

    return this.routes
  }
}

export default Routes;