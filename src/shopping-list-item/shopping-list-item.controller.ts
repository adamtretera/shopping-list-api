import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ShoppingListItemService } from './shopping-list-item.service';
import { CreateShoppingListItemDto } from './dto/create-shopping-list-item.dto';
import { UpdateShoppingListItemDto } from './dto/update-shopping-list-item.dto';
import { JwtGuard } from '../auth/gaurd';
import { GetUser } from '../auth/decorator';

@UseGuards(JwtGuard)
@Controller('shopping-list-item')
export class ShoppingListItemController {
  constructor(
    private readonly shoppingListItemService: ShoppingListItemService,
  ) {}

  @Post()
  create(
    @Body() createShoppingListItemDto: CreateShoppingListItemDto,
    @GetUser('id') userId: number,
  ) {
    return this.shoppingListItemService.create(
      userId,
      createShoppingListItemDto,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string, @GetUser('id') userId: number) {
    return this.shoppingListItemService.findOne(userId, +id);
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
