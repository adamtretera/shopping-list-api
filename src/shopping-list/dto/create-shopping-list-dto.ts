import { IsNotEmpty, IsString } from 'class-validator';

export class CreateShoppingListDto {
  @IsString()
  @IsNotEmpty()
  title: string;
}
