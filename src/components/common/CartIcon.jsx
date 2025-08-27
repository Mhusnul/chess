import React from "react";
import { ShoppingBag } from "lucide-react";
import useCartStore from "../../store/cartStore";

const CartIcon = () => {
  const { getTotalItems, toggleCart } = useCartStore();
  const totalItems = getTotalItems();

  return (
    <button
      onClick={toggleCart}
      className="relative p-2 text-white hover:text-gray-300 transition-colors"
    >
      <ShoppingBag size={24} />
      {totalItems > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
          {totalItems > 9 ? "9+" : totalItems}
        </span>
      )}
    </button>
  );
};

export default CartIcon;
