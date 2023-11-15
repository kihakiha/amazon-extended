import { axiosClassic, instance } from "@/api/api.interceptor";
import { IProduct, TPaginationProduct } from "@/types/product.interface";
import {
  PRODUCTS,
  TProductDataFilters,
  TProductDataResponse,
} from "./product.types";

export const ProductService = {
  async getAll(queryData = {} as TProductDataFilters) {
    return axiosClassic<TPaginationProduct[]>({
      url: `/${PRODUCTS}`,
      method: "GET",
      params: queryData,
    });
  },

  async getById(productId: string | number) {
    return instance<IProduct>({
      url: `/${PRODUCTS}/${productId}`,
      method: "GET",
    });
  },

  async getBySlug(slug: string) {
    return axiosClassic<IProduct>({
      url: `/${PRODUCTS}/by-slug/${slug}`,
      method: "GET",
    });
  },

  async getAllByCategory(categorySlug: string) {
    return axiosClassic<IProduct[]>({
      url: `/${PRODUCTS}/by-category/${categorySlug}`,
      method: "GET",
    });
  },

  async getSimilar(productId: string) {
    return axiosClassic<IProduct[]>({
      url: `/${PRODUCTS}/similar/${productId}`,
      method: "GET",
    });
  },

  async createProduct() {
    return instance<IProduct>({
      url: `/${PRODUCTS}`,
      method: "POST",
    });
  },

  async updateProduct(id: string | number, data: TProductDataResponse) {
    return instance<IProduct>({
      url: `/${PRODUCTS}/${id}`,
      method: "PUT",
      data,
    });
  },

  async deleteCategory(id: string | number) {
    return instance<IProduct>({
      url: `/${PRODUCTS}/${id}`,
      method: "DELETE",
    });
  },
};
