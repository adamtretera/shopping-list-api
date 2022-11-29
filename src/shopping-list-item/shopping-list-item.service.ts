import { Injectable } from '@nestjs/common';
import { CreateShoppingListItemDto } from './dto/create-shopping-list-item.dto';
import { UpdateShoppingListItemDto } from './dto/update-shopping-list-item.dto';

@Injectable()
export class ShoppingListItemService {
  create(createShoppingListItemDto: CreateShoppingListItemDto) {
    return 'This action adds a new shoppingListItem';
  }

  findAll() {
    return `This action returns all shoppingListItem`;
  }

  findOne(id: number) {
    return `This action returns a #${id} shoppingListItem`;
  }

  update(id: number, updateShoppingListItemDto: UpdateShoppingListItemDto) {
    return `This action updates a #${id} shoppingListItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} shoppingListItem`;
  }
}
