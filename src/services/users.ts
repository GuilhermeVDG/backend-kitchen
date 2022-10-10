
interface CreateRequest {
  name: String,
  email: String,
  password: String
}

class User {


  async create({ name, email, password }: CreateRequest){
    return { name: name };
  }
}

export default User;