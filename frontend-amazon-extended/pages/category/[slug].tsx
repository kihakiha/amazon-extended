import { CategoryService } from "@/services/category/category.service";
import { ProductService } from "@/services/product/product.service";
import { ICategory } from "@/types/category.interface";
import { IProduct } from "@/types/product.interface";
import { Catalog } from "@/ui/catalog";
import Layout from "@/ui/layout";
import { Meta } from "@/ui/meta";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";

interface ICategorPage {
  products: IProduct[];
  category: ICategory;
}
const CategoryPage: NextPage<ICategorPage> = ({ products, category }) => {
  return (
    <Meta title={category.name}>
      <Layout>
        <Catalog title={category.name} products={products || []} />
      </Layout>
    </Meta>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const categories = await CategoryService.getAll();

  const paths = categories.data.map((category) => {
    return {
      params: { slug: category.slug },
    };
  });

  return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { data: products } = await ProductService.getAllByCategory(
    params?.slug as string,
  );

  const { data: category } = await CategoryService.getBySlug(
    params?.slug as string,
  );

  return {
    props: {
      products,
      category,
    },
  };
};

export default CategoryPage;
