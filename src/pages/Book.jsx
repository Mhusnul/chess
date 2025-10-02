import React, { useState } from "react";
import ModernNav from "../components/common/ModernNav";
import Footer from "../components/layout/Footer";
import Cart from "../components/common/Cart";
import useCartStore from "../store/cartStore";
import useToast from "../hooks/useToast.jsx";
import useGoogleSheetsBooks from "../hooks/useGoogleSheetsBooks.js";
import {
  ShoppingCart,
  Search,
  ArrowLeft,
  Plus,
  BookOpen,
  Loader,
} from "lucide-react";

import bookBg from "../assets/book-bg.jpg";
import courseBg from "../assets/course-bg.jpg";

function BookPage() {
  const { books: sheetsBooks, loading, error } = useGoogleSheetsBooks();
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const { addToCart, getItemQuantity } = useCartStore();
  const { showToast, ToastComponent } = useToast();

  // Update filtered books when sheets data changes
  React.useEffect(() => {
    setFilteredBooks(sheetsBooks);
  }, [sheetsBooks]);

  // Format price to Indonesian Rupiah
  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Handle add to cart
  const handleAddToCart = (book) => {
    // Convert book data to cart format
    const cartBook = {
      id: book.id,
      title: book.title,
      price: parseFloat(book.price) || 0,
      img: book.cover || "/placeholder-book.jpg",
      desc: book.description,
      author: book.author,
    };

    addToCart(cartBook);
    showToast(`"${book.title}" ditambahkan ke keranjang!`, "success");
  };

  // Filter books based on search term only
  const filterBooks = () => {
    let filtered = sheetsBooks;

    if (searchTerm) {
      filtered = filtered.filter(
        (book) =>
          book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredBooks(filtered);
  };

  // Apply search filter when search term changes
  React.useEffect(() => {
    filterBooks();
  }, [searchTerm, sheetsBooks]);

  // Go back to previous page
  const goBack = () => {
    window.history.back();
  };

  return (
    <>
      <div className="bg-black font-serif min-h-screen">
        <ModernNav />

        {/* Hero Section */}
        <div
          style={{
            backgroundImage: `url(${bookBg})`,
            backgroundSize: "cover",
          }}
          className="relative min-h-[50vh] flex items-center justify-center"
        >
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="relative z-10 text-center text-white px-4">
            <h1 className="text-5xl font-bold mb-4 mt-12">
              Koleksi Buku Catur
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Temukan buku-buku terbaik untuk meningkatkan kemampuan catur Anda.
              Dari strategi dasar hingga teknik lanjutan, koleksi lengkap untuk
              semua level.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          <ToastComponent />

          {/* Back Button */}
          <button
            onClick={goBack}
            className="mb-6 flex items-center space-x-2 text-white/80 hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Kembali</span>
          </button>

          {/* Search Section */}
          <div className="bg-black/50 backdrop-blur-md rounded-xl p-6 mb-8 border border-white/20">
            <div className="flex justify-center">
              {/* Search Bar */}
              <div className="relative w-full max-w-lg">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Cari berdasarkan judul, penulis, atau kategori..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-red-500 transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Results Info */}
          <div className="mb-6">
            <p className="text-white/80">
              Menampilkan {filteredBooks.length} dari {sheetsBooks.length} buku
            </p>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-12">
              <div className="text-center">
                <Loader className="animate-spin w-8 h-8 mx-auto mb-4 text-red-600" />
                <p className="text-gray-400">Memuat data buku...</p>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="flex justify-center items-center py-12">
              <div className="text-center">
                <BookOpen className="w-8 h-8 mx-auto mb-4 text-red-600" />
                <p className="text-gray-400">Gagal memuat data buku</p>
                <p className="text-gray-600 text-sm mt-2">{error}</p>
              </div>
            </div>
          )}

          {/* Books Grid */}
          {!loading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {filteredBooks.map((book, index) => {
                const quantity = getItemQuantity(book.id);
                const cardBg = index % 2 === 0 ? "bg-white/30" : "bg-black/30";

                return (
                  <div
                    key={book.id}
                    className={`${cardBg} backdrop-blur-md rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 group`}
                  >
                    {/* Book Cover */}
                    <div className="relative overflow-hidden bg-gray-700">
                      {book.cover ? (
                        <img
                          src={book.cover}
                          alt={book.title}
                          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            e.target.style.display = "none";
                            e.target.nextSibling.style.display = "flex";
                          }}
                        />
                      ) : null}
                      <div
                        className="w-full h-64 flex flex-col items-center justify-center text-gray-400"
                        style={{ display: book.cover ? "none" : "flex" }}
                      >
                        <BookOpen size={48} />
                        <span className="text-sm mt-2">Cover Coming Soon</span>
                      </div>
                    </div>

                    {/* Book Info */}
                    <div className="p-6">
                      <div className="mb-2">
                        <span className="inline-block bg-yellow-400/20 text-yellow-400 px-2 py-1 rounded text-xs font-medium">
                          {book.category}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold mb-2 text-white group-hover:text-yellow-400 transition-colors">
                        {book.title}
                      </h3>

                      <p className="text-white/80 text-sm mb-3">
                        oleh {book.author}
                      </p>

                      {/* Additional Info Tags */}
                      <div className="flex flex-wrap gap-2 mb-3">
                        {book.language && (
                          <span className="inline-block bg-blue-600/20 text-blue-400 px-2 py-1 rounded text-xs font-medium">
                            🌐 {book.language}
                          </span>
                        )}
                        {book.format && (
                          <span className="inline-block bg-green-600/20 text-green-400 px-2 py-1 rounded text-xs font-medium">
                            📄 {book.format}
                          </span>
                        )}
                        {book.publisher && (
                          <span className="inline-block bg-purple-600/20 text-purple-400 px-2 py-1 rounded text-xs font-medium">
                            🏢 {book.publisher}
                          </span>
                        )}
                        {book.fileSize && (
                          <span className="inline-block bg-orange-600/20 text-orange-400 px-2 py-1 rounded text-xs font-medium">
                            💾 {book.fileSize}
                          </span>
                        )}
                      </div>

                      <p className="text-white/70 text-sm mb-4 line-clamp-2">
                        {book.description}
                      </p>

                      {/* Price and Add to Cart */}
                      <div className="flex items-center justify-between">
                        <div>
                          {parseFloat(book.price) > 0 ? (
                            <div className="text-2xl font-bold text-yellow-400">
                              {formatPrice(parseFloat(book.price))}
                            </div>
                          ) : (
                            <div className="text-xl font-bold text-gray-400">
                              Harga Coming Soon
                            </div>
                          )}
                        </div>

                        <div className="flex gap-2">
                          {parseFloat(book.price) > 0 ? (
                            <>
                              <button
                                onClick={() => handleAddToCart(book)}
                                className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors font-semibold flex items-center gap-2"
                              >
                                <ShoppingCart size={16} />
                                {quantity > 0 ? `(${quantity})` : "Beli"}
                              </button>
                              <button
                                onClick={() => handleAddToCart(book)}
                                className="bg-gray-800 text-white px-3 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                              >
                                <Plus size={16} />
                              </button>
                            </>
                          ) : (
                            <button
                              disabled
                              className="bg-gray-600 text-gray-300 px-4 py-2 rounded-lg cursor-not-allowed font-semibold flex items-center gap-2"
                            >
                              <ShoppingCart size={16} />
                              Coming Soon
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Promo Section */}
          <div
            style={{
              backgroundImage: `url(${bookBg})`,
              backgroundSize: "cover",
              backgroundPosition: "bottom",
            }}
            className="text-white bg-white h-64 my-5 mx-3 text-center flex flex-col justify-center items-center rounded-xl"
          >
            <p className="">Lebih Hemat untuk Buku Terbaikmu</p>
            <h3 className="text-5xl my-3">Diskon 20% untuk Buku Pilihan</h3>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("Semua");
                setSelectedLevel("Semua");
                setShowFilters(false);
              }}
              className="mt-2 bg-white text-black px-3 py-2 flex gap-2 rounded hover:bg-gray-200 transition-colors"
            >
              Lihat Promo
            </button>
          </div>

          {/* No Results */}
          {filteredBooks.length === 0 && (
            <div className="text-center py-12">
              <div className="bg-black/50 backdrop-blur-md rounded-xl p-8 max-w-md mx-auto border border-white/20">
                <h3 className="text-xl font-bold mb-2">
                  Tidak ada buku ditemukan
                </h3>
                <p className="text-white/80 mb-4">
                  Coba ubah filter atau kata kunci pencarian Anda
                </p>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("Semua");
                    setSelectedLevel("Semua");
                  }}
                  className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-lg transition-colors"
                >
                  Reset Filter
                </button>
              </div>
            </div>
          )}
        </div>

        <Footer />
        <Cart />
      </div>
    </>
  );
}

export default BookPage;
