import { Home } from "@/screens/home";
import { ProductService } from "@/services/product/product.service";
import { TPaginationProduct } from "@/types/product.interface";
import { GetStaticProps, NextPage } from "next";

const HomePage: NextPage<TPaginationProduct> = ({ length, products }) => {
  return <Home products={products} length={length} />;
};

export const getStaticProps: GetStaticProps<TPaginationProduct> = async () => {
  const data = await ProductService.getAll({
    page: 1,
    perPage: 4,
  });

  return {
    props: data,
  };
};

export default HomePage;
