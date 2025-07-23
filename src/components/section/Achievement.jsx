import React from "react";
import { Medal } from "lucide-react";

const achievements = [
  {
    title: "Juara Nasional Catur Pelajar",
    description:
      "Menjadi juara utama dalam kejuaraan nasional antar pelajar dengan performa tanpa kekalahan.",
  },
  {
    title: "Finalis Kejuaraan Catur Mahasiswa Nasional (POMNAS)",
    description:
      "Mewakili kampus dalam ajang paling bergengsi tingkat nasional dan berhasil masuk babak final.",
  },
  {
    title: "Peraih Medali Perak PON Remaja",
    description:
      "Membawa pulang medali perak pada cabang catur cepat dalam Pekan Olahraga Nasional Remaja.",
  },
  {
    title: "Wakil Indonesia di ASEAN University Games",
    description:
      "Dipilih untuk mewakili Indonesia dalam kompetisi catur antar mahasiswa se-Asia Tenggara.",
  },
];

function AchievementCard({ title, description, bgColor }) {
  return (
    <div className={`card w-full  backdrop-blur-sm shadow-md ${bgColor}`}>
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mx-auto p-4 bg-cover bg-center">
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
  );
}

export default AchievementGrid;
