import { getAccessToken, getRefreshToken } from "@/services/auth/auth.helper";
import { useActions } from "@/store/hooks/useActions";
import { useAuth } from "@/store/hooks/useAuth";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { PropsWithChildren, useEffect } from "react";
import { TComponentAuthFields } from "./auth-page.types";

const DynamicCheckRole = dynamic(() => import("./CheckRole"), { ssr: false });

const AuthProvider: React.FC<PropsWithChildren<TComponentAuthFields>> = ({
  Component: { isOnlyUser },
  children,
}) => {
  const { user } = useAuth();

  const { checkAuth, logout } = useActions();

  const { pathname } = useRouter();

  useEffect(() => {
    const accessToken = getAccessToken();

    if (accessToken) {
      checkAuth();
    }
  }, []);

  useEffect(() => {
    const refreshToken = getRefreshToken();
    if (!refreshToken && user) {
      logout();
    }
  }, [pathname]);
  return isOnlyUser ? (
    <DynamicCheckRole Component={{ isOnlyUser }}>{children}</DynamicCheckRole>
  ) : (
    <>{children}</>
  );
};

export default AuthProvider;
