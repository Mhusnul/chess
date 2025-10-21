import profile from "../../assets/chess-player.jpg";
import profile1 from "../../assets/chess-player1.jpg";
import profile2 from "../../assets/chess-player2.jpg";
import profile3 from "../../assets/chess-player3.jpg";
import coursebg from "../../assets/chess-bg3.jpg";

function Aboute() {
  return (
    <div id="about" className=" text-white m-5 rounded-xl overflow-hidden">
      <h2 className=" mb-5 text-center text-3xl font-bold uppercase p-3 bg-white/20 backdrop-blur-md">
        About Dziths Chess Coach
      </h2>
      <div
        className="p-5 grid grid-cols-1 md:grid-cols-2 gap-2"
        style={{ backgroundImage: `url(${coursebg})` }}
      >
        <div className="grid grid-cols-2 gap-2">
          <div className="h-56 bg-white/30 backdro p-blur-sm rounded-xl overflow-hidden grid">
            <img
              src={profile}
              alt="profile"
              className="w-full h-full object-cover object-top"
            />
          </div>
          <div className="h-56 bg-white/30 backdro p-blur-sm rounded-xl overflow-hidden grid">
            <img
              src={profile1}
              alt="profile"
              className="w-full h-full object-cover object-top"
            />
          </div>
          <div className="h-56 bg-white/30 backdro p-blur-sm rounded-xl overflow-hidden grid">
            <img
              src={profile2}
              alt="profile"
              className="w-full h-full object-cover object-top"
            />
          </div>
          <div className="h-56 bg-white/30 backdro p-blur-sm rounded-xl overflow-hidden grid">
            <img
              src={profile3}
              alt="profile"
              className="w-full h-full object-cover object-top"
            />
          </div>
        </div>

        <div className="bg-[#393E46]/30 backdrop-blur-sm shadow-md p-4 rounded-xl ">
          <p className=" text-justify mt-5">
            Dziththauly Ramadhan (CM), lahir di Surabaya pada tahun 2002 dan
            menekuni dunia catur sejak usia muda. Banyak prestasi yang sudah
            saya peroleh di dalam dunia catur dan prestasi yang saya raih dalam
            jangka waktu 4 tahun terakhir adalah meraih Juara 1 Kejurnas Catur
            Junior Putra A tahun 2021. Pada tahun berikutnya, saya menorehkan
            prestasi internasional dengan meraih gelar di Asian Junior
            Championship 2022 di Filipina, serta menambah koleksi medali dengan
            perunggu ASEAN Youth Chess Rapid 2022. Tahun 2024 menjadi salah satu
            puncak karier saya dengan keberhasilan meraih medali emas dan perak
            pada PON XX di Aceh-Sumut, serta tampil gemilang di ASEAN University
            Games 2024 dengan koleksi tiga emas dan dua perak di nomor beregu
            maupun individu. Terbaru, pada POMNAS Jateng 2025, saya berhasil
            menyapu bersih tiga medali emas di nomor kilat, cepat, dan klasik
            beregu. Dengan konsistensi prestasi ini, saya terus berkomitmen
            untuk berkembang dan mengharumkan nama Indonesia di kancah
            catur internasional.
          </p>

          <div className="card-actions justify-end"></div>
        </div>
      </div>
    </div>
  );
}

export default Aboute;
