import { instance } from "@/api/api.interceptor";

const STATISTICS = "statistics";

export type TStatisticsResponse = {
  name: string;
  value: number;
};

export const StatisticsService = {
  async getMain() {
    return await instance<TStatisticsResponse[]>({
      url: `/${STATISTICS}/main`,
      method: "GET",
    });
  },
};
