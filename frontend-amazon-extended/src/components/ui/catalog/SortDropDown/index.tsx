import { EnumProductsSort } from "@/services/product/product.types";
import React, { Dispatch, SetStateAction } from "react";

interface ISortProps {
  sortType: EnumProductsSort;
  setSortType: Dispatch<SetStateAction<EnumProductsSort>>;
}

const SortDropDown: React.FC<ISortProps> = ({ sortType, setSortType }) => {
  return (
    <div className="text-right mb-2 ">
      <select
        value={sortType}
        onChange={(e) => setSortType(e.target.value as any)}
        className="outline-none px-3 py-1 text-primary "
      >
        {(
          Object.keys(EnumProductsSort) as Array<keyof typeof EnumProductsSort>
        ).map((key) => {
          return (
            <option
              key={EnumProductsSort[key]}
              className="text-secondary py-1"
              value={EnumProductsSort[key]}
            >
              {EnumProductsSort[key]}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default SortDropDown;
