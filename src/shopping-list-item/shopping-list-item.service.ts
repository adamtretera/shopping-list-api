import { Injectable } from '@nestjs/common';
import { CreateShoppingListItemDto } from './dto/create-shopping-list-item.dto';
import { UpdateShoppingListItemDto } from './dto/update-shopping-list-item.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ShoppingListItemService {
  constructor(private prisma: PrismaService) {}

  async create(
    userId: number,
    createShoppingListItemDto: CreateShoppingListItemDto,
  ) {
    const shoppingList = await this.prisma.shoppingList.findFirst({
      where: {
        OR: [
          {
            ownerId: userId,
          },
          {
            members: {
              some: {
                memberId: userId,
              },
            },
          },
        ],

        id: createShoppingListItemDto.shoppingListId,
      },
    });

    return this.prisma.shoppingList.update({
      where: {
        id: shoppingList.id,
      },
      data: { title: createShoppingListItemDto.title },
    });
  }

  async findOne(userId: number, id: number) {
    return await this.prisma.shoppingListItem.findFirst({
      where: {
        id: id,
      },
    });
  }

  async update(
    id: number,
    updateShoppingListItemDto: UpdateShoppingListItemDto,
  ) {
    return this.prisma.shoppingListItem.update({
      where: {
        id: id,
      },
      data: updateShoppingListItemDto,
    });
  }

  remove(id: number) {
    return this.prisma.shoppingListItem.delete({
      where: {
        id: id,
      },
    });
  }
}
