import React, { useRef } from "react";
import { Star, Quote, ChevronLeft, ChevronRight, Play } from "lucide-react";

const Testimony = () => {
  const scrollContainerRef = useRef(null);

  const testimonials = [
    {
      id: 1,
      name: "Ahmad Rizki",
      role: "Pelajar SMA",
      rating: 5,
      message:
        "Kursus catur di Dziths Chess sangat membantu saya memahami strategi bermain catur. Sekarang rating saya sudah naik dari 800 menjadi 1200!",
      avatar: "AR",
      location: "Jakarta",
      duration: "3 Bulan",
      photo: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      id: 2,
      name: "Siti Nurhaliza",
      role: "Mahasiswa",
      rating: 5,
      message:
        "Materinya sangat lengkap dan mudah dipahami. Instruktur sangat sabar dalam mengajar. Buku-bukunya juga berkualitas tinggi.",
      avatar: "SN",
      location: "Bandung",
      duration: "6 Bulan",
      photo: "https://randomuser.me/api/portraits/women/2.jpg",
    },
    {
      id: 3,
      name: "Budi Santoso",
      role: "Karyawan",
      rating: 5,
      message:
        "Sebagai pemula, saya merasa sangat terbantu dengan metode pengajaran yang sistematis. Sekarang saya sudah bisa bermain catur dengan percaya diri.",
      avatar: "BS",
      location: "Surabaya",
      duration: "4 Bulan",
      photo: "https://randomuser.me/api/portraits/men/3.jpg",
    },
    {
      id: 4,
      name: "Maya Sari",
      role: "Ibu Rumah Tangga",
      rating: 5,
      message:
        "Kursus online-nya fleksibel, bisa belajar sambil mengurus anak. Komunitasnya juga aktif dan supportif untuk pemain baru.",
      avatar: "MS",
      location: "Medan",
      duration: "2 Bulan",
      photo: "https://randomuser.me/api/portraits/women/4.jpg",
    },
    {
      id: 5,
      name: "Andi Pratama",
      role: "Pelajar SMP",
      rating: 5,
      message:
        "Gurunya keren! Bisa bikin catur jadi menyenangkan. Dulu saya gak suka catur, sekarang malah ketagihan main terus.",
      avatar: "AP",
      location: "Yogyakarta",
      duration: "5 Bulan",
      photo: "https://randomuser.me/api/portraits/men/5.jpg",
    },
    {
      id: 6,
      name: "Dewi Lestari",
      role: "Guru",
      rating: 5,
      message:
        "Materi pembelajaran sangat terstruktur. Saya jadi bisa mengajarkan catur ke murid-murid saya di sekolah dengan lebih baik.",
      avatar: "DL",
      location: "Malang",
      duration: "8 Bulan",
      photo: "https://randomuser.me/api/portraits/women/6.jpg",
    },
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-3 h-3 ${
          index < rating ? "text-yellow-400 fill-current" : "text-gray-400"
        }`}
      />
    ));
  };

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    const scrollAmount = 400;
    if (container) {
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-5 mx-5 rounded-2xl bg-gradient-to-b from-gray-950 via-black to-gray-950">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h3 className="font-bold text-3xl text-white mb-4">
            Cerita Sukses dari Siswa Kami
          </h3>
          <p className="font-light text-lg text-white/90">
            Dengarkan pengalaman siswa-siswa kami yang telah merasakan manfaat
            belajar catur bersama Dziths Chess. Dari pemula hingga juara!
          </p>
        </div>

        {/* Horizontal Scroll Container */}
        <div className="relative group">
          {/* Navigation Buttons */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-black/80 hover:bg-yellow-400 text-white hover:text-black p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-1/2 backdrop-blur-sm border border-white/10"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-black/80 hover:bg-yellow-400 text-white hover:text-black p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-1/2 backdrop-blur-sm border border-white/10"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Scrollable Content */}
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="flex-shrink-0 w-[380px] group/card"
              >
                <div className="bg-gradient-to-b from-gray-900 to-gray-800 rounded-2xl overflow-hidden border border-gray-700 hover:border-yellow-400/50 transition-all duration-300 hover:shadow-2xl hover:shadow-yellow-400/10">
                  {/* Photo Thumbnail */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={testimonial.photo}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent"></div>

                    {/* Quote Icon Overlay */}
                    <div className="absolute top-4 left-4 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
                      <div className="bg-yellow-400/90 backdrop-blur-sm p-2 rounded-full">
                        <Quote className="w-5 h-5 text-black" />
                      </div>
                    </div>

                    {/* Duration Badge */}
                    <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-sm px-3 py-1 rounded-full border border-yellow-400/30">
                      <span className="text-yellow-400 text-xs font-semibold">
                        ⏱ {testimonial.duration}
                      </span>
                    </div>

                    {/* Rating Badge on Photo */}
                    <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-400 fill-current" />
                      <span className="text-white text-xs font-semibold">
                        {testimonial.rating}.0
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-3">
                      {renderStars(testimonial.rating)}
                    </div>

                    {/* Message */}
                    <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
                      "{testimonial.message}"
                    </p>

                    {/* Divider */}
                    <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent my-4"></div>

                    {/* User Info */}
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-yellow-400/20">
                        <img
                          src={testimonial.photo}
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-white font-semibold text-sm truncate">
                          {testimonial.name}
                        </h4>
                        <p className="text-gray-400 text-xs truncate">
                          {testimonial.role}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-yellow-400 text-xs">
                          📍 {testimonial.location}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Scroll Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            <div className="text-gray-500 text-sm flex items-center gap-2">
              <ChevronLeft className="w-4 h-4" />
              <span>Geser untuk melihat lebih banyak</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default Testimony;
