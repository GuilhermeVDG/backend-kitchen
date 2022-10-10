import { Request, Response } from "express";
import UserServices from '../services/users'

class User {
  userServices: UserServices
  constructor(){
    this.userServices = new UserServices();
    
    this.create = this.create.bind(this);
  }
  
  async create(req: Request, res: Response){
    const { name, email, password } = req.body;

    const response = await this.userServices.create({
      name,
      email,
      password
    });
    return res.json(response);
  }
}

export default User;