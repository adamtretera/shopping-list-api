import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateShoppingListItemDto {
  @IsNumber()
  @IsNotEmpty()
  shoppingListId: number;

  @IsString()
  @IsNotEmpty()
  title: string;
}
