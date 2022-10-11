import prismaClient from "../prisma";

interface CategoryRequest {
  name: string;
}

class Category {
  async store({ name }: CategoryRequest){
    if(!name) throw new Error("INVALID_NAME");

    const nameAlreadyExists = await prismaClient.category.findFirst({
      where: {
        name: name
      }
    });

    if(nameAlreadyExists) throw new Error ("CATEGORY_ALREADY_EXISTS");

    const response = await prismaClient.category.create({
      data:{
        name: name
      },
      select: {
        name: true,
        id: true
      }

    });

    return response
  }
}

export default Category;