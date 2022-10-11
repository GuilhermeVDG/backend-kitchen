import { Router } from "express";
import UserController from '../controllers/users';
import AuthMiddleware from '../middlewares/auth';

class User {
  routes: Router;
  userController: UserController;
  
  constructor(){
    this.routes = Router();
    this.userController = new UserController();
  }

  setup(){
    this.routes.post('/cadastro', this.userController.create);
    this.routes.post('/login', this.userController.login);
    this.routes.get('/me', AuthMiddleware ,this.userController.detail);

    return this.routes;
  }
}

export default User;