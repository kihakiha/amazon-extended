import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { hash } from "argon2";
import { PrismaService } from "src/prisma.service";
import { UserDto } from "./dto/user.dto";
import { returnUserObject } from "./return-user.object";

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async byId(id: number, selectObject: Prisma.UserSelect = {}) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        ...returnUserObject,
        favorite: {
          select: {
            id: true,
            name: true,
            price: true,
            images: true,
            slug: true,
            category: {
              select: {
                slug: true,
              },
            },
            review: true,
          },
        },
        ...selectObject,
      },
    });

    if (!user) throw new NotFoundException("Пользователь не найден");

    return user;
  }

  async updateProfile(id: number, dto: UserDto) {
    const isSameUser = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (isSameUser && id !== isSameUser.id)
      throw new BadRequestException(
        "Пользователь с таким email уже существует",
      );

    const user = await this.byId(id);

    return this.prisma.user.update({
      where: {
        id,
      },
      data: {
        email: dto.email,
        name: dto.name,
        avatarPath: dto.avatarPath,
        phone: dto.phone,
        password: dto.password ? await hash(dto.password) : user.password,
      },
    });
  }

  async toggleFavorite(productId: number, id: number) {
    const user = await this.byId(id);

    if (!user) throw new NotFoundException("Пользователь не найден");

    const isExist = await user.favorite.some(
      (product) => product.id === productId,
    );

    await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        favorite: {
          [isExist ? "disconnect" : "connect"]: {
            id: productId,
          },
        },
      },
    });

    return { message: "Success" };
  }
}
