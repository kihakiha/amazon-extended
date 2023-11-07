import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class StatisticsService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
  ) {}

  async getMain(userId: number ) {
    const user = await this.userService.byId(userId, {
      order: {
        select: {
          items: true,
        }
      },
      review: true,
    });

    // const totalMoneySpent = await this.prisma.order.aggregate({
    //   where: {
    //     userId
    //   },
    // }) 

    return [
      {
        name: 'Заказы',
        value: user.order.length,
      },
      {
        name: 'Отзывы',
        value: user.review.length,
      },
      {
        name: 'Избранные товары',
        value: user.favorite.length,
      },
      {
        name: 'Всего потрачего',
        value: 1000, //totalMoneySpent
      },
    ]
  }
}
