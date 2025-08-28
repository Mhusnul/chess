import React from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Cart from "../components/common/Cart";
import { useCourseData } from "../hooks/useCourseDataFixed";
import useCartStore from "../store/cartStore";
import useToast from "../hooks/useToast";
import { Clock, Users, Award, ShoppingCart, ArrowLeft, Loader, AlertCircle } from "lucide-react";
import coursebg from "../assets/course-bg.jpg";

function Class() {
  const { courses, loading, error, refetch } = useCourseData();
  const { addToCart } = useCartStore();
  const { showToast } = useToast();

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
          <button
            onClick={handleBackToHome}
            className="absolute top-0 left-0 flex items-center gap-2 text-gray-300 hover:text-white transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            Kembali ke Beranda
          </button>
          
          <h1 className="text-5xl font-bold mb-4 mt-12">
            Kelas Chess Available
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Pilih kelas yang sesuai dengan level dan kebutuhanmu. Dari pemula hingga mahir, 
            kami menyediakan berbagai pilihan kelas dengan materi yang komprehensif.
          </p>
        </div>
      </div>

      {/* Course Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-center text-white">
            <div className="text-3xl font-bold text-blue-400 mb-2">16</div>
            <div className="text-gray-300">Total Kelas</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-center text-white">
            <div className="text-3xl font-bold text-green-400 mb-2">4</div>
            <div className="text-gray-300">Kategori Kelas</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-center text-white">
            <div className="text-3xl font-bold text-yellow-400 mb-2">1-2</div>
            <div className="text-gray-300">Jam per Sesi</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-center text-white">
            <div className="text-3xl font-bold text-purple-400 mb-2">Online</div>
            <div className="text-gray-300">& Offline</div>
          </div>
        </div>

        {/* Course Categories */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            Kategori Kelas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-green-600/20 to-green-800/20 backdrop-blur-md rounded-xl p-6 border border-green-500/30">
              <h3 className="text-xl font-bold text-green-400 mb-2">Public Class</h3>
              <p className="text-gray-300 text-sm mb-3">Rp 50K - 150K</p>
              <p className="text-gray-400 text-xs">Kelas grup untuk pemula, minimum 3 peserta</p>
            </div>
            <div className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 backdrop-blur-md rounded-xl p-6 border border-blue-500/30">
              <h3 className="text-xl font-bold text-blue-400 mb-2">Private Class</h3>
              <p className="text-gray-300 text-sm mb-3">Rp 150K - 500K</p>
              <p className="text-gray-400 text-xs">Kelas personal 1-on-1, pemula hingga menengah</p>
            </div>
            <div className="bg-gradient-to-br from-yellow-600/20 to-yellow-800/20 backdrop-blur-md rounded-xl p-6 border border-yellow-500/30">
              <h3 className="text-xl font-bold text-yellow-400 mb-2">Pro Class</h3>
              <p className="text-gray-300 text-sm mb-3">Rp 250K - 900K</p>
              <p className="text-gray-400 text-xs">Kelas advance dengan e-book gratis</p>
            </div>
            <div className="bg-gradient-to-br from-red-600/20 to-red-800/20 backdrop-blur-md rounded-xl p-6 border border-red-500/30">
              <h3 className="text-xl font-bold text-red-400 mb-2">Offline Class</h3>
              <p className="text-gray-300 text-sm mb-3">Rp 350K - 1M</p>
              <p className="text-gray-400 text-xs">Tatap muka langsung di JABODETABEK</p>
            </div>
          </div>
        </div>

        {/* Course List */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-white">
              Semua Kelas Tersedia
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
              <Loader className="w-12 h-12 text-blue-400 animate-spin mx-auto mb-4" />
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
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                Coba Lagi
              </button>
            </div>
          )}

          {!loading && !error && courses.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {courses.map((courseItem) => (
                <div
                  key={courseItem.id}
                  className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6 hover:bg-white/15 transition-all duration-300 hover:scale-105"
                >
                  {/* Course Header */}
                  <div className="mb-4">
                    <h4 className="text-lg font-bold text-white mb-2 capitalize">
                      {courseItem.title}
                    </h4>
                    <div className="text-2xl font-bold text-green-400 mb-2">
                      {courseItem.priceDisplay}
                    </div>
                    <span className="px-3 py-1 bg-blue-600/20 text-blue-300 rounded-full text-sm font-medium capitalize">
                      {courseItem.category}
                    </span>
                  </div>

                  {/* Course Details */}
                  <div className="space-y-3 text-sm mb-4">
                    <div className="flex items-center gap-2 text-gray-300">
                      <Clock className="w-4 h-4" />
                      <span>{courseItem.pertemuan} • {courseItem.jamPelatihan}</span>
                    </div>

                    <div className="flex items-center gap-2 text-gray-300">
                      <Users className="w-4 h-4" />
                      <span className="text-xs">{courseItem.keterangan}</span>
                    </div>

                    {courseItem.promo && (
                      <div className="flex items-center gap-2 text-yellow-300">
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
                  <div className="mb-4 p-3 bg-gray-800/50 rounded-lg">
                    <p className="text-xs text-gray-300 font-medium mb-1">
                      Materi:
                    </p>
                    <p className="text-xs text-gray-400 line-clamp-4">
                      {courseItem.materi}
                    </p>
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={() => handleAddToCart(courseItem)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-lg text-sm font-medium transition-all duration-200 transform hover:scale-105"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Daftar Kelas
                  </button>
                </div>
              ))}
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
