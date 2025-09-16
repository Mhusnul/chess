import React, { useState } from "react";
import ModernNav from "../components/common/ModernNav";
import Footer from "../components/layout/Footer";
import Cart from "../components/common/Cart";
import useCartStore from "../store/cartStore";
import useToast from "../hooks/useToast.jsx";
import {
  ShoppingCart,
  Star,
  Filter,
  Search,
  ArrowLeft,
  Plus,
} from "lucide-react";

// Import cover images
import cover1 from "../assets/cover-book1.jpg";
import cover2 from "../assets/cover-book2.jpg";
import cover3 from "../assets/cover-book3.jpg";
import cover4 from "../assets/cover-book4.jpg";
import cover5 from "../assets/cover-book5.jpg";
import cover6 from "../assets/cover-book6.jpg";
import bookBg from "../assets/book-bg.jpg";
import courseBg from "../assets/course-bg.jpg";

// Dummy book data
const booksData = [
  {
    id: 1,
    title: "Strategi Pembukaan Catur",
    author: "Grandmaster Ahmad",
    price: 150000,
    originalPrice: 200000,
    cover: cover1,
    rating: 4.8,
    reviews: 124,
    category: "Strategi",
    description:
      "Pelajari berbagai strategi pembukaan yang digunakan oleh para grandmaster dunia.",
    pages: 320,
    language: "Indonesia",
    level: "Intermediate",
  },
  {
    id: 2,
    title: "Taktik & Kombinasi Catur",
    author: "Master Budi Santoso",
    price: 120000,
    originalPrice: 160000,
    cover: cover2,
    rating: 4.7,
    reviews: 89,
    category: "Taktik",
    description:
      "Asah kemampuan taktik Anda dengan berbagai kombinasi yang menakjubkan.",
    pages: 280,
    language: "Indonesia",
    level: "Beginner",
  },
  {
    id: 3,
    title: "Endgame Mastery",
    author: "International Master Sari",
    price: 180000,
    originalPrice: 240000,
    cover: cover3,
    rating: 4.9,
    reviews: 156,
    category: "Endgame",
    description:
      "Kuasai teknik endgame untuk memenangkan permainan di fase akhir.",
    pages: 350,
    language: "Indonesia",
    level: "Advanced",
  },
  {
    id: 4,
    title: "Psikologi Catur",
    author: "Dr. Maya Chess",
    price: 140000,
    originalPrice: 180000,
    cover: cover4,
    rating: 4.6,
    reviews: 73,
    category: "Psikologi",
    description:
      "Memahami aspek psikologi dalam permainan catur dan cara menggunakannya.",
    pages: 260,
    language: "Indonesia",
    level: "Intermediate",
  },
  {
    id: 5,
    title: "Sejarah Catur Dunia",
    author: "Prof. Andi Historian",
    price: 100000,
    originalPrice: 130000,
    cover: cover5,
    rating: 4.5,
    reviews: 45,
    category: "Sejarah",
    description: "Perjalanan sejarah catur dari awal hingga era modern.",
    pages: 220,
    language: "Indonesia",
    level: "Beginner",
  },
  {
    id: 6,
    title: "Analisis Partai Legendaris",
    author: "Grandmaster Dedi",
    price: 200000,
    originalPrice: 250000,
    cover: cover6,
    rating: 4.9,
    reviews: 201,
    category: "Analisis",
    description:
      "Analisis mendalam dari partai-partai legendaris dalam sejarah catur.",
    pages: 400,
    language: "Indonesia",
    level: "Advanced",
  },
];

const categories = [
  "Semua",
  "Strategi",
  "Taktik",
  "Endgame",
  "Psikologi",
  "Sejarah",
  "Analisis",
];
const levels = ["Semua", "Beginner", "Intermediate", "Advanced"];

function BookPage() {
  const [books] = useState(booksData);
  const [filteredBooks, setFilteredBooks] = useState(booksData);
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [selectedLevel, setSelectedLevel] = useState("Semua");
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);

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

  // Handle add to cart
  const handleAddToCart = (book) => {
    addToCart(book);
    showToast(`"${book.title}" ditambahkan ke keranjang!`, "success");
  };

  // Filter books based on category, level, and search term
  const filterBooks = () => {
    let filtered = books;

    if (selectedCategory !== "Semua") {
      filtered = filtered.filter((book) => book.category === selectedCategory);
    }

    if (selectedLevel !== "Semua") {
      filtered = filtered.filter((book) => book.level === selectedLevel);
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (book) =>
          book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredBooks(filtered);
  };

  // Apply filters when any filter changes
  React.useEffect(() => {
    filterBooks();
  }, [selectedCategory, selectedLevel, searchTerm]);

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

          {/* Search and Filter Section */}
          <div className="bg-black/50 backdrop-blur-md rounded-xl p-6 mb-8 border border-white/20">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              {/* Search Bar */}
              <div className="relative flex-1 max-w-md">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Cari buku atau penulis..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-purple-500 transition-colors"
                />
              </div>

              {/* Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 px-4 py-3 rounded-lg transition-colors"
              >
                <Filter size={20} />
                <span>Filter</span>
              </button>
            </div>

            {/* Filter Options */}
            {showFilters && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pt-4 border-t border-white/20">
                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Kategori
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-purple-500"
                  >
                    {categories.map((category) => (
                      <option
                        key={category}
                        value={category}
                        className="bg-black"
                      >
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Level Filter */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Level
                  </label>
                  <select
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(e.target.value)}
                    className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-purple-500"
                  >
                    {levels.map((level) => (
                      <option key={level} value={level} className="bg-black">
                        {level}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* Results Info */}
          <div className="mb-6">
            <p className="text-white/80">
              Menampilkan {filteredBooks.length} dari {books.length} buku
            </p>
          </div>

          {/* Books Grid */}
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
                  <div className="relative overflow-hidden">
                    <img
                      src={book.cover}
                      alt={book.title}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {book.originalPrice > book.price && (
                      <div className="absolute top-4 left-4 bg-red-600 text-white px-2 py-1 rounded-lg text-sm font-bold">
                        {Math.round(
                          ((book.originalPrice - book.price) /
                            book.originalPrice) *
                            100
                        )}
                        % OFF
                      </div>
                    )}
                    <div className="absolute top-4 right-4 bg-black/70 text-white px-2 py-1 rounded-lg text-sm">
                      {book.level}
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

                    <p className="text-white/70 text-sm mb-4 line-clamp-2">
                      {book.description}
                    </p>

                    {/* Rating and Reviews */}
                    <div className="flex items-center space-x-2 mb-4">
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className={`${
                              i < Math.floor(book.rating)
                                ? "text-yellow-400 fill-current"
                                : "text-gray-400"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-white/80">
                        {book.rating} ({book.reviews} ulasan)
                      </span>
                    </div>

                    {/* Book Details */}
                    <div className="text-xs text-white/60 mb-4 space-y-1">
                      <div>📖 {book.pages} halaman</div>
                      <div>🌐 {book.language}</div>
                    </div>

                    {/* Price and Add to Cart */}
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-bold text-yellow-400">
                          {formatPrice(book.price)}
                        </div>
                        {book.originalPrice > book.price && (
                          <div className="text-sm text-white/60 line-through">
                            {formatPrice(book.originalPrice)}
                          </div>
                        )}
                      </div>

                      <div className="flex gap-2">
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
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

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
