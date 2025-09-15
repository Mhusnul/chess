import React from "react";
import ModernNav from "../components/common/ModernNav";
import Footer from "../components/layout/Footer";
import profile from "../assets/chess-player.jpg";
import { ArrowLeft, Trophy, BookOpen, Users, Star } from "lucide-react";
import AchievementGrid from "../components/section/Achievement";

function About() {
  const skills = [
    { name: "Strategi Pembukaan", level: 95 },
    { name: "Taktik & Kombinasi", level: 90 },
    { name: "Endgame", level: 88 },
    { name: "Analisis Posisi", level: 92 },
    { name: "Pengajaran", level: 96 },
  ];

  const handleBackToHome = () => {
    window.location.pathname = "/";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <ModernNav />

      <div className="pt-20 px-4 pb-12">
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          <button
            onClick={handleBackToHome}
            className="flex items-center gap-2 mb-8 px-4 py-2 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
          >
            <ArrowLeft className="w-5 h-5" />
            Kembali ke Beranda
          </button>

          {/* Hero Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20">
              <h1 className="text-5xl font-bold tracking-wider uppercase bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent drop-shadow-lg mb-6">
                ABOUT ME
              </h1>
              <h2 className="text-3xl font-medium tracking-wide text-gray-100 drop-shadow-md mb-6">
                Muhamad Husnul Maad
              </h2>
              <div className="space-y-4 text-gray-200/90 text-justify">
                <p className="leading-relaxed tracking-wide">
                  Seorang pemain catur berpengalaman dengan dedikasi tinggi
                  dalam mengajarkan strategi dan taktik catur kepada berbagai
                  kalangan. Dengan pengalaman lebih dari 8 tahun di dunia catur,
                  saya telah mengembangkan metode pengajaran yang efektif dan
                  mudah dipahami.
                </p>
                <p className="leading-relaxed tracking-wide">
                  Passion saya terhadap catur dimulai sejak usia muda, dan kini
                  saya bertekad untuk berbagi pengetahuan dan pengalaman kepada
                  generasi baru pecinta catur. Melalui pendekatan yang
                  sistematis dan personal, saya membantu setiap murid mencapai
                  potensi maksimal mereka.
                </p>
                <p className="leading-relaxed tracking-wide">
                  Filosofi mengajar saya adalah "Setiap langkah memiliki makna,
                  setiap permainan adalah pelajaran." Saya percaya bahwa catur
                  bukan hanya permainan, tetapi juga sarana untuk mengembangkan
                  kemampuan berpikir strategis, konsentrasi, dan disiplin.
                </p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-xl overflow-hidden border border-white/20">
              <img
                src={profile}
                alt="Muhamad Husnul Maad"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>

          {/* Achievements Section */}
          <div className="mb-16">
            <AchievementGrid />
          </div>

          {/* Philosophy Section */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-white text-center mb-12">
              Filosofi Mengajar
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 text-center">
                <div className="w-16 h-16 bg-red-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-red-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  Pembelajaran Bertahap
                </h3>
                <p className="text-gray-400 text-sm">
                  Membangun fondasi yang kuat dari dasar hingga tingkat lanjut
                  dengan metode yang terstruktur
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 text-center">
                <div className="w-16 h-16 bg-red-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-red-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  Pendekatan Personal
                </h3>
                <p className="text-gray-400 text-sm">
                  Setiap murid memiliki gaya belajar yang berbeda, saya
                  menyesuaikan metode untuk setiap individu
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 text-center">
                <div className="w-16 h-16 bg-red-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trophy className="w-8 h-8 text-red-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  Orientasi Prestasi
                </h3>
                <p className="text-gray-400 text-sm">
                  Membantu murid mencapai target dan prestasi terbaik mereka
                  dalam kompetisi catur
                </p>
              </div>
            </div>
          </div>

          {/* Contact CTA */}
          <div className="text-center">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20">
              <h2 className="text-3xl font-bold text-white mb-4">
                Siap Belajar Catur Bersama?
              </h2>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Bergabunglah dengan ratusan murid yang telah merasakan
                peningkatan kemampuan catur mereka. Mari mulai perjalanan catur
                Anda hari ini!
              </p>
              <button
                onClick={handleBackToHome}
                className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
              >
                Mulai Belajar Sekarang
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default About;
