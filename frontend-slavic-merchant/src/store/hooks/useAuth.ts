import { useTypedSelectors } from "./useTypedSelectors";

export const useAuth = () => useTypedSelectors((state) => state.user);
