import { Request, Response } from "express";
import UserServices from '../services/users'

class User {
  userServices: UserServices
  constructor(){
    this.userServices = new UserServices();
    
    this.create = this.create.bind(this);
    this.login = this.login.bind(this);
    this.detail = this.detail.bind(this);
  }
  
  async create(req: Request, res: Response){
    const { name, email, password } = req.body;

    const response = await this.userServices.store({
      name,
      email,
      password
    });
    return res.json(response);
  }

  async login(req: Request, res: Response){
    const { email, password } = req.body;

    const response = await this.userServices.login({
      email,
      password
    });
    return res.json(response);
  }

  async detail(req: Request, res: Response){
    const response = await this.userServices.detail(req.userId);
    return res.json(response);
  }
}

export default User;