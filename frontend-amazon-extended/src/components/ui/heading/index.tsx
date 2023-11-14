import cn from "clsx";
import React, { PropsWithChildren } from "react";

interface IHeading {
  className?: string;
}

export const Heading: React.FC<PropsWithChildren<IHeading>> = ({
  className,
  children,
}) => {
  return (
    <h1 className={cn("font-semibold text-3xl", className)}>{children}</h1>
  );
};
