import prismaClient from "../prisma";

interface OrderRequest{
  table: number;
  name: string;
}

interface RemoveOrderRequest{
  order_id: string;
}

interface ItemRequest{
  order_id: string;
  product_id: string;
  amount: number;

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

  async addItem({ order_id, product_id, amount }: ItemRequest){
    const response = await prismaClient.item.create({
      data:{
        order_id: order_id,
        product_id: product_id,
        amount: amount
      }
    });
    
    return response;
  }
}

export default Order;