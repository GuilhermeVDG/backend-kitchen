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

interface RemoveItemRequest{
  item_id: string;
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

  async removeItem({ item_id }: RemoveItemRequest){
    const response = await prismaClient.item.delete({
      where:{
        id: item_id
      }
    });

    return response;
  }
}

export default Order;