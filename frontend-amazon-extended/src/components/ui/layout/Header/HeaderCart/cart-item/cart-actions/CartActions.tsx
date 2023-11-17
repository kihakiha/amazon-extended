import { useCart } from "@/components/hooks/useCart";
import { useActions } from "@/store/hooks/useActions";
import { ICartItem } from "@/types/cart.interface";
import React from "react";
import { FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";

export const CartActions: React.FC<{ item: ICartItem }> = ({ item }) => {
  const { removeFromCart, changeQuantity } = useActions();

  const { items } = useCart();

  const quantity = items.find((cartItem) => cartItem.id === item.id)?.quantity;

  return (
    <div className="mt-3">
      <div className="flex items-center gap-3">
        <button
          disabled={quantity === 1}
          onClick={() => changeQuantity({ id: item.id, type: "minus" })}
        >
          <FiMinus fontSize={13} />
        </button>

        <input
          disabled
          readOnly
          value={quantity}
          className="w-10 bg-black text-center"
        />

        <button onClick={() => changeQuantity({ id: item.id, type: "plus" })}>
          <FiPlus fontSize={13} />
        </button>

        <button
          onClick={() => removeFromCart({ id: item.id })}
          className="ml-3 text-primary/80"
        >
          <FiTrash2 />
        </button>
      </div>
    </div>
  );
};
