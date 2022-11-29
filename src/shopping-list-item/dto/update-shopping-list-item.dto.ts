import { PartialType } from '@nestjs/mapped-types';
import { CreateShoppingListItemDto } from './create-shopping-list-item.dto';

export class UpdateShoppingListItemDto extends PartialType(
  CreateShoppingListItemDto,
) {}
