import { Atom, CalendarSync, SmilePlus, BrickWallFire } from "lucide-react";
import course from "../../assets/chess-bg.jpg";
import coursebg from "../../assets/course-bg.jpg";
import RollingGallery from "../common/RollingGallery ";

function Course() {
  return (
    <>
      <h2 className=" m-5 text-center text-3xl font-bold uppercase p-3 bg-white/20 backdrop-blur-md text-white rounded-2xl">
        Chess Course
      </h2>
      <div
        id="course"
        style={{ backgroundImage: `url(${coursebg})`, backgroundSize: "cover" }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 text-white min-h-screen m-5 rounded-2xl"
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
          <RollingGallery autoplay={true} pauseOnHover={true} />
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
            <h4 className="font-bold text-xl mb-2">Sparing</h4>
            <p className="text-sm">
              Bermain dengan pemain dan pelatih profesional untuk meningkatkan
              skill dan mengetahui sejauh mana kamu berkembang
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-black/30 backdrop-blur-md p-6 rounded-xl">
            <SmilePlus strokeWidth={0.75} size={40} className="mb-4" />
            <h4 className="font-bold text-xl mb-2">Bimbingan Langsung</h4>
            <p className="text-sm text-gray-200">
              Dapatkan feedback langsung dari pelatih profesional untuk
              membentuk gaya permainan terbaikmu.
            </p>
          </div>

          {/* Tombol CTA */}
          <div className="col-span-1 md:col-span-2 flex justify-center mt-6">
            <button
              onClick={() => (window.location.href = "/class")}
              className="w-full bg-white font-bold text-lg md:text-2xl uppercase px-4 py-3 min-h-[48px] rounded-2xl font-serif text-black hover:bg-red-600 hover:text-white transition-all duration-300 whitespace-normal leading-tight"
            >
              Bergabung Sekarang
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Course;
