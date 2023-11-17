import { ProductService } from "@/services/product/product.service";
import { EnumProductsSort } from "@/services/product/product.types";
import { TPaginationProduct } from "@/types/product.interface";
import { Button } from "@/ui/button";
import { Heading } from "@/ui/heading";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import SortDropDown from "../SortDropDown";
import { ProductItem } from "../productItem";

interface ICatalogWithPagination {
  data: TPaginationProduct;
  title?: string;
}

export const CatalogWithPagination: React.FC<ICatalogWithPagination> = ({
  data,
  title,
}) => {
  const [page, setPage] = React.useState(1);

  const [sortType, setSortType] = React.useState<EnumProductsSort>(
    EnumProductsSort.NEWEST,
  );

  const { data: response, isLoading } = useQuery({
    queryKey: ["products", sortType, page],
    queryFn: () =>
      ProductService.getAll({
        page,
        perPage: 4,
        sort: sortType,
      }),
    initialData: data,
  });

  return (
    <section>
      {title && <Heading>{title}</Heading>}
      <SortDropDown sortType={sortType} setSortType={setSortType} />
      {response.products.length ? (
        <>
          <div className="grid grid-cols-4 gap-10 mt-12">
            {response.products.map((product) => (
              <ProductItem
                key={product.id + "-" + product.slug}
                product={product}
              />
            ))}
          </div>
          <div className="text-center mt-16">
            {Array.from({ length: response.length / 4 }).map((_, i) => {
              const pageNumber = i + 1;
              return (
                <Button
                  size="sm"
                  key={i}
                  variant={page === pageNumber ? "primary" : "light"}
                  onClick={() => setPage(pageNumber)}
                  className={"mx-3 rounded-xl px-5"}
                >
                  {pageNumber}
                </Button>
              );
            })}
          </div>
        </>
      ) : (
        <div>Продуктов нет :d</div>
      )}
    </section>
  );
};
