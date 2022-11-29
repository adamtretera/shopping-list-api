import { Test, TestingModule } from '@nestjs/testing';
import { ShoppingListItemService } from './shopping-list-item.service';

describe('ShoppingListItemService', () => {
  let service: ShoppingListItemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShoppingListItemService],
    }).compile();

    service = module.get<ShoppingListItemService>(ShoppingListItemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
