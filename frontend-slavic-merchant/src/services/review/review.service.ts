import { instance } from "@/api/api.interceptor";
import { IReview } from "@/types/review.interface";

const REVIEWS = "reviews";

type TReviewRequestData = {
  text: string;
  rating: number;
};

export const ReviewService = {
  async getAll() {
    return await instance<IReview[]>({
      url: `/${REVIEWS}`,
      method: "GET",
    });
  },

  async getAvgRating(productId: string | number) {
    return await instance<IReview>({
      url: `/${REVIEWS}/${productId}`,
      method: "GET",
    });
  },

  async leaveReview(productId: string | number, data: TReviewRequestData) {
    return await instance<IReview>({
      url: `/${REVIEWS}/leave/${productId}`,
      method: "POST",
      data,
    });
  },
};
