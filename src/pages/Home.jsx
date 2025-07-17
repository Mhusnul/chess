import Navbar from "../components/layout/Navbar";
import Hero from "../components/section/Hero";
import Achievement from "../components/section/Achievement";
import Aboute from "../components/section/Aboute";

function Home() {
  return (
    <div className="bg-black min-h-screen p-5">
      <Navbar />
      <Hero />
      <Achievement />
      <Aboute />
    </div>
  );
}

export default Home;
