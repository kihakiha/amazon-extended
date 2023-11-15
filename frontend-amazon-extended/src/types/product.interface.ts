import { ICategory } from "./category.interface";
import { IReview } from "./review.interface";

export interface IProduct {
  id: number;
  name: string;
  description: string;
  images: string[];
  price: number;
  slug: string;
  createdAt: string;
  category: ICategory;
  review: IReview[];
}

export type TProducts = {
  products: IProduct[];
};

export type TPaginationProduct = {
  length: number;
  products: IProduct[];
};
