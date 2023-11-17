import { useTypedSelectors } from "@/store/hooks/useTypedSelectors";

export const useCart = () => {
  const items = useTypedSelectors((state) => state.cart.items);

  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  return { items, total };
};
