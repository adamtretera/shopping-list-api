import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

import * as argon2 from 'argon2';

import { PrismaService } from '../prisma/prisma.service';
import { SignUpDto, SignInDto } from './dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signup(dto: SignUpDto) {
    const hash = await argon2.hash(dto.password);

    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          passwordHash: hash,
        },
      });
      return this.signToken(user.id, user.email);
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          throw new ForbiddenException('Email is taken');
        }
      }
      throw e;
    }
  }
  async signin(dto: SignInDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user) {
      throw new ForbiddenException('User does not exist');
    }
    const passwordMatch = await argon2.verify(user.passwordHash, dto.password);

    if (!passwordMatch) {
      throw new ForbiddenException('Invalid credentials');
    }
    return this.signToken(user.id, user.email);
  }

  signToken(userId: number, email: string) {
    const payload = {
      sub: userId,
      email,
    };

    const token = this.jwt.sign(payload, {
      expiresIn: '30m',
      secret: this.config.get('JWT_SECRET'),
    });
    return {
      accessToken: token,
    };
  }
}
