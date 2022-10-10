import { Router } from "express";
import UserController from '../controllers/users'

class User {
  routes: Router;
  userController: UserController;
  
  constructor(){
    this.routes = Router();
    this.userController = new UserController();
  }

  setup(){
    this.routes.post('/cadastro', this.userController.create);

    return this.routes;
  }
}

export default User;