import prismaClient from "../prisma";

interface OrderRequest{
  table: number;
  name: string;
}

interface FindOrderRequest{
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

  async removeOrder({ order_id }: FindOrderRequest){
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

  async sendOrder({ order_id }: FindOrderRequest){
    const response = await prismaClient.order.update({
      where:{
        id: order_id
      },
      data:{
        draft: false
      }
    });

    return response;
  }

  async listAll(){
    const response = await prismaClient.order.findMany({
      where: {
        draft: false,
        status: false
      },
      orderBy: {
        created_at: 'desc'
      }
    });

    return response;
  }

  async detailOrder({ order_id }: FindOrderRequest){
    const response =  await prismaClient.item.findMany({
      where:{
        order_id: order_id
      },
      include:{
        product: true,
        order: true
      }
    });

    return response;
  }

  async finishOrder({ order_id }: FindOrderRequest){
    const response = await prismaClient.order.update({
      where:{
        id: order_id
      },
      data:{
        status: true
      }
    });

    return response;
  }
}

export default Order;