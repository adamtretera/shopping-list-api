import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/gaurd';
import { GetUser } from '../auth/decorator';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  @Get('me')
  getMe(@GetUser('id') userId: number) {
    return userId;
  }
}
