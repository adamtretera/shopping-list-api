import { ForbiddenException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';
import { CreateShoppingListDto } from './dto';
import { AddMemberToShoppingListDto } from './dto/add-member-to-shopping-list-dto';

@Injectable()
export class ShoppingListService {
  constructor(private prisma: PrismaService) {}
  create(createShoppingListDto: CreateShoppingListDto, userId: number) {
    const user = this.prisma.user.update({
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
      include: {
        shoppingListsOwner: true, // Include all posts in the returned object
      },
    });

    return user.shoppingListsOwner();
  }

  async findAll(userId: number) {
    try {
      const shoppingLists = await this.prisma.shoppingList.findMany({
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
        },
      });
      return shoppingLists;
    } catch (e) {
      throw e;
    }
  }

  async findOne(shoppingListId: number, userId: number) {
    try {
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

          id: shoppingListId,
        },
      });

      if (!shoppingList) {
        throw new ForbiddenException(
          `No shopping list found with id ${userId}`,
        );
      }
      return shoppingList;
    } catch (e) {
      throw e;
    }
  }

  async update(
    id: number,
    updateShoppingListDto: Prisma.ShoppingListUpdateInput,
    userId: number,
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

        id: id,
      },
    });

    if (!shoppingList) {
      throw new ForbiddenException(`No rights to shoppingList with id ${id}`);
    }
    return this.prisma.shoppingList.update({
      where: {
        id: shoppingList.id,
      },
      data: updateShoppingListDto,
    });
  }

  async remove(id: number, userId: number) {
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

        id: id,
      },
    });

    if (!shoppingList) {
      throw new ForbiddenException(`No rights to shoppingList with id ${id}`);
    }
    return this.prisma.shoppingList.delete({
      where: {
        id: shoppingList.id,
      },
    });
  }

  async addMember(
    shoppingListId: number,
    userId: number,
    addMemberToShoppingListDto: AddMemberToShoppingListDto,
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

        id: shoppingListId,
      },
    });

    if (!shoppingList) {
      throw new ForbiddenException(
        `No rights to shoppingList with id ${shoppingListId}`,
      );
    }

    return this.prisma.shoppingList.update({
      where: {
        id: shoppingList.id,
      },
      data: {
        members: {
          create: {
            assignedBy: 'test',
            member: {
              connect: {
                id: addMemberToShoppingListDto.memberId,
              },
            },
          },
        },
      },
    });
  }
}
