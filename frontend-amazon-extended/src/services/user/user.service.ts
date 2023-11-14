import { instance } from "@/api/api.interceptor";
import { IUser } from "@/types/user.interface";

const USERS = "users";

type TUpdateRequest = {
  email: string;
  password?: string;
  name?: string;
  avatarPath?: string;
  phone?: string;
};

export const UserService = {
  async getProfile() {
    return await instance<IUser>({
      url: `/${USERS}/profile`,
      method: "GET",
    });
  },

  async updateUser(data: TUpdateRequest) {
    return await instance<IUser>({
      url: `/${USERS}/profile`,
      method: "PUT",
      data,
    });
  },

  async toggleFavorite(productId: string | number) {
    return await instance<IUser>({
      url: `/${USERS}/profile/favourites/${productId}`,
      method: "PATCH",
    });
  },
};
