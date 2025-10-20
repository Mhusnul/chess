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
} from "lucide-react";

import bookBg from "../assets/book-bg.jpg";

function Book() {
  const { books: sheetsBooks, loading, error } = useGoogleSheetsBooks();
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [imageErrors, setImageErrors] = useState({});

  const { addToCart, getItemQuantity } = useCartStore();
  const { showToast, ToastComponent } = useToast();

  // Format price to Indonesian Rupiah
  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Update filtered books when sheets data changes
  useEffect(() => {
    setFilteredBooks(sheetsBooks);

    // Preload images
    sheetsBooks.forEach((book) => {
      if (book.cover) {
        const img = new Image();
        img.src = book.cover;
      }
    });
  }, [sheetsBooks]);

  // Handle search filtering
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

  // Handle add to cart
  const handleAddToCart = (book) => {
    const cartBook = {
      id: book.id,
      title: book.title,
      price: parseFloat(book.formattedPrice) || 0,
      img: book.cover || "/placeholder-book.jpg",
      desc: book.deskripsi || "Deskripsi akan segera tersedia.",
      author: "Chess Academy",
    };

    addToCart(cartBook);
    showToast(`"${book.title}" ditambahkan ke keranjang!`, "success");
  };

  // Log image errors for debugging
  const logImageError = (bookId, url, error) => {
    // Simplified error logging
    console.error(`Image load error for book ${bookId}:`, error);
  };

  // Go back function
  const goBack = () => {
    window.history.back();
  };

  return (
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
          <h1 className="text-5xl font-bold mb-4 mt-12">Koleksi Buku Catur</h1>
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
            <div className="relative w-full max-w-lg">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60"
                size={20}
              />
              <input
                type="text"
                placeholder="Cari berdasarkan judul, deskripsi, bahasa, atau kategori..."
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
                  <div className="relative w-full aspect-[3/4] bg-black">
                    {book.cover && !imageErrors[book.id] ? (
                      <>
                        {/* Loading placeholder */}
                        <div className="absolute inset-0 bg-black animate-pulse" />

                        <img
                          src={book.cover}
                          alt={book.title}
                          className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300 relative z-10"
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
                      <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 bg-gray-800">
                        <BookOpen size={48} />
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
                  <div className="p-6">
                    {/* Category Badge */}
                    <div className="mb-3">
                      <span className="inline-block bg-red-600/20 text-red-400 px-3 py-1 rounded-full text-sm font-medium">
                        📚 {book.category}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold mb-3 text-white group-hover:text-yellow-400 transition-colors line-clamp-2">
                      {book.title}
                    </h3>

                    {/* Language Badge */}
                    <div className="mb-3">
                      <span className="inline-block bg-blue-600/20 text-blue-400 px-2 py-1 rounded text-xs font-medium">
                        🌐 {book.bahasa}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-white/70 text-sm mb-4 line-clamp-3">
                      {book.deskripsi}
                    </p>

                    {/* Price and Add to Cart */}
                    <div className="flex items-center justify-between">
                      <div>
                        {parseInt(book.formattedPrice) > 0 ? (
                          <div className="text-2xl font-bold text-yellow-400">
                            {formatPrice(parseInt(book.formattedPrice))}
                          </div>
                        ) : (
                          <div className="text-xl font-bold text-gray-400">
                            Coming Soon
                          </div>
                        )}
                      </div>

                      <div className="flex gap-2">
                        {parseInt(book.formattedPrice) > 0 ? (
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

        {/* No Results */}
        {!loading && !error && filteredBooks.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-black/50 backdrop-blur-md rounded-xl p-8 max-w-md mx-auto border border-white/20">
              <BookOpen className="w-16 h-16 mx-auto mb-4 text-red-600" />
              <h3 className="text-xl font-bold mb-2 text-white">
                Tidak ada buku ditemukan
              </h3>
              <p className="text-white/80 mb-4">
                Coba ubah kata kunci pencarian Anda
              </p>
              <button
                onClick={() => setSearchTerm("")}
                className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg transition-colors text-white"
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
