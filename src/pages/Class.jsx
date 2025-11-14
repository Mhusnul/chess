import React, { useState, useMemo } from "react";
import ModernNav from "../components/common/ModernNav";
import Footer from "../components/layout/Footer";
import Cart from "../components/common/Cart";
import { useCourseData } from "../hooks/useCourseDataFixed";
import useCartStore from "../store/cartStore";
import useToast from "../hooks/useToast.jsx";
import {
  Clock,
  Users,
  Award,
  ShoppingCart,
  ArrowLeft,
  Loader,
  AlertCircle,
  Filter,
  ChevronDown,
  ChevronUp,
  Sparkles,
} from "lucide-react";
import coursebg from "../assets/course-bg.jpg";
import chessBg3 from "../assets/chess-bg3.jpg";

function Class() {
  // Existing state and hooks
  const { courses, loading, error, refetch } = useCourseData();
  const { addToCart } = useCartStore();
  const { showToast, ToastComponent } = useToast();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [expandedCards, setExpandedCards] = useState(new Set());

  // Existing functionality
  const toggleExpand = (courseId) => {
    const newExpanded = new Set(expandedCards);
    if (newExpanded.has(courseId)) {
      newExpanded.delete(courseId);
    } else {
      newExpanded.add(courseId);
    }
    setExpandedCards(newExpanded);
  };

  // Get card background style - same for all cards
  const getCardBackground = () => {
    return {
      backgroundImage: `url(${chessBg3})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    };
  };

  // Get card classes - same for all cards
  const getCardClasses = () => {
    return "group bg-black/70 backdrop-blur-xl rounded-2xl border border-white/10 shadow-xl overflow-hidden transition-all duration-300 hover:transform hover:scale-[1.02] hover:border-white/20 hover:shadow-2xl relative";
  };

  const filteredCourses = useMemo(() => {
    if (selectedCategory === "All") return courses;
    return courses.filter((course) => course.category === selectedCategory);
  }, [courses, selectedCategory]);

  const categories = useMemo(() => {
    const cats = ["All"];
    const uniqueCategories = [
      ...new Set(courses.map((course) => course.category)),
    ];
    return cats.concat(uniqueCategories);
  }, [courses]);

  const handleAddToCart = (course) => {
    const cartItem = {
      id: `course-${course.id}`,
      title: course.title,
      price: course.price,
      img: coursebg,
      author: "Chess Academy",
      category: "Course",
      type: "course",
    };

    addToCart(cartItem);
    showToast(`"${course.title}" ditambahkan ke keranjang!`, "success");
  };

  return (
    <div className="bg-black font-serif min-h-screen overflow-x-hidden">
      <ModernNav />

      {/* Hero Section */}
      <div
        style={{
          backgroundImage: `url(${coursebg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="relative min-h-[60vh] flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black"></div>
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight animate-fade-in">
            Kelas Chess Available
          </h1>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed animate-fade-in-up">
            Pilih kelas yang sesuai dengan level dan kebutuhanmu. Dari pemula
            hingga mahir, kami menyediakan berbagai pilihan kelas dengan materi
            yang komprehensif.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <ToastComponent />

        {/* Category Filter */}
        <div className="bg-black/50 backdrop-blur-md rounded-xl p-4 sm:p-6 mb-8 border border-white/20">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-4 h-4 text-red-500" />
            <h3 className="text-lg font-semibold text-white">
              Filter Kategori
            </h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-red-600 text-white"
                    : "bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white"
                } border border-white/20`}
              >
                {category}
                <span className="ml-1 text-xs opacity-75">
                  {category === "All"
                    ? `(${courses.length})`
                    : `(${
                        courses.filter((c) =>
                          c.category
                            .toLowerCase()
                            .includes(category.toLowerCase())
                        ).length
                      })`}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Course List */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-3">
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">
                {selectedCategory === "All"
                  ? "Semua Kelas"
                  : `Kelas ${selectedCategory}`}
              </h2>
              <p className="text-gray-400 text-sm">
                {filteredCourses.length} kelas tersedia
              </p>
            </div>
            <button
              onClick={refetch}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              Refresh
            </button>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-16">
              <div className="text-center">
                <Loader className="animate-spin w-12 h-12 mx-auto mb-4 text-red-600" />
                <p className="text-lg text-gray-400 animate-pulse">
                  Memuat data kelas...
                </p>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="flex justify-center items-center py-16">
              <div className="bg-gradient-to-br from-black/80 to-black/40 backdrop-blur-xl rounded-2xl p-8 border border-red-500/20 text-center max-w-md">
                <AlertCircle className="w-12 h-12 mx-auto mb-4 text-red-600" />
                <h3 className="text-xl font-bold text-white mb-2">
                  Gagal Memuat Data
                </h3>
                <p className="text-gray-400 mb-6">{error}</p>
                <button
                  onClick={refetch}
                  className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-xl font-medium transition-all duration-300 transform hover:scale-105"
                >
                  Coba Lagi
                </button>
              </div>
            </div>
          )}

          {/* Course Grid */}
          {!loading && !error && filteredCourses.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredCourses.map((courseItem) => (
                <div
                  key={courseItem.id}
                  className={getCardClasses()}
                  style={getCardBackground()}
                >
                  {/* Background overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-black/80"></div>

                  {/* Course Header */}
                  <div className="p-6 border-b border-white/10 relative z-10">
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-500/90 text-black backdrop-blur-sm shadow-lg">
                        📚 {courseItem.category}
                      </span>
                    </div>
                    <h4 className="text-xl font-bold text-white mb-3 capitalize group-hover:text-yellow-400 transition-colors">
                      {courseItem.title}
                    </h4>

                    <div className="text-2xl font-bold text-yellow-400 group-hover:text-yellow-300 transition-colors">
                      {courseItem.priceDisplay}
                    </div>
                  </div>

                  {/* Course Details */}
                  <div className="p-6 space-y-4 relative z-10">
                    <div className="flex items-center gap-3 text-white">
                      <Clock className="w-5 h-5 text-red-500" />
                      <span className="text-sm">
                        {courseItem.pertemuan} • {courseItem.jamPelatihan}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-white">
                      <Users className="w-5 h-5 text-blue-500" />
                      <span className="text-sm">{courseItem.keterangan}</span>
                    </div>

                    {courseItem.promo && (
                      <div className="flex items-center gap-3 text-yellow-400">
                        <Award className="w-5 h-5" />
                        <span className="text-sm">
                          {courseItem.promo.replace(/\"/g, "")}
                        </span>
                      </div>
                    )}

                    {courseItem.syarat && (
                      <div className="flex items-center gap-3 text-white">
                        <AlertCircle className="w-5 h-5" />
                        <span className="text-sm">{courseItem.syarat}</span>
                      </div>
                    )}

                    {/* Materi Preview */}
                    <div className="bg-black/55 rounded-xl p-4">
                      <p className="text-sm font-medium text-white mb-2">
                        Materi:
                      </p>
                      <div className="text-sm text-white">
                        <div
                          className={`transition-all duration-300 ${
                            expandedCards.has(courseItem.id)
                              ? ""
                              : "line-clamp-3"
                          }`}
                        >
                          {courseItem.materi}
                        </div>
                        {courseItem.materi &&
                          courseItem.materi.length > 150 && (
                            <button
                              onClick={() => toggleExpand(courseItem.id)}
                              className="flex items-center gap-1 mt-2 text-yellow-400 hover:text-yellow-300 transition-colors text-sm font-medium group"
                            >
                              {expandedCards.has(courseItem.id) ? (
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
                    </div>

                    {/* Action Button */}
                    <button
                      onClick={() => handleAddToCart(courseItem)}
                      className="w-full bg-gradient-to-r from-white to-gray-200 hover:from-gray-200 hover:to-gray-300 text-black px-6 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 group"
                    >
                      <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      Daftar Kelas
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* No Results */}
          {!loading &&
            !error &&
            courses.length > 0 &&
            filteredCourses.length === 0 && (
              <div className="text-center py-16">
                <div className="bg-gradient-to-br from-black/80 to-black/40 backdrop-blur-xl rounded-2xl p-8 max-w-md mx-auto border border-white/10 shadow-xl">
                  <AlertCircle className="w-16 h-16 mx-auto mb-4 text-red-600" />
                  <h3 className="text-2xl font-bold mb-4 text-white">
                    Tidak Ada Kelas untuk Kategori "{selectedCategory}"
                  </h3>
                  <p className="text-white/80 mb-6">
                    Tidak ada kelas yang tersedia untuk kategori yang dipilih.
                  </p>
                  <button
                    onClick={() => setSelectedCategory("All")}
                    className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 px-6 py-3 rounded-xl transition-all duration-300 text-white font-semibold transform hover:scale-105"
                  >
                    Lihat Semua Kelas
                  </button>
                </div>
              </div>
            )}

          {/* Empty State */}
          {!loading && !error && courses.length === 0 && (
            <div className="text-center py-16">
              <div className="bg-gradient-to-br from-black/80 to-black/40 backdrop-blur-xl rounded-2xl p-8 max-w-md mx-auto border border-white/10 shadow-xl">
                <AlertCircle className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <h3 className="text-2xl font-bold mb-4 text-white">
                  Tidak Ada Kelas
                </h3>
                <p className="text-white/80">
                  Belum ada kelas yang tersedia saat ini.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
      <Cart />
    </div>
  );
}

export default Class;
