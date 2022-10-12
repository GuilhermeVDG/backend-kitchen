import prismaClient from "../prisma";

interface ProductRequest{
  name: string,
  price: string,
  description: string,
  banner: string,
  category_id: string
}

class Product{
  async store({ name, price, description, banner, category_id }: ProductRequest){
    return { ok: true };
  }
}

export default Product;