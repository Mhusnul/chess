import coverbook1 from "../../assets/cover-book1.jpg";
import coverbook2 from "../../assets/cover-book2.jpg";
import coverbook3 from "../../assets/cover-book3.jpg";
import bookbg from "../../assets/book-bg.jpg";
import coverbook4 from "../../assets/cover-book4.jpg";
import coverbook5 from "../../assets/cover-book5.jpg";
import coverbook6 from "../../assets/cover-book6.jpg";

function Book() {
  return (
    <div className="text-white font-serif">
      <h1 className="text-center font-bold my-5 text-3xl">Top 3 Book</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-5">
        <div className="bg-white/30 backdrop-blur-md max-h-[40vh] overflow-hidden rounded-xl flex justify-between items-center">
          <div className="p-5">
            <h3 className=" font-light text-2xl">Be a Game Changer</h3>
            <p className="font-light text-sm my-3">
              Buku inspiratif yang mendorong kamu untuk berani tampil beda dan
              menciptakan perubahan positif dalam hidup maupun kariermu.
            </p>
            <button className="mt-2 bg-white text-black px-3 py-2 flex gap-2 rounded">
              Beli Sekarang
            </button>
          </div>
          <img src={coverbook1} alt="" className="h-full p-3" />
        </div>

        <div className="bg-black/30 backdrop-blur-md max-h-[40vh] overflow-hidden rounded-xl flex justify-between items-center">
          <div className="p-5">
            <h3 className=" font-light text-2xl">Mindset Is Everything</h3>
            <p className="font-light text-sm my-3">
              Temukan kekuatan pola pikir dalam meraih kesuksesan. Buku ini
              membantumu membentuk cara pandang yang lebih produktif dan penuh
              harapan.
            </p>
            <button className="mt-2 bg-white text-black px-3 py-2 flex gap-2 rounded">
              Beli Sekarang
            </button>
          </div>
          <img src={coverbook2} alt="" className="h-full p-3" />
        </div>

        <div className="bg-white/30 backdrop-blur-md max-h-[40vh] overflow-hidden rounded-xl flex justify-between items-center">
          <div className="p-5">
            <h3 className=" font-light text-2xl">Focus On The Best</h3>
            <p className="font-light text-sm my-3">
              Pelajari cara memfokuskan energi dan perhatian hanya pada hal-hal
              terbaik dalam hidupmu, demi hasil yang maksimal dan lebih
              bermakna.
            </p>
            <button className="mt-2 bg-white text-black px-3 py-2 flex gap-2 rounded">
              Beli Sekarang
            </button>
          </div>
          <img src={coverbook3} alt="" className="h-full p-3" />
        </div>
      </div>

      <div
        style={{
          backgroundImage: `url(${bookbg})`,
          backgroundSize: "cover",
          backgroundPosition: "bottom",
        }}
        className=" bg-white h-64 my-5 mx-3 text-center flex flex-col justify-center items-center rounded-xl"
      >
        <p>Lebih Hemat untuk Buku Terbaikmu</p>
        <h3 className="text-5xl my-3">Diskon 20% untuk Buku Pilihan</h3>
        <button className="mt-2 bg-white text-black px-3 py-2 flex gap-2 rounded">
          Beli Sekarang
        </button>
      </div>

      <div className="flex flex-wrap gap-3 justify-around px-5 ">
        <div className="card bg-neutral w-44 shadow-sm">
          <figure className="h-64 overflow-hidden">
            <img src={coverbook1} alt="Shoes" />
          </figure>
          <div className="card-body text-center">
            <h2 className="card-title">Be a Game Changer</h2>
            <p className="text-red-600">Rp 150.000</p>
            <button className="mt-2 bg-white text-black px-3 py-2 rounded">
              Beli Sekarang
            </button>
          </div>
        </div>

        <div className="card bg-neutral w-44 shadow-sm">
          <figure className="h-64 overflow-hidden">
            <img src={coverbook2} alt="Shoes" />
          </figure>
          <div className="card-body text-center">
            <h2 className="card-title">Mindset Is Everything</h2>
            <p className="text-red-600">Rp 170.000</p>
            <button className="mt-2 bg-white text-black px-3 py-2 rounded">
              Beli Sekarang
            </button>
          </div>
        </div>

        <div className="card bg-neutral w-44 shadow-sm">
          <figure className="h-64 overflow-hidden">
            <img src={coverbook3} alt="Shoes" />
          </figure>
          <div className="card-body text-center">
            <h2 className="card-title">Focus On The Best</h2>
            <p className="text-red-600">Rp 130.000</p>
            <button className="mt-2 bg-white text-black px-3 py-2 rounded">
              Beli Sekarang
            </button>
          </div>
        </div>

        <div className="card bg-neutral w-44 shadow-sm">
          <figure className="h-64 overflow-hidden">
            <img src={coverbook4} alt="Shoes" />
          </figure>
          <div className="card-body text-center">
            <h2 className="card-title">World Chess Day</h2>
            <p className="text-red-600">Rp 180.000</p>
            <button className="mt-2 bg-white text-black px-3 py-2 rounded">
              Beli Sekarang
            </button>
          </div>
        </div>

        <div className="card bg-neutral w-44 shadow-sm">
          <figure className="h-64 overflow-hidden">
            <img src={coverbook5} alt="Shoes" />
          </figure>
          <div className="card-body text-center">
            <h2 className="card-title">Halls Checkmate</h2>
            <p className="text-red-600">Rp 190.000</p>
            <button className="mt-2 bg-white text-black px-3 py-2 rounded">
              Beli Sekarang
            </button>
          </div>
        </div>

        <div className="card bg-neutral w-44 shadow-sm">
          <figure className="h-64 overflow-hidden">
            <img src={coverbook6} alt="Shoes" />
          </figure>
          <div className="card-body text-center">
            <h2 className="card-title">Chess Game</h2>
            <p className="text-red-600">Rp 150.000</p>
            <button className="mt-2 bg-white text-black px-3 py-2 rounded">
              Beli Sekarang
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Book;
