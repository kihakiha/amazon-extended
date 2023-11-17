import { useCart } from "@/components/hooks/useCart";
import { useActions } from "@/store/hooks/useActions";
import { IProduct } from "@/types/product.interface";
import React from "react";
import {
  PiShoppingCartSimpleFill,
  PiShoppingCartSimpleLight,
} from "react-icons/pi";

type TAddToCartButtonProps = {
  product: IProduct;
};

export const AddToCartButton: React.FC<TAddToCartButtonProps> = ({
  product,
}) => {
  const { addToCart, removeFromCart } = useActions();
  const { items } = useCart();

  const currentElement = items.find((item) => item.id === product.id);

  return (
    <div>
      <button
        className={"text-secondary"}
        onClick={() =>
          currentElement
            ? removeFromCart({ id: currentElement.id })
            : addToCart({ product, quantity: 1, price: product.price })
        }
      >
        {currentElement ? (
          <PiShoppingCartSimpleFill size={"1.4em"} />
        ) : (
          <PiShoppingCartSimpleLight size={"1.4em"} />
        )}
      </button>
    </div>
  );
};
