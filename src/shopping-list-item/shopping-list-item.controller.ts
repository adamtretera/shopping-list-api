import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ShoppingListItemService } from './shopping-list-item.service';
import { CreateShoppingListItemDto } from './dto/create-shopping-list-item.dto';
import { UpdateShoppingListItemDto } from './dto/update-shopping-list-item.dto';

@Controller('shopping-list-item')
export class ShoppingListItemController {
  constructor(
    private readonly shoppingListItemService: ShoppingListItemService,
  ) {}

  @Post()
  create(@Body() createShoppingListItemDto: CreateShoppingListItemDto) {
    return this.shoppingListItemService.create(createShoppingListItemDto);
  }

  @Get()
  findAll() {
    return this.shoppingListItemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shoppingListItemService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateShoppingListItemDto: UpdateShoppingListItemDto,
  ) {
    return this.shoppingListItemService.update(+id, updateShoppingListItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shoppingListItemService.remove(+id);
  }
}
