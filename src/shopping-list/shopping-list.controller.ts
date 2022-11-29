import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { ShoppingListService } from './shopping-list.service';
import { CreateShoppingListDto } from './dto';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/gaurd';

@UseGuards(JwtGuard)
@Controller('shopping-list')
export class ShoppingListController {
  constructor(private readonly shoppingListService: ShoppingListService) {}

  @Post()
  create(
    @Body() createShoppingListDto: CreateShoppingListDto,
    @GetUser('id') userId: number,
  ) {
    return this.shoppingListService.create(createShoppingListDto, userId);
  }

  @Get()
  findAll(@GetUser('id') userId: number) {
    return this.shoppingListService.findAll(userId);
  }

  @Get(':id')
  findOne(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) shoppingListId: number,
  ) {
    return this.shoppingListService.findOne(userId, shoppingListId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateShoppingListDto: Prisma.ShoppingListUpdateInput,
  ) {
    return this.shoppingListService.update(+id, updateShoppingListDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shoppingListService.remove(+id);
  }
}
