import React, { ButtonHTMLAttributes, PropsWithChildren } from "react";

import cn from "clsx";

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: "dark" | "light" | "primary";
}

export const Button: React.FC<PropsWithChildren<IButton>> = ({
  children,
  className,
  variant,
  ...rest
}) => {
  return (
    <button
      {...rest}
      className={cn(
        "rounded-2xl font-medium shadow-sm px-10 py-2",
        {
          "text-secondary bg-primary": variant === "dark",
          "text-primary bg-white": variant === "light",
          "text-white bg-primary": variant === "primary",
        },
        className,
      )}
    >
      {children}
    </button>
  );
};
