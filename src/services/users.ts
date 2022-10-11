import prismaClient from '../prisma'; 

interface StoreRequest {
  name: string,
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

    const user = await prismaClient.user.create({
      data: {
        name: name,
        email: email,
        password: password
      },
      select: {
        id: true,
        name: true,
        email: true
      }
    })
    
    return user;
  }
}

export default User;