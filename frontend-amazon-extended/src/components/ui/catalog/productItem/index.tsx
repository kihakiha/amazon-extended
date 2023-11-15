import { IProduct } from "@/types/product.interface";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AddToCartButton } from "./AddToCartButton";
import { ProductRating } from "./ProductRating";

const DynamicFavoriteButton = dynamic(() => import("./FavoriteButton"), {
  ssr: false,
});

export const ProductItem: React.FC<{ product: IProduct }> = ({ product }) => {
  return (
    <div>
      <div className=" bg-white rounded-xl relative overflow-hidden min-h-[250px]">
        <div className="absolute top-1 right-1 z-10">
          <DynamicFavoriteButton productId={product.id} />
        </div>
        <Link href={`/product/${product.slug}`}>
          <Image
            height={250}
            width={250}
            priority
            src={product.images[0]}
            className="w-auto max-h-[250px] mx-auto py-4"
            alt={"Product " + product.name}
          />
        </Link>
      </div>
      <Link href={`/product/${product.slug}`}>
        <h3 className="mb-1">{product.name}</h3>
      </Link>
      <Link
        href={`/category/${product.category.slug}`}
        className="text-aqua text-sm mb-2"
      >
        {product.category.name}
      </Link>
      <ProductRating product={product} />
      <div className="w-full flex justify-between items-center">
        <span className="text-2xl font-semibold">
          {product.price}
          <span className="font-normal">₽</span>{" "}
        </span>
        <AddToCartButton product={product} />
      </div>
    </div>
  );
};
