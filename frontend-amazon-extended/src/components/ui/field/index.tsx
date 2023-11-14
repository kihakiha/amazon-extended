import cn from "clsx";
import { forwardRef } from "react";
import { IField } from "./field.interface";

const Field = forwardRef<HTMLInputElement, IField>(
  (
    { placeholder, className, error, type = "text", style, Icon, ...rest },
    ref,
  ) => {
    return (
      <div className={cn("mb-2", className)} style={style}>
        <label>
          <span className="block mb-2">
            {Icon && <Icon className="mr-3" />}
            {placeholder}
          </span>
          <input
            ref={ref}
            type={type}
            placeholder={placeholder}
            className={cn(
              "px-4 py-2 w-full outline-none border border-gray border-solid focus:border-primary rounded transition-all placeholder:text-gray",
              {
                "border-red": !!error,
              },
            )}
            {...rest}
          />
        </label>
        {error && <div className="text-red mt-1 text-sm">{error}</div>}
      </div>
    );
  },
);

Field.displayName = "Field";

export default Field;
