import React from "react";
import { X, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import useCartStore from "../../store/cartStore";

const Cart = () => {
  const {
    items,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getTotalItems,
    getTotalPrice,
  } = useCartStore();

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (!isCartOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
        onClick={closeCart}
      />

      {/* Cart Panel */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-gray-900 text-white z-50 transform transition-transform duration-300 ease-in-out">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div className="flex items-center gap-3">
            <ShoppingBag size={24} />
            <h2 className="text-xl font-bold">Keranjang Belanja</h2>
          </div>
          <button
            onClick={closeCart}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Cart Content */}
        <div className="flex flex-col h-full">
          {items.length === 0 ? (
            /* Empty Cart */
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
              <ShoppingBag size={64} className="text-gray-600 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Keranjang Kosong</h3>
              <p className="text-gray-400 mb-6">
                Belum ada buku yang ditambahkan ke keranjang
              </p>
              <button
                onClick={closeCart}
                className="bg-white text-black px-6 py-2 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
              >
                Mulai Belanja
              </button>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="bg-gray-800 rounded-lg p-4">
                    <div className="flex gap-4">
                      <img
                        src={item.img}
                        alt={item.title}
                        className="w-16 h-20 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm mb-1">
                          {item.title}
                        </h4>
                        <p className="text-gray-400 text-xs mb-2">
                          {item.author}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-white">
                            {formatPrice(item.price)}
                          </span>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-400 hover:text-red-300 transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="w-8 h-8 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center transition-colors"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-8 text-center font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="w-8 h-8 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">
                          {formatPrice(item.price * item.quantity)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Cart Footer */}
              <div className="border-t border-gray-700 p-6 space-y-4">
                {/* Summary */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Total Item</span>
                    <span>{getTotalItems()} buku</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total Harga</span>
                    <span>{formatPrice(getTotalPrice())}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button className="w-full bg-white text-black font-semibold py-3 rounded-lg hover:bg-gray-200 transition-colors">
                    Checkout Sekarang
                  </button>
                  <button
                    onClick={clearCart}
                    className="w-full bg-transparent border border-gray-600 text-gray-300 font-semibold py-3 rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    Kosongkan Keranjang
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
