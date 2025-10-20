import chessbg2 from "../../assets/chess-bg2.jpg";
import { CircleArrowOutUpRight } from "lucide-react";
import TextType from "../common/TextType";

function Other() {
  return (
    <div className="text-white p-5">
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="overflow-hidden rounded-xl h-80">
          <img
            src={chessbg2}
            alt="profile"
            className="object-cover w-full h-full rounded-xl"
          />
        </div>

        {/* Tentang Saya */}
        <div className=" gap-3">
          <div className="bg-white/30 backdrop-blur-sm p-4 rounded-lg h-80">
            <h2 className="text-lg font-bold mb-2">E-Book</h2>
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
      </div>
    </div>
  );
}

export default Other;
