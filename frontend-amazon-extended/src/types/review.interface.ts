import { IUser } from "./user.interface";

export interface IReview {
  user: IUser;
  id: number;
  text: string;
  rating: string;
  createdAt: string;
}
