import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';
import { CreateShoppingListDto } from './dto';

@Injectable()
export class ShoppingListService {
  constructor(private prisma: PrismaService) {}
  create(createShoppingListDto: CreateShoppingListDto, userId: number) {
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        shoppingListsOwner: {
          create: [
            {
              title: createShoppingListDto.title,
            },
          ],
        },
      },
    });
  }

  async findAll(userId: number) {
    try {
      return await this.prisma.shoppingList.findMany();
    } catch (e) {
      throw e;
    }
  }

  async findOne(shoppingListId: number, userId: number) {
    try {
      return await this.prisma.user.findUnique({
        where: {
          id: userId,
        },
        include: {
          shoppingListsMember: true,
          shoppingListsOwner: true,
        },
      });
    } catch (e) {
      return e;
    }
  }

  async update(
    id: number,
    updateShoppingListDto: Prisma.ShoppingListUpdateInput,
  ) {
    return await this.prisma.shoppingList.update({
      where: {
        id: id,
      },
      data: updateShoppingListDto,
    });
  }

  async remove(id: number) {
    return await this.prisma.shoppingList.delete({ where: { id: id } });
  }
}
