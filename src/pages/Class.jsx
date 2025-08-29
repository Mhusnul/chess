import React, { useState, useMemo } from "react";
import Navbar from "../components/layout/Navbar";
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
  const { showToast } = useToast();
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
      <Navbar />

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
        {/* Category Filter */}
        <div className="mb-12">
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
                    ? "bg-red-600 text-white border-red-500"
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
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm font-medium transition-colors"
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
              {filteredCourses.map((courseItem) => (
                <div
                  key={courseItem.id}
                  className="bg-white/30 backdrop-blur-md rounded-xl border border-white/20 p-6 hover:bg-white/15 transition-all duration-300 hover:scale-105"
                >
                  {/* Course Header */}
                  <div className="mb-4">
                    <h4 className="text-lg font-bold text-white mb-2 capitalize">
                      {courseItem.title}
                    </h4>
                    <div className="text-2xl font-bold text-red-500 mb-2">
                      {courseItem.priceDisplay}
                    </div>
                    <span className="px-3 py-1 bg-white/10 text-white border border-white/20 rounded-full text-sm font-medium capitalize">
                      {courseItem.category}
                    </span>
                  </div>

                  {/* Course Details */}
                  <div className="space-y-3 text-sm mb-4">
                    <div className="flex items-center gap-2 text-gray-300">
                      <Clock className="w-4 h-4" />
                      <span>
                        {courseItem.pertemuan} • {courseItem.jamPelatihan}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-gray-300">
                      <Users className="w-4 h-4" />
                      <span className="text-xs">{courseItem.keterangan}</span>
                    </div>

                    {courseItem.promo && (
                      <div className="flex items-center gap-2 text-red-400">
                        <Award className="w-4 h-4" />
                        <span className="text-xs">
                          {courseItem.promo.replace(/"/g, "")}
                        </span>
                      </div>
                    )}

                    {courseItem.syarat && (
                      <div className="text-xs text-gray-400">
                        <strong>Syarat:</strong> {courseItem.syarat}
                      </div>
                    )}
                  </div>

                  {/* Materi Preview */}
                  <div className="mb-4 p-3 bg-black/30 rounded-lg">
                    <p className="text-xs text-white font-medium mb-1">
                      Materi:
                    </p>
                    <p className="text-xs text-gray-400 line-clamp-4">
                      {courseItem.materi}
                    </p>
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={() => handleAddToCart(courseItem)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-all duration-200 transform hover:scale-105"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Daftar Kelas
                  </button>
                </div>
              ))}
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
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
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

      {/* Social Media Content Section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-4xl font-bold text-white text-center mb-4">
          Konten Pembelajaran
        </h2>
        <p className="text-gray-300 text-center mb-12 max-w-3xl mx-auto">
          Lihat video pembelajaran dan tips catur dari berbagai platform media
          sosial kami. Dapatkan insight terbaru tentang strategi dan taktik
          catur.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* YouTube Section */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-red-600/20 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-red-500"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">YouTube</h3>
                <p className="text-sm text-gray-400">Tutorial & Analisis</p>
              </div>
            </div>
            <div className="aspect-video bg-black/30 rounded-lg overflow-hidden">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/OCSbzArwB10"
                title="Chess Tutorial"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-lg"
              ></iframe>
            </div>
            <p className="text-sm text-gray-400 mt-4">
              Video tutorial strategi pembukaan dan taktik dasar catur untuk
              pemula.
            </p>
          </div>

          {/* TikTok Section */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-pink-600/20 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-pink-500"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">TikTok</h3>
                <p className="text-sm text-gray-400">Tips Singkat</p>
              </div>
            </div>
            <div className="aspect-[9/16] bg-black/30 rounded-lg overflow-hidden max-h-96 mx-auto">
              <iframe
                width="100%"
                height="100%"
                src="https://www.tiktok.com/embed/v2/7234567890123456789"
                title="TikTok Chess Tips"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-lg"
              ></iframe>
            </div>
            <p className="text-sm text-gray-400 mt-4">
              Tips cepat dan trik catur dalam format video pendek yang mudah
              dipahami.
            </p>
          </div>

          {/* Instagram Section */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-pink-500"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">Instagram</h3>
                <p className="text-sm text-gray-400">Daily Content</p>
              </div>
            </div>
            <div className="aspect-square bg-black/30 rounded-lg overflow-hidden">
              <iframe
                width="100%"
                height="100%"
                src="https://www.instagram.com/p/ABC123/embed"
                title="Instagram Chess Post"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-lg"
              ></iframe>
            </div>
            <p className="text-sm text-gray-400 mt-4">
              Konten harian berupa puzzle catur, motivasi, dan update
              pembelajaran.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-4">
              Follow Media Sosial Kami
            </h3>
            <p className="text-gray-300 mb-6">
              Dapatkan konten pembelajaran catur terbaru dan tips harian dari
              para ahli
            </p>
            <div className="flex justify-center gap-4">
              <a
                href="https://youtube.com/@fulanchess"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
                YouTube
              </a>
              <a
                href="https://tiktok.com/@fulanchess"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-black border border-white/20 hover:bg-white/10 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                </svg>
                TikTok
              </a>
              <a
                href="https://instagram.com/fulanchess"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                Instagram
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <Cart />
    </div>
  );
}

export default Class;
