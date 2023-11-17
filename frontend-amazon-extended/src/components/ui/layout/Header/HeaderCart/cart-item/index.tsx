import { ICartItem } from "@/types/cart.interface";
import Image from "next/image";
import React from "react";
import { CartActions } from "./cart-actions/CartActions";
export const CartItem: React.FC<{ item: ICartItem }> = ({ item }) => {
  return (
    <div className="flex items-start mb-6">
      <Image
        src={item.product.images[0]}
        width={100}
        height={100}
        className="h-auto"
        alt={item.product.name}
      />
      <div className="flex flex-col w-full ml-3 items-between h-full ">
        <div className="mb-6">
          <div className="font-semibold mb-1">{item.product.name}</div>
          <div>{item.product.price}₽</div>
        </div>

        <CartActions item={item} />
      </div>
    </div>
  );
};
