import React from "react";
import { CircleArrowOutUpRight } from "lucide-react";

const achievements = [
  {
    title: "Juara Nasional Catur 2022",
    description:
      "Menjuarai kejuaraan nasional tingkat SMA se-Indonesia dengan rekor tanpa kalah.",
  },
  {
    title: "Content Creator Catur",
    description:
      "Membangun komunitas pecinta catur di TikTok & YouTube dengan jutaan penonton.",
  },
  {
    title: "Buku 'Langkah Strategis'",
    description:
      "Menulis buku catur populer untuk pemula hingga menengah, terjual lebih dari 10.000 eksemplar.",
  },
  {
    title: "Perwakilan ASEAN Games",
    description:
      "Mewakili Indonesia di kejuaraan tingkat Asia Tenggara pada usia 18 tahun.",
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
            Learn More <CircleArrowOutUpRight size={18} strokeWidth={1.5} />
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
