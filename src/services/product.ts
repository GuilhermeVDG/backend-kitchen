import prismaClient from "../prisma";

interface ProductRequest{
  name: string;
  price: string;
  description: string;
  banner: string;
  category_id: string;
}

interface ListRquest{
  category_id: string;
}

interface FindRequest{
  product_id: string;
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
    });
    
    return response;
  }

  async listByCategory({ category_id }: ListRquest){
    const response = await prismaClient.product.findMany({
      where:{
        category_id: category_id
      }
    });

    return response;  
  }

  async find({ product_id }: FindRequest){
    const response = await prismaClient.product.findFirst({
      where:{
        id: product_id
      }
    });

    return response;
  }
}


export default Product;