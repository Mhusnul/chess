import ModernNav from "../components/common/ModernNav";
import Hero from "../components/section/Hero";
import Achievement from "../components/section/Achievement";
import Aboute from "../components/section/Aboute";
import board from "../assets/chess-bg.jpg";
import Course from "../components/section/Course";
import Content from "../components/section/Content";
import Footer from "../components/layout/Footer";
import Cart from "../components/common/Cart";

function Home() {
  return (
    <div className=" font-serif bg-black">
      <ModernNav />
      <Hero />
      <Aboute />
      <h2 className="text-white m-5 text-center text-3xl font-bold uppercase p-3 bg-[#141717] rounded-2xl">
        achievement
      </h2>
      <div
        className="m-5 rounded-2xl"
        style={{ backgroundImage: `url(${board})`, backgroundSize: "cover" }}
      >
        <Achievement />
      </div>
      <Course />
      <Content />
      <Footer />
      <Cart />
    </div>
  );
}

export default Home;
