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
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import bookBg from "../assets/book-bg.jpg";

function Book() {
  const { books: sheetsBooks, loading, error } = useGoogleSheetsBooks();
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [imageErrors, setImageErrors] = useState({});
  const [expandedCards, setExpandedCards] = useState(new Set());

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 10;

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

  // Pagination logic
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);
  const startIndex = (currentPage - 1) * booksPerPage;
  const endIndex = startIndex + booksPerPage;
  const currentBooks = filteredBooks.slice(startIndex, endIndex);

  // Pagination functions
  const goToPage = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goToPrevious = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };

  const goToNext = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  };

  // Reset to first page when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

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
          <div>
            {/* Results Info */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div>
                <p className="text-gray-400 text-sm">
                  Menampilkan {currentBooks.length} dari {filteredBooks.length}{" "}
                  buku
                  {searchTerm && ` untuk "${searchTerm}"`}
                </p>
                {totalPages > 1 && (
                  <p className="text-gray-500 text-xs mt-1">
                    Halaman {currentPage} dari {totalPages}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mb-8">
              {currentBooks.map((book, index) => {
                const quantity = getItemQuantity(book.id);
                const cardBg = index % 2 === 0 ? "bg-white/30" : "bg-black/30";

                return (
                  <div
                    key={book.id}
                    className={`${cardBg} backdrop-blur-md rounded-xl border border-white/20 overflow-hidden hover:bg-white/15 transition-all duration-300 hover:scale-105 group w-full max-w-xs mx-auto`}
                  >
                    {/* Book Cover */}
                    <div className="relative h-80 bg-gray-800 overflow-hidden">
                      {book.cover && !imageErrors[book.id] ? (
                        <>
                          <div className="absolute inset-0 bg-black animate-pulse" />
                          <img
                            src={book.cover}
                            alt={book.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 relative z-10"
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
                          <span className="text-sm mt-2">
                            Cover Coming Soon
                          </span>
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
                    <div className="p-4 space-y-3">
                      {/* Category Badge */}
                      <div className="flex flex-wrap gap-1">
                        <span className="inline-flex items-center bg-yellow-500/90 text-black backdrop-blur-sm shadow-lg px-2 py-1 rounded-full text-xs font-medium">
                          📚 {book.category}
                        </span>
                        <span className="inline-flex items-center bg-yellow-500/90 text-black backdrop-blur-sm shadow-lg px-2 py-1 rounded-full text-xs font-medium">
                          🌐 {book.bahasa}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-lg font-bold text-white group-hover:text-yellow-400 transition-colors line-clamp-2">
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
                      <div className="flex items-center justify-between pt-3 border-t border-white/10">
                        <div>
                          {book.price && parseInt(book.price) > 0 ? (
                            <div className="text-lg font-bold text-yellow-400 group-hover:text-yellow-300 transition-colors">
                              {formatPrice(parseInt(book.price))}
                            </div>
                          ) : (
                            <div className="text-sm font-bold text-gray-400">
                              Coming Soon
                            </div>
                          )}
                        </div>

                        <div className="flex gap-1">
                          {book.price && parseInt(book.price) > 0 ? (
                            <>
                              <button
                                onClick={() => handleAddToCart(book)}
                                className="bg-white text-black px-3 py-2 rounded-lg hover:bg-gray-200 transition-colors font-semibold flex items-center gap-1 text-sm"
                              >
                                <ShoppingCart size={14} />
                                {quantity > 0 ? `(${quantity})` : "Beli"}
                              </button>
                              <button
                                onClick={() => handleAddToCart(book)}
                                className="bg-gray-800 text-white p-2 rounded-lg hover:bg-gray-700 transition-colors"
                              >
                                <Plus size={14} />
                              </button>
                            </>
                          ) : (
                            <button
                              disabled
                              className="bg-gray-600 text-gray-300 px-3 py-2 rounded-lg cursor-not-allowed font-semibold flex items-center gap-1 text-sm opacity-50"
                            >
                              <ShoppingCart size={14} />
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

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 p-4 bg-black/50 backdrop-blur-md rounded-xl border border-white/20">
                <div className="text-sm text-gray-400">
                  Halaman {currentPage} dari {totalPages} | Total{" "}
                  {filteredBooks.length} buku
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={goToPrevious}
                    disabled={currentPage === 1}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      currentPage === 1
                        ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                        : "bg-white/10 text-white hover:bg-white/20 hover:scale-105"
                    }`}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </button>

                  <div className="flex items-center gap-1">
                    {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }

                      return (
                        <button
                          key={pageNum}
                          onClick={() => goToPage(pageNum)}
                          className={`w-8 h-8 rounded-lg text-sm font-medium transition-all duration-300 ${
                            currentPage === pageNum
                              ? "bg-red-600 text-white"
                              : "bg-white/10 text-white hover:bg-white/20"
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    onClick={goToNext}
                    disabled={currentPage === totalPages}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      currentPage === totalPages
                        ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                        : "bg-white/10 text-white hover:bg-white/20 hover:scale-105"
                    }`}
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
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
