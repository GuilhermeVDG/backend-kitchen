import prismaClient from '../prisma'; 
import { hash, compare } from 'bcryptjs';

interface StoreRequest {
  name: string,
  email: string,
  password: string
}

interface LoginRequest {
  email: string,
  password: string
}

class User {


  async store({ name, email, password }: StoreRequest){
    if(!email){
      throw new Error("INVALID_EMAIL");
    }

    const userAlreadyExists = await prismaClient.user.findFirst({
      where: {
        email: email
      }
    });

    if(userAlreadyExists) 
      throw new Error("USER_ALREADY_EXISTS");

    const passwordHash = await hash(password, 8);

    const user = await prismaClient.user.create({
      data: {
        name: name,
        email: email,
        password: passwordHash
      },
      select: {
        id: true,
        name: true,
        email: true
      }
    })
    
    return user;
  }

  async login({ email, password }: LoginRequest){
    const user = await prismaClient.user.findFirst({
      where: {
        email: email
      }
    });

    if(!user) throw new Error("USER_NOT_EXISTS");

    const samePassword = await compare(password, user.password);

    if(!samePassword) throw new Error("WRONG_PASSWORD");

    return { ok: true };
  }
}

export default User;