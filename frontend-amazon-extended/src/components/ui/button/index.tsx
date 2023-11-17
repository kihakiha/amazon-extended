import React, { ButtonHTMLAttributes, PropsWithChildren } from "react";

import cn from "clsx";

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: "dark" | "light" | "primary" | "transparent";
  size?: "sm" | "md" | "lg";
}

export const Button: React.FC<PropsWithChildren<IButton>> = ({
  children,
  className,
  variant,
  size = "md",
  ...rest
}) => {
  return (
    <button
      {...rest}
      className={cn(
        "rounded-2xl font-medium shadow-sm px-10 py-2 hover:",
        {
          "text-secondary bg-primary": variant === "dark",
          "text-primary bg-white": variant === "light",
          "text-white bg-primary": variant === "primary",
          "text-primary bg-transparent shadow-none ": variant === "transparent",

          "px-3 py-1 text-sm": size === "sm",
          "px-4 py-2 text-md": size === "md",
          "px-5 py-2 text-lg": size === "lg",
        },
        className,
      )}
    >
      {children}
    </button>
  );
};
