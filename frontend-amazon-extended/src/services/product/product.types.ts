export const PRODUCTS = "products";

export type TProductDataResponse = {
  name: string;
  price: number;
  description?: string;
  images?: string[];
  categoryid?: number;
};

export type TProductDataFilters = {
  sort?: EnumProductsSort;
  searchTerm?: string;
  page?: string | number;
  perPage?: string | number;
};

export enum EnumProductsSort {
  HIGH_PRICE = "high-price",
  LOW_PRICE = "low-price",
  NEWEST = "newest",
  OLDEST = "oldest",
}
