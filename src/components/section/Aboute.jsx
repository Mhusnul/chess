import { Award, Trophy, Target, Zap } from "lucide-react";
import profile from "../../assets/chess-player.jpg";
import profile1 from "../../assets/chess-player1.jpg";
import profile2 from "../../assets/chess-player2.jpg";
import profile3 from "../../assets/chess-player3.jpg";
import coursebg from "../../assets/chess-bg3.jpg";

function About() {
  return (
    <div id="about" className="text-white m-5 rounded-xl overflow-hidden">
      <div className="mb-8 flex items-center gap-4">
        <div className="h-1 flex-1 bg-gradient-to-r from-transparent via-yellow-400 to-yellow-400 rounded-full"></div>
        <h2 className="text-3xl md:text-4xl font-bold uppercase text-white">
          About <span className="text-yellow-400">Dziths Chess Coach</span>
        </h2>
        <div className="h-1 flex-1 bg-gradient-to-l from-transparent via-yellow-400 to-yellow-400 rounded-full"></div>
      </div>

      <div
        className="relative p-8 rounded-2xl overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(0,0,0,0.9)), url(${coursebg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - Photos & Stats */}
          <div className="space-y-6">
            {/* Photo Grid with Hover Effect */}
            <div className="grid grid-cols-2 gap-4">
              {[profile, profile1, profile2, profile3].map((img, index) => (
                <div
                  key={index}
                  className="group relative h-56 rounded-2xl overflow-hidden border-2 border-white/20 hover:border-white/50 transition-all duration-300"
                >
                  <img
                    src={img}
                    alt={`profile-${index}`}
                    className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* Overlay on Hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
                        <span className="text-black font-bold text-sm">
                          CM Dziththauly
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Bio & Achievements */}
          <div className="space-y-6">
            {/* Bio Card */}
            <div className="bg-black/40 backdrop-blur-md border border-white/20 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                  <span className="text-black font-bold text-xl">DZ</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Dziththauly Ramadhan</h3>
                  <p className="text-yellow-400 text-sm font-semibold">
                    Candidate Master (CM)
                  </p>
                </div>
              </div>

              <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent my-4"></div>

              <p className="text-justify text-sm leading-relaxed text-white/90">
                Lahir di Surabaya pada tahun 2002 dan menekuni dunia catur sejak
                usia muda. Banyak prestasi yang sudah saya peroleh di dalam
                dunia catur dan prestasi yang saya raih dalam jangka waktu 4
                tahun terakhir adalah meraih Juara 1 Kejurnas Catur Junior Putra
                A tahun 2021. Pada tahun berikutnya, saya menorehkan prestasi
                internasional dengan meraih gelar di Asian Junior Championship
                2022 di Filipina, serta menambah koleksi medali dengan perunggu
                ASEAN Youth Chess Rapid 2022.
              </p>

              <p className="text-justify text-sm leading-relaxed text-white/90 mt-3">
                Tahun 2024 menjadi salah satu puncak karier saya dengan
                keberhasilan meraih medali emas dan perak pada PON XX di
                Aceh-Sumut, serta tampil gemilang di ASEAN University Games 2024
                dengan koleksi tiga emas dan dua perak. Terbaru, pada POMNAS
                Jateng 2025, saya berhasil menyapu bersih tiga medali emas di
                nomor kilat, cepat, dan klasik beregu.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
