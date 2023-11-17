import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { Auth } from "src/auth/decorators/auth.decorator";
import { CurrentUser } from "src/auth/decorators/user.decorator";
import { OrderDto } from "./dto/order.dto";
import { OrderService } from "./order.service";
import { PaymentStatusDto } from "./dto/payment-status.dto";

@Controller("orders")
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UsePipes(new ValidationPipe())
  @Auth()
  @Get()
  async getAll(@CurrentUser("id") userId: number) {
    return this.orderService.getAll(userId);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Post()
  async placeOrder(@Body() dto: OrderDto, @CurrentUser("id") userId: number) {
    return this.orderService.placeOrder(dto, userId);
  }

  @HttpCode(200)
  @Post("status")
  async updateStatus(@Body() dto: PaymentStatusDto) {
    return this.orderService.updateStatus(dto);
  }
}
