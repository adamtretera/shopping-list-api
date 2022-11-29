import { Test, TestingModule } from '@nestjs/testing';
import { ShoppingListItemController } from './shopping-list-item.controller';
import { ShoppingListItemService } from './shopping-list-item.service';

describe('ShoppingListItemController', () => {
  let controller: ShoppingListItemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShoppingListItemController],
      providers: [ShoppingListItemService],
    }).compile();

    controller = module.get<ShoppingListItemController>(
      ShoppingListItemController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
