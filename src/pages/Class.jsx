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
} from "lucide-react";
import coursebg from "../assets/course-bg.jpg";

function Class() {
  const { courses, loading, error, refetch } = useCourseData();
  const { addToCart } = useCartStore();
  const { showToast, ToastComponent } = useToast();
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Filter courses by category
  const filteredCourses = useMemo(() => {
    if (selectedCategory === "All") return courses;
    return courses.filter((course) => course.category === selectedCategory);
  }, [courses, selectedCategory]);

  // Get available categories from courses
  const categories = useMemo(() => {
    const cats = ["All"];
    const uniqueCategories = [
      ...new Set(courses.map((course) => course.category)),
    ];
    console.log("Available categories:", uniqueCategories);
    console.log("Total courses:", courses.length);
    return cats.concat(uniqueCategories);
  }, [courses]);

  const handleAddToCart = (course) => {
    // Convert course to cart item format
    const cartItem = {
      id: `course-${course.id}`,
      title: course.title,
      price: course.price,
      img: coursebg,
      author: "Muhammad Husnul",
      category: "Course",
      type: "course",
    };

    addToCart(cartItem);
    showToast(`"${course.title}" ditambahkan ke keranjang!`, "success");
  };

  const handleBackToHome = () => {
    window.history.back();
  };

  return (
    <div className="bg-black font-serif min-h-screen">
      <ModernNav />

      {/* Hero Section */}
      <div
        style={{ backgroundImage: `url(${coursebg})`, backgroundSize: "cover" }}
        className="relative min-h-[50vh] flex items-center justify-center"
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl font-bold mb-4 mt-12">
            Kelas Chess Available
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Pilih kelas yang sesuai dengan level dan kebutuhanmu. Dari pemula
            hingga mahir, kami menyediakan berbagai pilihan kelas dengan materi
            yang komprehensif.
          </p>
        </div>
      </div>

      {/* Category Overview with Quick Filters */}
      {loading && (
        <div className="max-w-7xl mx-auto px-6 py-12">
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            Kategori Kelas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 animate-pulse"
              >
                <div className="h-6 bg-white/20 rounded mb-2"></div>
                <div className="h-4 bg-white/15 rounded mb-3 w-24"></div>
                <div className="h-3 bg-white/10 rounded mb-4"></div>
                <div className="flex justify-between items-center">
                  <div className="h-3 bg-white/10 rounded w-16"></div>
                  <div className="h-3 bg-white/10 rounded w-20"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Course Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <ToastComponent />

        {/* Category Filter */}
        <div className="bg-black/50 backdrop-blur-md rounded-xl p-6 mb-8 border border-white/20">
          <div className="flex items-center gap-3 mb-6">
            <Filter className="w-5 h-5 text-white" />
            <h3 className="text-xl font-semibold text-white">
              Filter by Category
            </h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-red-600 text-white border-red-700"
                    : "bg-white/10 text-gray-300 border-white/20 hover:bg-white/20 hover:text-white"
                } border backdrop-blur-md`}
              >
                {category}
                {category !== "All" && (
                  <span className="ml-2 text-xs opacity-75">
                    (
                    {
                      courses.filter((c) =>
                        c.category
                          .toLowerCase()
                          .includes(category.toLowerCase())
                      ).length
                    }
                    )
                  </span>
                )}
                {category === "All" && (
                  <span className="ml-2 text-xs opacity-75">
                    ({courses.length})
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Course List */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-white">
              {selectedCategory === "All"
                ? "Semua Kelas Tersedia"
                : `Kelas ${selectedCategory}`}
              <span className="text-lg text-gray-400 ml-3">
                ({filteredCourses.length} kelas)
              </span>
            </h2>
            <button
              onClick={refetch}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors"
            >
              Refresh Data
            </button>
          </div>

          {loading && (
            <div className="text-center py-16">
              <Loader className="w-12 h-12 text-red-500 animate-spin mx-auto mb-4" />
              <p className="text-gray-300 text-lg">Memuat data kelas...</p>
            </div>
          )}

          {error && (
            <div className="text-center py-16">
              <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                Gagal Memuat Data
              </h3>
              <p className="text-gray-300 mb-6">{error}</p>
              <button
                onClick={refetch}
                className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
              >
                Coba Lagi
              </button>
            </div>
          )}

          {!loading && !error && filteredCourses.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredCourses.map((courseItem, index) => {
                // Menggunakan sistem warna seperti di Book
                const cardBg = index % 2 === 0 ? "bg-white/30" : "bg-black/30";

                return (
                  <div
                    key={courseItem.id}
                    className={`${cardBg} backdrop-blur-md rounded-xl border border-white/20 p-6 hover:bg-white/15 transition-all duration-300 hover:scale-105 group overflow-hidden`}
                  >
                    {/* Course Header */}
                    <div className="mb-4">
                      <div className="mb-2">
                        <span className="inline-block bg-red-600 text-white px-2 py-1 rounded text-xs font-medium capitalize">
                          {courseItem.category}
                        </span>
                      </div>

                      <h4 className="text-xl font-bold text-white mb-2 capitalize group-hover:text-yellow-400 transition-colors">
                        {courseItem.title}
                      </h4>

                      <div className="text-2xl font-bold text-yellow-400 mb-2">
                        {courseItem.priceDisplay}
                      </div>
                    </div>

                    {/* Course Details */}
                    <div className="space-y-3 text-sm mb-4">
                      <div className="flex items-center gap-2 text-white/80">
                        <Clock className="w-4 h-4" />
                        <span>
                          {courseItem.pertemuan} • {courseItem.jamPelatihan}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-white/70">
                        <Users className="w-4 h-4" />
                        <span className="text-xs">{courseItem.keterangan}</span>
                      </div>

                      {courseItem.promo && (
                        <div className="flex items-center gap-2 text-yellow-400">
                          <Award className="w-4 h-4" />
                          <span className="text-xs">
                            {courseItem.promo.replace(/"/g, "")}
                          </span>
                        </div>
                      )}

                      {courseItem.syarat && (
                        <div className="text-xs text-white/60">
                          <strong>Syarat:</strong> {courseItem.syarat}
                        </div>
                      )}
                    </div>

                    {/* Materi Preview */}
                    <div className="mb-4 p-3 bg-black/30 rounded-lg">
                      <p className="text-xs text-white font-medium mb-1">
                        Materi:
                      </p>
                      <p className="text-xs text-white/70 line-clamp-4">
                        {courseItem.materi}
                      </p>
                    </div>

                    {/* Action Button */}
                    <button
                      onClick={() => handleAddToCart(courseItem)}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors font-semibold"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Daftar Kelas
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          {!loading &&
            !error &&
            courses.length > 0 &&
            filteredCourses.length === 0 && (
              <div className="text-center py-16">
                <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">
                  Tidak Ada Kelas untuk Kategori "{selectedCategory}"
                </h3>
                <p className="text-gray-300 mb-4">
                  Tidak ada kelas yang tersedia untuk kategori yang dipilih.
                </p>
                <button
                  onClick={() => setSelectedCategory("All")}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
                >
                  Lihat Semua Kelas
                </button>
              </div>
            )}

          {!loading && !error && courses.length === 0 && (
            <div className="text-center py-16">
              <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                Tidak Ada Kelas
              </h3>
              <p className="text-gray-300">
                Belum ada kelas yang tersedia saat ini.
              </p>
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
