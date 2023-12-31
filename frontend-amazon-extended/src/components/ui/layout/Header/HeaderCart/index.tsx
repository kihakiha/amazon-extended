import { useCart } from "@/components/hooks/useCart";
import { useClickOutside } from "@/components/hooks/useClickOutside";
import { SquareButton } from "@/ui/squareButton";
import { useRouter } from "next/router";
import { PiShoppingCartSimpleFill } from "react-icons/pi";

import { OrderService } from "@/services/order/order.service";
import { useActions } from "@/store/hooks/useActions";
import { Button } from "@/ui/button";
import { useMutation } from "@tanstack/react-query";
import cn from "clsx";
import { CartItem } from "./cart-item";

const HeaderCart: React.FC = () => {
  const { ref, isShow, setIsShow } = useClickOutside(false);

  const { items, total } = useCart();

  const { reset } = useActions();

  const { push } = useRouter();

  const { mutate } = useMutation({
    mutationFn: () =>
      OrderService.placeOrder({
        items: items.map((item) => ({
          price: item.price,
          quantity: item.quantity,
          productId: item.product.id,
        })),
      }),
    mutationKey: ["create order and payment"],

    onSuccess: ({ data }) => {
      push(data.confirmation.confirmation_url).then(() => reset());
    },
  });

  return (
    <div className="relative" ref={ref}>
      <SquareButton
        Icon={PiShoppingCartSimpleFill}
        onClick={() => setIsShow(!isShow)}
        number={items.length}
      />

      <div
        className={cn(
          isShow ? "open-menu" : "close-menu",
          "menu absolute top-[6.2rem] w-96 -left-[14.5rem] bg-secondary rounded-xl px-5 py-3 text-sm z-20 text-white",
        )}
      >
        <div className="font-normal text-lg mb-5">Корзина</div>
        <div className="">
          {items.length ? (
            items.map((item) => <CartItem item={item} key={item.id} />)
          ) : (
            <div className="font-light">Корзина пустая!</div>
          )}
        </div>
        <div>
          <div className="font-semibold text-lg">Итого:</div>
          <div className="font-bold text-xl">{total}₽</div>
        </div>
        <div className="text-center">
          <Button
            onClick={() => mutate()}
            variant="primary"
            size="sm"
            className={"btn-link mt-5 mb-2"}
          >
            Перейти к заказу
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeaderCart;
