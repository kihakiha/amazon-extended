import { Prisma } from "@prisma/client";
import { returnCategoryObject } from "src/category/return-category.object";
import { returnReviewObject } from "src/review/return-review.object";

export const returnProductObject: Prisma.ProductSelect = {
  id: true,
  name: true,
  description: true,
  images: true,
  price: true,
  slug: true,
  createdAt: true,
  category: {
    select: returnCategoryObject,
  },
  review: {
    select: returnReviewObject,
  },
};

export const returnProductObjectFullPage: Prisma.ProductSelect = {
  ...returnProductObject,
};
