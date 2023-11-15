import { errorCatch } from "@/api/api.helper";
import { useProfile } from "@/components/hooks/useProfile";
import { UserService } from "@/services/user/user.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";

type TFavoriteButton = {
  productId: number;
};

const FavoriteButton: React.FC<TFavoriteButton> = ({ productId }) => {
  const { profile } = useProfile();

  const queryCache = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ["toggle favorite"],
    mutationFn: () => UserService.toggleFavorite(productId),
    onSuccess: () => {
      queryCache.invalidateQueries({ queryKey: ["get profile"] });
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
      <button className={"text-primary"} onClick={() => mutate()}>
        {currentElement ? <FaHeart /> : <CiHeart />}
      </button>
    </div>
  );
};
export default FavoriteButton;
