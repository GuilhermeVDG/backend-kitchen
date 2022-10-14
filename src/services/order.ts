import prismaClient from "../prisma";

interface OrderRequest{
  table: number,
  name: string
}

interface RemoveOrderRequest{
  order_id: string
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

  async removeOrder({ order_id }: RemoveOrderRequest){
    const response = await prismaClient.order.delete({
      where:{
        id: order_id
      }
    });

    return response;
  }
}

export default Order;