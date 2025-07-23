import Navbar from "../components/layout/Navbar";
import Hero from "../components/section/Hero";
import Achievement from "../components/section/Achievement";
import Aboute from "../components/section/Aboute";
import board from "../assets/chess-bg.jpg";
import Other from "../components/section/Other";

function Home() {
  return (
    <div className="bg-black min-h-screen ">
      <Navbar />
      <Hero />
      <div
        style={{ backgroundImage: `url(${board})`, backgroundSize: "cover" }}
      >
        <Aboute />
        <Achievement />
      </div>
      <Other />
    </div>
  );
}

export default Home;
