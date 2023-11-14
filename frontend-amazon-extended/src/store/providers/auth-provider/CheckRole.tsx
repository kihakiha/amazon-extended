import { useAuth } from "@/store/hooks/useAuth";
import { useRouter } from "next/router";
import { PropsWithChildren } from "react";
import { TComponentAuthFields } from "./auth-page.types";

const CheckRole: React.FC<PropsWithChildren<TComponentAuthFields>> = ({
  Component: { isOnlyUser },
  children,
}) => {
  const { user } = useAuth();

  const router = useRouter();

  const Children = <>{children}</>;

  if (user && isOnlyUser) {
    return Children;
  }

  router.pathname !== "/auth" && router.replace("/auth");
  return null;
};

export default CheckRole;
