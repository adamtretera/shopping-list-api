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
import { AddMemberToShoppingListDto, CreateShoppingListDto } from './dto';
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
    return this.shoppingListService.findOne(shoppingListId, userId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateShoppingListDto: Prisma.ShoppingListUpdateInput,
    @GetUser('id') userId: number,
  ) {
    return this.shoppingListService.update(+id, updateShoppingListDto, userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @GetUser('id') userId: number) {
    return this.shoppingListService.remove(+id, userId);
  }

  @Patch(':id/add-member')
  addMember(
    @Param('id', ParseIntPipe) shoppingListId: number,
    @GetUser('id') userId: number,
    @Body() addMemberToShoppingListDto: AddMemberToShoppingListDto,
  ) {
    return this.shoppingListService.addMember(
      +shoppingListId,
      userId,
      addMemberToShoppingListDto,
    );
  }
}
