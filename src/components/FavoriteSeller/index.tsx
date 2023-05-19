"use client";

import api from "@/services/api";
import { useMutation } from "@tanstack/react-query";
import { MdOutlineStarOutline, MdOutlineStarPurple500 } from "react-icons/md";

interface IProps extends React.HTMLAttributes<HTMLButtonElement> {
  isFavorite: boolean;
  favoriteId?: string;
  onSucess?: () => void;
  readonly?: boolean;
  sellerId?: string;
  size?: number;
}

const FavoriteSeller = ({
  isFavorite,
  sellerId,
  favoriteId,
  onSucess,
  readonly,
  size,
  ...props
}: IProps) => {
  const makeFavorite = useMutation(
    async (sellerId: string) => {
      return api.customer.favotiveSeller.post(sellerId);
    },
    {
      onSuccess: () => {
        onSucess && onSucess();
      },
    }
  );

  const removeFavorite = useMutation(
    async (favoriteId: string) => {
      return api.customer.favotiveSeller.delete(favoriteId);
    },
    {
      onSuccess: () => {
        onSucess && onSucess();
      },
    }
  );

  const handleClic = () => {
    if (isFavorite && favoriteId) {
      return removeFavorite.mutate(favoriteId);
    }

    if(sellerId){
      return makeFavorite.mutate(sellerId);
    }
  };

  const getIcon = () => {
    if (isFavorite) {
      return <MdOutlineStarPurple500 size={size || 45} />;
    }

    return <MdOutlineStarOutline size={size || 45} />;
  };

  return (
    <button
      {...props}
      type="button"
      style={{
        backgroundColor: "transparent",
        border: "none",
        outline: "none",
        cursor: readonly ? "default" : "pointer",
        maxWidth: "50px",
        color: "orange",
      }}
      onClick={handleClic}
      disabled={makeFavorite.isLoading || removeFavorite.isLoading || readonly}
    >
      {getIcon()}
    </button>
  );
};

export { FavoriteSeller };
