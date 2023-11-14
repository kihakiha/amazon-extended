import { faker } from "@faker-js/faker";
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "@prisma/client";
import { hash, verify } from "argon2";
import { PrismaService } from "src/prisma.service";
import { AuthDto } from "./dto/auth.dto";

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async accessToken(refreshToken: string) {
    const result = await this.jwt.verifyAsync(refreshToken);
    if (!result) throw new UnauthorizedException("Неправльный токен");

    const user = await this.prisma.user.findUnique({
      where: {
        id: result.id,
      },
    });

    const tokens = await this.issueToken(user.id);

    return {
      user: this.getUserFields(user),
      ...tokens,
    };
  }

  async login(dto: AuthDto) {
    const user = await this.validateUser(dto);

    const tokens = await this.issueToken(user.id);

    return {
      user: this.getUserFields(user),
      ...tokens,
    };
  }

  async register(dto: AuthDto) {
    const existUserWithEmail = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (existUserWithEmail)
      throw new BadRequestException(
        "Пользователь с таким Email уже существует!",
      );

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        name: faker.person.firstName(),
        avatarPath: faker.image.avatar(),
        phone: faker.phone.number(),
        password: await hash(dto.password),
      },
    });

    const tokens = await this.issueToken(user.id);

    return {
      user: this.getUserFields(user),
      ...tokens,
    };
  }

  private async issueToken(userId: number) {
    const data = {
      id: userId,
    };

    const accessToken = this.jwt.sign(data, {
      expiresIn: "1h",
    });

    const refreshToken = this.jwt.sign(data, {
      expiresIn: "7d",
    });

    return { accessToken, refreshToken };
  }

  private getUserFields(user: User) {
    return {
      id: user.id,
      email: user.email,
    };
  }

  private async validateUser(dto: AuthDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user)
      throw new NotFoundException("Пользователя с таким email не существует");

    const isValidPassword = await verify(user.password, dto.password);

    if (!isValidPassword) throw new UnauthorizedException("Неверный пароль");

    return user;
  }
}
