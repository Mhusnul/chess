import React from "react";
import { Medal } from "lucide-react";

const achievements = [
  {
    title: "Juara 1 Kejurnas Catur Kelompok Junior Putra A 2021",
    description:
      "Meraih gelar juara pertama dalam Kejuaraan Nasional Catur Kelompok Junior Putra A tahun 2021.",
  },
  {
    title: "Medali Perunggu Chess Rapid ASEAN Youth Championship 2022",
    description:
      "Mendapatkan medali perunggu pada nomor catur cepat di ajang ASEAN Youth Championship tahun 2022.",
  },
  {
    title: "Medali Emas Catur Cepat Beregu Putra PON 2024",
    description:
      "Membawa tim meraih medali emas dalam kategori catur cepat beregu putra di Pekan Olahraga Nasional (PON) 2024.",
  },
  {
    title: "Medali Perak Catur Klasik Beregu Putra PON 2024",
    description:
      "Berhasil meraih medali perak pada kategori catur klasik beregu putra di PON 2024.",
  },
  {
    title: "Medali Emas Chess Blitz Beregu 21st ASEAN University Games 2024",
    description:
      "Menjuarai nomor catur kilat beregu dalam ASEAN University Games ke-21 tahun 2024.",
  },
  {
    title: "Medali Emas Chess Rapid Beregu 21st ASEAN University Games 2024",
    description:
      "Meraih medali emas pada nomor catur cepat beregu di ASEAN University Games ke-21 tahun 2024.",
  },
  {
    title: "Medali Emas Chess Classic Beregu 21st ASEAN University Games 2024",
    description:
      "Mendapatkan medali emas dalam kategori catur klasik beregu di ASEAN University Games ke-21 tahun 2024.",
  },
  {
    title: "Medali Perak Chess Blitz 21st ASEAN University Games 2024",
    description:
      "Berhasil meraih medali perak pada kategori individu catur kilat di ASEAN University Games ke-21 tahun 2024.",
  },
  {
    title: "Medali Perak Chess Classic 21st ASEAN University Games 2024",
    description:
      "Mendapatkan medali perak pada nomor catur klasik individu di ASEAN University Games ke-21 tahun 2024.",
  },
  {
    title: "Medali Emas Beregu Catur Kilat POMNAS Jateng 2025",
    description:
      "Membawa tim meraih medali emas dalam kategori catur kilat beregu di Pekan Olahraga Mahasiswa Nasional (POMNAS) Jawa Tengah 2025.",
  },
  {
    title: "Medali Emas Beregu Catur Cepat POMNAS Jateng 2025",
    description:
      "Meraih medali emas bersama tim pada nomor catur cepat beregu di POMNAS Jawa Tengah 2025.",
  },
  {
    title: "Medali Emas Beregu Catur Klasik POMNAS Jateng 2025",
    description:
      "Berhasil meraih medali emas pada kategori catur klasik beregu di ajang POMNAS Jawa Tengah 2025.",
  },
];

function AchievementCard({ title, description, bgColor }) {
  return (
    <div
      className={`card w-80 backdrop-blur-sm shadow-md ${bgColor} flex-shrink-0 `}
    >
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p className="text-sm">{description}</p>
        <div className="card-actions justify-end">
          <button className="flex items-center gap-2 hover:underline">
            <Medal strokeWidth={1.5} absoluteStrokeWidth />
          </button>
        </div>
      </div>
    </div>
  );
}

function AchievementGrid() {
  return (
    <div className="w-full py-8">
      {/* Horizontal Scroll Container */}
      <div className="relative">
        <div
          className="flex gap-4 overflow-x-auto pb-4 px-4 scrollbar-hide"
          style={{
            scrollbarWidth: "none" /* Firefox */,
            msOverflowStyle: "none" /* Internet Explorer 10+ */,
          }}
        >
          {achievements.map((item, index) => (
            <AchievementCard
              key={index}
              title={item.title}
              description={item.description}
              bgColor={
                index % 2 === 0
                  ? "bg-[#393E46]/30 text-white"
                  : "bg-white/30 text-black"
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default AchievementGrid;
