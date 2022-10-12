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
    const response = await prismaClient.product.create({
      data: {
        name: name,
        price: price,
        description: description,
        banner: banner,
        category_id: category_id
      }
    })
    
    return response;
  }
}

export default Product;