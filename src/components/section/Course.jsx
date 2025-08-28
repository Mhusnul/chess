import React from "react";
import {
  Atom,
  CalendarSync,
  SmilePlus,
  BrickWallFire,
} from "lucide-react";
import course from "../../assets/chess-bg.jpg";
import coursebg from "../../assets/course-bg.jpg";

function Course() {
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
          <button 
            onClick={() => window.location.href = '/class'}
            className="w-full bg-black/30 backdrop-blur-3xl font-bold text-2xl uppercase h-12 rounded-2xl font-serif hover:bg-black/50 transition-all duration-300"
          >
            Bergabung Sekarang
          </button>
        </div>
      </div>
    </div>
  );
}

export default Course;
