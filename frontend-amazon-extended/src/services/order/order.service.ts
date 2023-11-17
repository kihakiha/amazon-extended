import { instance } from "@/api/api.interceptor";
import { IOrder } from "@/types/order.interface";

const ORDERS = "orders";

enum EnumOrderStatus {
  PENDING = "PENDING",
  PAYED = "PAYED",
  SHIPPED = "SHIPPED",
  DELIVERED = "DELIVERED",
}

type TData = {
  status?: EnumOrderStatus;
  items: {
    quantity: number;
    price: number;
    productId: number;
  }[];
};

export const OrderService = {
  async getAll() {
    return await instance<IOrder[]>({
      url: `/${ORDERS}`,
      method: "GET",
    });
  },

  async placeOrder(data: TData) {
    return instance<{ confirmation: { confirmation_url: string } }>({
      url: `/${ORDERS}`,
      method: "POST",
      data,
    });
  },
};
