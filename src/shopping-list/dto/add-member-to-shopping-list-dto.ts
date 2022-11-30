import { IsNotEmpty, IsNumber } from 'class-validator';

export class AddMemberToShoppingListDto {
  @IsNumber()
  @IsNotEmpty()
  memberId: number;
}
