import { TPaginationProduct } from "@/types/product.interface";
import { CatalogWithPagination } from "@/ui/catalog/catalogWithPagination";
import Layout from "@/ui/layout";
import { Meta } from "@/ui/meta";
import React from "react";

export const Home: React.FC<TPaginationProduct> = ({ products, length }) => {
  return (
    <Meta title="Главная">
      <Layout>
        <CatalogWithPagination
          title="Актуальные предложения"
          data={{ products, length }}
        />
      </Layout>
    </Meta>
  );
};
