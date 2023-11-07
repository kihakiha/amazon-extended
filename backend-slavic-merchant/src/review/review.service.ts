import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ReviewDto } from './dto/review.dto';
import { returnReviewObject } from './return-review.object';

@Injectable()
export class ReviewService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return this.prisma.review.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      select: returnReviewObject
    })
  }
  

  async createReview(userId: number,productId: number, dto: ReviewDto) {

    const product = await this.prisma.product.findUnique({
      where: {
        id: productId,
      }
    })

    if (!product) throw new NotFoundException("Товара не существует");

    return this.prisma.review.create({
      data: {
        ...dto,
        product: {
          connect: {
            id: productId,
          }
        },
        user: {
          connect: {
            id: userId,
          }
        }
      }
    });
  }

  async getAvgValueByProductId(productId: number) {
    const avg =  this.prisma.review.aggregate({
      where: {
        productId
      },
      _avg: {
        rating: true
      }
    }).then(data => data._avg);
    
    return avg;
  }
}
