import React from "react";
import { Atom, CalendarSync, SmilePlus, BrickWallFire, Clock, Users, Award, ShoppingCart } from "lucide-react";
import course from "../../assets/chess-bg.jpg";
import coursebg from "../../assets/course-bg.jpg";
import { useCourseData } from "../../hooks/useCourseDataFixed";
import { useCartStore } from "../../store/cartStore";
import { useToast } from "../../hooks/useToast";

function Course() {
  const { courses, loading, error } = useCourseData();
  const { addToCart } = useCartStore();
  const { showToast } = useToast();

  const handleAddToCart = (course) => {
    // Convert course to cart item format
    const cartItem = {
      id: `course-${course.id}`,
      title: course.title,
      price: course.price,
      img: coursebg, // Use course background as image
      author: 'Muhammad Husnul',
      category: 'Course',
      type: 'course'
    };
    
    addToCart(cartItem);
    showToast(`"${course.title}" ditambahkan ke keranjang!`, 'success');
  };

  return (
    <div
      style={{ backgroundImage: `url(${coursebg})`, backgroundSize: "cover" }}
      className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 text-white min-h-screen"
    >
      {/* Side Intro */}
      <div className="h-full flex flex-col justify-between gap-4">
        <div>
          <h3 className="font-bold text-3xl mb-4">
            Jadikan Papan Catur Panggung Kemenanganmu
          </h3>
          <p className="font-light text-lg">
            Pelajari seni catur bukan hanya untuk menang, tapi untuk berpikir
            lebih tajam dalam hidup. Kelas ini untuk kamu yang ingin serius
            melangkah lebih jauh.
          </p>
        </div>
        <img
          src={course}
          alt="Course"
          className="h-full w-full rounded-2xl object-cover"
        />
      </div>

      {/* Grid Konten */}
      <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1 */}
        <div className="bg-black/30 backdrop-blur-md p-6 rounded-xl shadow-md">
          <BrickWallFire strokeWidth={0.75} size={40} className="mb-4" />

          <h4 className="font-bold text-xl mb-2">Materi Lengkap</h4>
          <p className="text-sm text-gray-200">
            Belajar dari dasar hingga strategi lanjutan, mulai dari opening,
            mid-game, hingga endgame dengan panduan yang sistematis dan mudah
            dipahami.
          </p>
        </div>

        {/* Card 2 */}
        <div className="text-black bg-white/30 backdrop-blur-md p-6 rounded-xl">
          <CalendarSync strokeWidth={0.75} size={40} className="mb-4" />
          <h4 className="font-bold text-xl mb-2">Pendekatan Terarah</h4>
          <p className="text-sm">
            Setiap sesi dirancang dengan tujuan pembelajaran yang jelas agar
            kamu bisa berkembang secara bertahap dan konsisten.
          </p>
        </div>

        {/* Card 3 */}
        <div className="text-black bg-white/30 backdrop-blur-md p-6 rounded-xl">
          <Atom strokeWidth={0.75} size={40} className="mb-4" />
          <h4 className="font-bold text-xl mb-2">Komunitas Supportif</h4>
          <p className="text-sm">
            Bergabung dengan komunitas pemain lain untuk saling belajar,
            diskusi, dan sparring kapan pun kamu mau.
          </p>
        </div>

        {/* Card 4 */}
        <div className="bg-black/30 backdrop-blur-md p-6 rounded-xl">
          <SmilePlus strokeWidth={0.75} size={40} className="mb-4" />
          <h4 className="font-bold text-xl mb-2">Bimbingan Langsung</h4>
          <p className="text-sm text-gray-200">
            Dapatkan feedback langsung dari pelatih profesional untuk membentuk
            gaya permainan terbaikmu.
          </p>
        </div>

        {/* Tombol CTA */}
        <div className="col-span-1 md:col-span-2 flex justify-center mt-6">
          <button className="w-full bg-black/30 backdrop-blur-3xl font-bold text-2xl uppercase h-12 rounded-2xl font-serif">
            Bergabung Sekarang
          </button>
        </div>
      </div>

      {/* Course List Section */}
      <div className="md:col-span-3 mt-12">
        <div className="text-center mb-8">
          <h3 className="font-bold text-3xl mb-4">Pilihan Kelas Tersedia</h3>
          <p className="text-gray-300">
            Berbagai pilihan kelas dengan materi dan durasi yang disesuaikan dengan kebutuhanmu
          </p>
        </div>

        {loading && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            <p className="mt-2 text-gray-300">Memuat data kelas...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-8">
            <p className="text-red-400">Error: {error}</p>
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
                      <span className="text-xs">{courseItem.promo.replace(/"/g, '')}</span>
                    </div>
                  )}
                </div>

                {/* Materi Preview */}
                <div className="mb-4 p-3 bg-gray-800/50 rounded-lg">
                  <p className="text-xs text-gray-300 font-medium mb-1">Materi:</p>
                  <p className="text-xs text-gray-400 line-clamp-3">
                    {courseItem.materi}
                  </p>
                </div>

                {/* Action Button */}
                <button 
                  onClick={() => handleAddToCart(courseItem)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-green-600/20 hover:bg-green-600/30 text-green-300 hover:text-green-200 rounded-lg text-sm font-medium transition-all duration-200"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Daftar Kelas
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Course;
