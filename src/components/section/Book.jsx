import React from "react";
import { ShoppingCart, Plus, BookOpen, Loader } from "lucide-react";
import bookbg from "../../assets/book-bg.jpg";
import useCartStore from "../../store/cartStore";
import useToast from "../../hooks/useToast.jsx";
import useGoogleSheetsBooks from "../../hooks/useGoogleSheetsBooks.js";

function Book() {
  const { addToCart, getItemQuantity } = useCartStore();
  const { showToast, ToastComponent } = useToast();
  const { books, loading, error } = useGoogleSheetsBooks();

  // Debug: Log books data
  React.useEffect(() => {
    if (books.length > 0) {
      console.log("📚 Books loaded in Book section:", books);
    }
  }, [books]);

  // Get top 3 books or first 3 if less than 3 available
  const topBooks = books.slice(0, 3);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleAddToCart = (book) => {
    // Convert book data to cart format
    const cartBook = {
      id: book.id,
      title: book.title,
      price: parseFloat(book.price) || 0,
      img: book.cover || "/placeholder-book.jpg", // Use cover or placeholder
      desc: book.description,
      author: book.author,
    };

    addToCart(cartBook);
    showToast(`"${book.title}" ditambahkan ke keranjang!`, "success");
  };

  if (loading) {
    return (
      <div id="book" className="text-white font-serif">
        <ToastComponent />
        <h1 className="text-center font-bold my-5 text-3xl">Top 3 Book</h1>
        <div className="flex justify-center items-center py-12">
          <div className="text-center">
            <Loader className="animate-spin w-8 h-8 mx-auto mb-4 text-red-600" />
            <p className="text-gray-400">Memuat data buku...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div id="book" className="text-white font-serif">
        <ToastComponent />
        <h1 className="text-center font-bold my-5 text-3xl">Top 3 Book</h1>
        <div className="flex justify-center items-center py-12">
          <div className="text-center">
            <BookOpen className="w-8 h-8 mx-auto mb-4 text-red-600" />
            <p className="text-gray-400">Gagal memuat data buku</p>
            <p className="text-gray-600 text-sm mt-2">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="book" className="text-white font-serif">
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
                <p className="text-xs text-gray-300 mb-1">oleh {book.author}</p>

                {/* Category & Language Info */}
                <div className="flex gap-2 mb-2">
                  {book.category && (
                    <span className="inline-block bg-red-600/20 text-red-400 px-2 py-1 rounded text-xs font-medium">
                      {book.category}
                    </span>
                  )}
                  {book.language && (
                    <span className="inline-block px-2 py-1 rounded text-xs font-medium">
                      {book.language}
                    </span>
                  )}
                  {book.format && (
                    <span className="inline-block px-2 py-1 rounded text-xs font-medium">
                      {book.format}
                    </span>
                  )}
                </div>

                <p className="font-light text-sm my-3 line-clamp-3">
                  {book.description}
                </p>
                <div className="mb-3">
                  {parseFloat(book.price) > 0 ? (
                    <span className="text-lg font-bold text-yellow-400">
                      {formatPrice(parseFloat(book.price))}
                    </span>
                  ) : (
                    <span className="text-lg font-bold text-gray-400">
                      Harga Coming Soon
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  {parseFloat(book.price) > 0 ? (
                    <>
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
                        className="bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700 transition-colors"
                      >
                        <Plus size={16} />
                      </button>
                    </>
                  ) : (
                    <button
                      disabled
                      className="flex-1 bg-gray-600 text-gray-300 px-3 py-2 flex items-center justify-center gap-2 rounded cursor-not-allowed font-semibold"
                    >
                      <ShoppingCart size={16} />
                      Coming Soon
                    </button>
                  )}
                </div>
              </div>
              <div className="h-full p-3 w-24 flex items-center justify-center bg-gray-700 rounded">
                {book.cover ? (
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="h-full w-full object-cover rounded"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "flex";
                    }}
                  />
                ) : null}
                <div
                  className="flex flex-col items-center justify-center text-gray-400"
                  style={{ display: book.cover ? "none" : "flex" }}
                >
                  <BookOpen size={24} />
                  <span className="text-xs mt-1">Cover</span>
                </div>
              </div>
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
        <button
          onClick={() => (window.location.href = "/book")}
          className="mt-2 bg-red-600 text-white px-6 py-3 flex gap-2 rounded-lg hover:bg-red-700 transition-colors font-semibold"
        >
          Lihat Promo
        </button>
      </div>
    </div>
  );
}

export default Book;
