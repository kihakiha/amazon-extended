import { IProduct } from "@/types/product.interface";
import React from "react";
import { Rating } from "react-simple-star-rating";

export const ProductRating: React.FC<{ product: IProduct }> = ({ product }) => {
  // const { data: rating } = useQuery({
  //   queryKey: ["get product raging", product.id],
  //   queryFn: () => ReviewService.getAvgRating(product.id),
  //   select: ({ data }) => data,
  // });

  const [rating, setRating] = React.useState<number>(
    Math.round(
      product.review.reduce((acc, review) => acc + review.rating, 0) /
        product.review.length,
    ) || 0,
  );

  return (
    <div className="mb-2 flex justify-between items-center ">
      <span className="mr-1 flex justify-between items-center">
        <Rating
          readonly
          initialValue={rating}
          SVGstyle={{ display: "inline-block" }}
          size={18}
          allowFraction
          transition
          fillColor="#FF9902"
        />
        <span className="text-primary">{rating}</span>
      </span>
      <span>({product.review?.length} отзывов)</span>
    </div>
  );
};
