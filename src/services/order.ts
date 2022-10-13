import prismaClient from "../prisma";

interface OrderRequest{
  table: number,
  name: string
}

class Order{
  async store({ table, name }: OrderRequest){
    const response = await prismaClient.order.create({
      data:{
        table: table,
        name: name
      }
    });

    return response;
  }
}

export default Order;