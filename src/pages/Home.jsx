import ModernNav from "../components/common/ModernNav";
import Hero from "../components/section/Hero";
import Achievement from "../components/section/Achievement";
import Aboute from "../components/section/Aboute";
import board from "../assets/chess-bg.jpg";
import Course from "../components/section/Course";
import Testimony from "../components/section/Testimony";
import Content from "../components/section/Content";
import Footer from "../components/layout/Footer";
import Cart from "../components/common/Cart";

function Home() {
  return (
    <div className="font-serif bg-black overflow-x-hidden w-full">
      <ModernNav />
      <Hero />
      <Aboute />
      <div className="m-5 mb-8 flex items-center gap-4">
        <div className="h-1 flex-1 bg-gradient-to-r from-transparent via-yellow-400 to-yellow-400 rounded-full"></div>
        <h2 className="text-3xl md:text-4xl font-bold uppercase text-white whitespace-nowrap">
          <span className="text-yellow-400">Achievement</span>
        </h2>
        <div className="h-1 flex-1 bg-gradient-to-l from-transparent via-yellow-400 to-yellow-400 rounded-full"></div>
      </div>
      <div
        className="m-5 rounded-2xl"
        style={{ backgroundImage: `url(${board})`, backgroundSize: "cover" }}
      >
        <Achievement />
      </div>
      <Course />
      {/* <Testimony /> */}
      <Content />
      <Footer />
      <Cart />
    </div>
  );
}

export default Home;
