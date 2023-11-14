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
  reviews: IReview[];
}
