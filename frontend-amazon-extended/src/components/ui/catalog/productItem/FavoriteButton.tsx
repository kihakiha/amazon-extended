import { errorCatch } from "@/api/api.helper";
import { useProfile } from "@/components/hooks/useProfile";
import { UserService } from "@/services/user/user.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

type TFavoriteButton = {
  productId: number;
};

const FavoriteButton: React.FC<TFavoriteButton> = ({ productId }) => {
  const { profile } = useProfile();

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ["toggle favorite"],
    mutationFn: () => UserService.toggleFavorite(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get profile"] });
    },
    onError: (error) => {
      console.log(errorCatch(error));
    },
  });

  if (!profile) {
    return null;
  }

  const currentElement = profile.favorite.some(
    (favorite) => favorite.id === productId,
  );

  return (
    <div>
      <button
        className={
          "text-primary hover:-translate-y-1 transition duration-200 ease-in-out"
        }
        onClick={() => mutate()}
      >
        {currentElement ? (
          <FaHeart size={"1.5em"} />
        ) : (
          <FaRegHeart size={"1.5em"} />
        )}
      </button>
    </div>
  );
};
export default FavoriteButton;
