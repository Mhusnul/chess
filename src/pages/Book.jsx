import React, { useState, useEffect } from "react";
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
  ChevronDown,
  ChevronUp,
} from "lucide-react";

import bookBg from "../assets/book-bg.jpg";

function Book() {
  const { books: sheetsBooks, loading, error } = useGoogleSheetsBooks();
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [imageErrors, setImageErrors] = useState({});
  const [expandedCards, setExpandedCards] = useState(new Set());

  const { addToCart, getItemQuantity } = useCartStore();
  const { showToast, ToastComponent } = useToast();

  // Existing functionality remains the same
  const toggleExpand = (bookId) => {
    const newExpanded = new Set(expandedCards);
    if (newExpanded.has(bookId)) {
      newExpanded.delete(bookId);
    } else {
      newExpanded.add(bookId);
    }
    setExpandedCards(newExpanded);
  };

  const formatPrice = (price) => {
    const numericPrice = parseInt(price) || 0;
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(numericPrice);
  };

  useEffect(() => {
    setFilteredBooks(sheetsBooks);
    sheetsBooks.forEach((book) => {
      if (book.cover) {
        const img = new Image();
        img.src = book.cover;
      }
    });
  }, [sheetsBooks]);

  useEffect(() => {
    if (!sheetsBooks) return;

    let filtered = sheetsBooks;
    if (searchTerm) {
      filtered = sheetsBooks.filter((book) => {
        const searchLower = searchTerm.toLowerCase();
        return (
          (book.title && book.title.toLowerCase().includes(searchLower)) ||
          (book.deskripsi &&
            book.deskripsi.toLowerCase().includes(searchLower)) ||
          (book.bahasa && book.bahasa.toLowerCase().includes(searchLower)) ||
          (book.category && book.category.toLowerCase().includes(searchLower))
        );
      });
    }
    setFilteredBooks(filtered);
  }, [searchTerm, sheetsBooks]);

  const handleAddToCart = (book) => {
    const price = parseInt(book.price) || 0;
    const cartBook = {
      id: book.id,
      title: book.title,
      price: price,
      img: book.cover || "/placeholder-book.jpg",
      desc: book.deskripsi || "Deskripsi akan segera tersedia.",
      author: "Chess Academy",
    };

    addToCart(cartBook);
    showToast(`"${book.title}" ditambahkan ke keranjang!`, "success");
  };

  const logImageError = (bookId, url, error) => {
    console.error(`Image load error for book ${bookId}:`, error);
  };

  const goBack = () => {
    window.history.back();
  };

  return (
    <div className="bg-black font-serif min-h-screen overflow-x-hidden">
      <ModernNav />

      {/* Hero Section */}
      <div
        style={{
          backgroundImage: `url(${bookBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="relative min-h-[50vh] flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black"></div>
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight animate-fade-in">
            Koleksi Buku Catur
          </h1>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed animate-fade-in-up">
            Temukan buku-buku terbaik untuk meningkatkan kemampuan catur Anda.
            Dari strategi dasar hingga teknik lanjutan, koleksi lengkap untuk
            semua level.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <ToastComponent />

        {/* Back Button */}
        <button
          onClick={goBack}
          className="mb-8 group flex items-center space-x-2 text-white/80 hover:text-white transition-all duration-300"
        >
          <ArrowLeft
            size={20}
            className="group-hover:-translate-x-1 transition-transform"
          />
          <span>Kembali</span>
        </button>

        {/* Search Section */}
        <div className="bg-gradient-to-br from-black/80 to-black/40 backdrop-blur-xl rounded-2xl p-8 mb-12 border border-white/10 shadow-xl">
          <div className="flex justify-center">
            <div className="relative w-full max-w-2xl">
              <Search
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 group-hover:text-white transition-colors"
                size={20}
              />
              <input
                type="text"
                placeholder="Cari berdasarkan judul, deskripsi, bahasa, atau kategori..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all duration-300"
              />
            </div>
          </div>

          {/* Results Info */}
          <div className="mt-4 text-center">
            <p className="text-white/60">
              Menampilkan{" "}
              <span className="text-white font-semibold">
                {filteredBooks.length}
              </span>{" "}
              dari{" "}
              <span className="text-white font-semibold">
                {sheetsBooks.length}
              </span>{" "}
              buku
            </p>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-16">
            <div className="text-center">
              <Loader className="animate-spin w-12 h-12 mx-auto mb-4 text-red-600" />
              <p className="text-lg text-gray-400 animate-pulse">
                Memuat data buku...
              </p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="flex justify-center items-center py-16">
            <div className="bg-gradient-to-br from-black/80 to-black/40 backdrop-blur-xl rounded-2xl p-8 border border-red-500/20 text-center max-w-md">
              <BookOpen className="w-12 h-12 mx-auto mb-4 text-red-600" />
              <h3 className="text-xl font-bold text-white mb-2">
                Gagal memuat data
              </h3>
              <p className="text-gray-400 mb-4">
                Terjadi kesalahan saat memuat data buku
              </p>
              <p className="text-gray-600 text-sm">{error}</p>
            </div>
          </div>
        )}

        {/* Books Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {filteredBooks.map((book, index) => {
              const quantity = getItemQuantity(book.id);

              return (
                <div
                  key={book.id}
                  className="group relative bg-gradient-to-br from-black/80 to-black/40 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/10 shadow-xl transition-all duration-300 hover:transform hover:scale-[1.02] hover:border-white/20"
                >
                  {/* Book Cover */}
                  <div className="relative w-full aspect-[3/4] bg-gradient-to-br from-black/60 to-black/40 overflow-hidden">
                    {book.cover && !imageErrors[book.id] ? (
                      <>
                        <div className="absolute inset-0 bg-black animate-pulse" />
                        <img
                          src={book.cover}
                          alt={book.title}
                          className="w-full h-full object-contain p-4 transition-all duration-500 group-hover:scale-110 group-hover:rotate-1 relative z-10"
                          onLoad={(e) => {
                            e.target.previousSibling.style.opacity = 0;
                          }}
                          onError={(e) => {
                            logImageError(book.id, book.cover, e);
                            setImageErrors((prev) => ({
                              ...prev,
                              [book.id]: true,
                            }));
                          }}
                          loading="lazy"
                        />
                      </>
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 bg-gradient-to-br from-gray-800/50 to-gray-900/50 transition-colors duration-300">
                        <BookOpen
                          size={48}
                          className="group-hover:scale-110 transition-transform duration-300"
                        />
                        <span className="text-sm mt-2">Cover Coming Soon</span>
                        {process.env.NODE_ENV === "development" &&
                          book.cover && (
                            <span className="text-xs mt-1 text-red-400 max-w-[90%] truncate">
                              Failed to load: {book.cover}
                            </span>
                          )}
                      </div>
                    )}
                  </div>

                  {/* Book Info */}
                  <div className="p-6 space-y-4">
                    {/* Category Badge */}
                    <div className="flex flex-wrap gap-2">
                      <span className="inline-flex items-center bg-gradient-to-r from-red-600/20 to-red-700/20 text-red-400 px-3 py-1 rounded-full text-sm font-medium">
                        📚 {book.category}
                      </span>
                      <span className="inline-flex items-center bg-gradient-to-r from-blue-600/20 to-blue-700/20 text-blue-400 px-3 py-1 rounded-full text-sm font-medium">
                        🌐 {book.bahasa}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-white group-hover:text-yellow-400 transition-colors line-clamp-2">
                      {book.title}
                    </h3>

                    {/* Description */}
                    <div>
                      <div
                        className={`text-white/70 text-sm transition-all duration-300 ${
                          expandedCards.has(book.id) ? "" : "line-clamp-3"
                        }`}
                      >
                        {book.deskripsi}
                      </div>
                      {book.deskripsi && book.deskripsi.length > 150 && (
                        <button
                          onClick={() => toggleExpand(book.id)}
                          className="flex items-center gap-1 mt-2 text-yellow-400 hover:text-yellow-300 transition-colors text-sm font-medium group"
                        >
                          {expandedCards.has(book.id) ? (
                            <>
                              <ChevronUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
                              Tutup
                            </>
                          ) : (
                            <>
                              <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                              Selengkapnya
                            </>
                          )}
                        </button>
                      )}
                    </div>

                    {/* Price and Add to Cart */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                      <div>
                        {book.price && parseInt(book.price) > 0 ? (
                          <div className="text-2xl font-bold text-yellow-400 group-hover:text-yellow-300 transition-colors">
                            {formatPrice(parseInt(book.price))}
                          </div>
                        ) : (
                          <div className="text-xl font-bold text-gray-400">
                            Coming Soon
                          </div>
                        )}
                      </div>

                      <div className="flex gap-2">
                        {book.price && parseInt(book.price) > 0 ? (
                          <>
                            <button
                              onClick={() => handleAddToCart(book)}
                              className="bg-gradient-to-r from-white to-gray-200 text-black px-4 py-2 rounded-xl hover:from-gray-200 hover:to-gray-300 transition-all duration-300 font-semibold flex items-center gap-2 group"
                            >
                              <ShoppingCart
                                size={16}
                                className="group-hover:scale-110 transition-transform"
                              />
                              {quantity > 0 ? `(${quantity})` : "Beli"}
                            </button>
                            <button
                              onClick={() => handleAddToCart(book)}
                              className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-2 rounded-xl hover:from-gray-700 hover:to-gray-800 transition-all duration-300"
                            >
                              <Plus
                                size={16}
                                className="transform group-hover:rotate-180 transition-transform"
                              />
                            </button>
                          </>
                        ) : (
                          <button
                            disabled
                            className="bg-gradient-to-r from-gray-600 to-gray-700 text-gray-300 px-4 py-2 rounded-xl cursor-not-allowed font-semibold flex items-center gap-2 opacity-50"
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

        {/* No Results */}
        {!loading && !error && filteredBooks.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-gradient-to-br from-black/80 to-black/40 backdrop-blur-xl rounded-2xl p-8 max-w-md mx-auto border border-white/10 shadow-xl">
              <BookOpen className="w-16 h-16 mx-auto mb-4 text-red-600" />
              <h3 className="text-2xl font-bold mb-4 text-white">
                Tidak ada buku ditemukan
              </h3>
              <p className="text-white/80 mb-6">
                Coba ubah kata kunci pencarian Anda
              </p>
              <button
                onClick={() => setSearchTerm("")}
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 px-6 py-3 rounded-xl transition-all duration-300 text-white font-semibold transform hover:scale-105"
              >
                Reset Pencarian
              </button>
            </div>
          </div>
        )}
      </div>

      <Footer />
      <Cart />
    </div>
  );
}

export default Book;
