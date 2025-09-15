import board from "../../assets/pion-board.png";
import ScrollVelocity from "../common/ScrollVelocity";
import TextCursor from "../common/TextCursor";

function Hero() {
  return (
    <div
      id="home"
      className="relative hero min-h-screen max-w-screen overflow-x-hidden text-white pt-7"
      style={{
        backgroundImage: `url(${board})`,
      }}
    >
      {/* Kiri Atas */}
      <div className="absolute top-10 left-4 z-10">
        <p className="text-sm md:text-base w-3xs font-light">
          Saya Muhammad Husnul atlet catur, penulis, dan kreator konten. Mari
          kita buka langkah pertama menuju strategi, disiplin, dan inspirasi.
        </p>
      </div>

      {/* Kanan Bawah */}
      <div className="absolute bottom-40 md:top-10 right-4 z-10">
        <p className="text-sm md:text-base w-3xs text-right font-light">
          Atlet catur profesional & kreator konten. Membuka dunia strategi lewat
          buku, video, dan komunitas.
        </p>
      </div>

      {/* Bawah Tengah */}
      <div className="absolute bottom-15 left-1/2 transform -translate-x-1/2 z-10 text-center max-w-screen">
        <ScrollVelocity
          texts={["Muhamad Husnul", "Chess Player"]}
          velocity={50}
          className="custom-scroll-text"
        />
      </div>
    </div>
  );
}

export default Hero;
