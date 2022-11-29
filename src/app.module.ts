import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserController } from './user/user.controller';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { ShoppingListItemModule } from './shopping-list-item/shopping-list-item.module';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ShoppingListModule,
    ShoppingListItemModule,
  ],
  controllers: [UserController],
})
export class AppModule {}
