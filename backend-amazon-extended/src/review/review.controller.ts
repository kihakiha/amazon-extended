import { Body, Controller, Get, HttpCode, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { ReviewDto } from './dto/review.dto';
import { ReviewService } from './review.service';

@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @UsePipes(new ValidationPipe())
  @Get()
  async getAll() {
    return this.reviewService.getAll();
  }

  @UsePipes(new ValidationPipe())
  @Get(':productId')
  async getAvg(@Param('productId') productId: string) {
    return this.reviewService.getAvgValueByProductId(+productId);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Post("leave/:productId")
  async leave(@Param('productId') productId: string, @CurrentUser('id') userId: number, @Body() dto: ReviewDto) {
    return this.reviewService.createReview(userId, +productId, dto);
  }


  
}
