import { useTypedSelectors } from "@/store/hooks/useTypedSelectors";

export const useCart = () => useTypedSelectors((state) => state.cart);
