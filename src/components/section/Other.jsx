import React from "react";
import chessbg2 from "../../assets/chess-bg2.jpg";
import chessbg3 from "../../assets/chess-bg3.jpg";
import { CircleArrowOutUpRight } from "lucide-react";
import TextType from "../common/TextType";

function Other() {
  return (
    <div className="text-white p-5 min-h-screen">
      <div className="text-center mb-5 font-bold uppercase text-3xl font-serif">
        <TextType
          text={[
            "Mari Kenal Lebih Dekat",
            "Dengan Saya",
            "Muhamad Husnul Maad!",
          ]}
          typingSpeed={100}
          pauseDuration={1500}
          showCursor={true}
          cursorCharacter="|"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 min-h-screen">
        {/* Foto Kiri */}
        <div className="overflow-hidden rounded-xl h-80">
          <img
            src={chessbg2}
            alt="profile"
            className="object-cover w-full h-full rounded-xl"
          />
        </div>

        {/* Tentang Saya */}
        <div className="grid gap-3 h-full">
          <div className="bg-[#393E46]/30 backdrop-blur-sm p-4 rounded-lg">
            <h2 className="text-lg font-bold mb-2">Kelas Online</h2>
            <p className="text-sm leading-relaxed">
              Bergabunglah dalam kelas online saya yang dirancang untuk semua
              level dari pemula hingga pemain berpengalaman. Materi meliputi
              strategi pembukaan, taktik jitu, dan simulasi pertandingan
              interaktif. Akses kelas kapan saja, di mana saja.
            </p>
            <div className="card-actions justify-end">
              <button className="flex items-center gap-2 hover:underline text-red-500 hover:text-red-700 transition-colors">
                Learn More <CircleArrowOutUpRight size={18} strokeWidth={1.5} />
              </button>
            </div>
          </div>

          <div className="bg-white/30 backdrop-blur-sm p-4 rounded-lg">
            <h2 className="text-lg font-bold mb-2">Karya & Buku</h2>
            <p className="text-sm leading-relaxed">
              Saya telah menulis buku berjudul{" "}
              <span className="font-semibold">“Langkah Strategis”</span> yang
              membahas taktik catur dan pengembangan mental melalui permainan.
              Buku ini tersedia dalam bentuk fisik maupun digital.
            </p>
            <div className="card-actions justify-end">
              <button className="flex items-center gap-2 hover:underline text-red-500 hover:text-red-700 transition-colors">
                Learn More <CircleArrowOutUpRight size={18} strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>

        {/* Konten Digital */}
        <div className="grid gap-3 h-full">
          <div className="bg-[#393E46]/30 backdrop-blur-sm p-4 rounded-lg">
            <h2 className="text-lg font-bold mb-2">Konten Digital</h2>
            <p className="text-sm leading-relaxed">
              Saya aktif membuat video edukasi dan hiburan tentang catur di
              TikTok dan YouTube, dengan total jutaan views. Konten saya fokus
              pada pembelajaran yang menyenangkan dan menghibur.
            </p>
            <div className="card-actions justify-end">
              <button className="flex items-center gap-2 hover:underline text-red-500 hover:text-red-700 transition-colors">
                Learn More <CircleArrowOutUpRight size={18} strokeWidth={1.5} />
              </button>
            </div>
          </div>
          <div className="bg-white/30 backdrop-blur-sm p-4 rounded-lg">
            <h2 className="text-lg font-bold mb-2">Misi Saya</h2>
            <p className="text-sm leading-relaxed">
              Menyebarkan semangat berpikir strategis, kedisiplinan, dan
              ketekunan melalui permainan catur. Saya ingin menjadikan catur
              sebagai gaya hidup positif bagi generasi muda.
            </p>
            <div className="card-actions justify-end">
              <button className="flex items-center gap-2 hover:underline text-red-500 hover:text-red-700 transition-colors">
                Learn More <CircleArrowOutUpRight size={18} strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>

        {/* Foto Kanan */}
        <div className="overflow-hidden rounded-xl h-80">
          <img
            src={chessbg3}
            alt="profile"
            className="object-cover w-full h-full rounded-xl"
          />
        </div>
      </div>
    </div>
  );
}

export default Other;
