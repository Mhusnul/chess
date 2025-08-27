import React from "react";
import { ShoppingCart, Plus } from "lucide-react";
import bookbg from "../../assets/book-bg.jpg";
import { topBooks } from "../../data/bookData.js";
import useCartStore from "../../store/cartStore";
import useToast from "../../hooks/useToast";

function Book() {
  const { addToCart, getItemQuantity } = useCartStore();
  const { showToast, ToastComponent } = useToast();

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleAddToCart = (book) => {
    addToCart(book);
    showToast(`"${book.title}" ditambahkan ke keranjang!`, "success");
  };

  return (
    <div className="text-white font-serif">
      <ToastComponent />
      <h1 className="text-center font-bold my-5 text-3xl">Top 3 Book</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-5">
        {topBooks.map((book, index) => {
          const quantity = getItemQuantity(book.id);
          const cardBg = index % 2 === 0 ? "bg-white/30" : "bg-black/30";

          return (
            <div
              key={book.id}
              className={`${cardBg} backdrop-blur-md max-h-[40vh] overflow-hidden rounded-xl flex justify-between items-center transition-all duration-300 hover:scale-105`}
            >
              <div className="p-5 flex-1">
                <h3 className="font-light text-2xl mb-2">{book.title}</h3>
                <p className="font-light text-sm my-3 line-clamp-3">
                  {book.desc}
                </p>
                <div className="mb-3">
                  <span className="text-lg font-bold text-yellow-400">
                    {formatPrice(book.price)}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleAddToCart(book)}
                    className="flex-1 bg-white text-black px-3 py-2 flex items-center justify-center gap-2 rounded hover:bg-gray-200 transition-colors font-semibold"
                  >
                    <ShoppingCart size={16} />
                    {quantity > 0
                      ? `Tambah Lagi (${quantity})`
                      : "Beli Sekarang"}
                  </button>
                  <button
                    onClick={() => handleAddToCart(book)}
                    className="bg-gray-800 text-white px-3 py-2 rounded hover:bg-gray-700 transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
              <img
                src={book.img}
                alt={book.title}
                className="h-full p-3 w-24 object-cover"
              />
            </div>
          );
        })}
      </div>

      {/* Promo Section */}
      <div
        style={{
          backgroundImage: `url(${bookbg})`,
          backgroundSize: "cover",
          backgroundPosition: "bottom",
        }}
        className="bg-white h-64 my-5 mx-3 text-center flex flex-col justify-center items-center rounded-xl"
      >
        <p>Lebih Hemat untuk Buku Terbaikmu</p>
        <h3 className="text-5xl my-3">Diskon 20% untuk Buku Pilihan</h3>
        <button className="mt-2 bg-white text-black px-3 py-2 flex gap-2 rounded">
          Lihat Promo
        </button>
      </div>
    </div>
  );
}

export default Book;
