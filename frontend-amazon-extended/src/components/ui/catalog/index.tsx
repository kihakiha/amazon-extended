import { IProduct } from "@/types/product.interface";
import React from "react";
import { Button } from "../button";
import { Heading } from "../heading";
import { Loader } from "../loader";
import { ProductItem } from "./productItem";

interface ICatalog {
  products: IProduct[];
  isLoading?: boolean;
  title?: string;
  isPagination?: boolean;
}

export const Catalog: React.FC<ICatalog> = ({
  products,
  isLoading,
  title,
  isPagination = false,
}) => {
  if (isLoading) return <Loader />;

  return (
    <section>
      {title && <Heading>{title}</Heading>}
      {products.length ? (
        <>
          <div className="grid grid-cols-4 gap-10 mt-12">
            {products.map((product) => (
              <ProductItem
                key={product.id + "-" + product.slug}
                product={product}
              />
            ))}
          </div>
          {isPagination && <Button variant={"primary"}>Показать ещё</Button>}
        </>
      ) : (
        <div>Продуктов нет :d</div>
      )}
    </section>
  );
};
