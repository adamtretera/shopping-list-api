import { Module } from '@nestjs/common';
import { ShoppingListItemService } from './shopping-list-item.service';
import { ShoppingListItemController } from './shopping-list-item.controller';

@Module({
  controllers: [ShoppingListItemController],
  providers: [ShoppingListItemService],
})
export class ShoppingListItemModule {}
