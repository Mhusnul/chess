import board from "../../assets/pion-board.jpg";
import LightRays from "../common/LightRays";
import SplitText from "../common/SplitText";

function Hero() {
  const handleAnimationComplete = () => {
    console.log("All letters have animated!");
  };
  return (
    <div
      id="home"
      className="relative hero min-h-screen max-w-screen overflow-x-hidden text-white pt-7"
      style={{
        backgroundImage: `url(${board})`,
      }}
    >
      <div style={{ width: "100%", height: "600px", position: "relative" }}>
        <LightRays
          raysOrigin="top-center"
          raysColor="#00ffff"
          raysSpeed={1.5}
          lightSpread={0.8}
          rayLength={1.2}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0.1}
          distortion={0.05}
          className="custom-rays"
        />
      </div>

      {/* Bawah Tengah */}
      <div className="absolute left-1/2 transform -translate-x-1/2 z-10 text-center max-w-screen">
        <p className="italic mb-4 text-xl">
          Welcome to the Brain Chess Factory
        </p>
        <SplitText
          text="Dziths Chess Course"
          className="text-2xl md:text-6xl font-semibold text-center"
          delay={100}
          duration={0.6}
          ease="power3.out"
          splitType="chars"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          rootMargin="-100px"
          textAlign="center"
          onLetterAnimationComplete={handleAnimationComplete}
        />
        <div className="w-full h-1 bg-white mx-auto my-4"></div>
        <p className="mt-4">Take a look and be more stronger chess player!</p>
        <p>"Where Every Thought is a Checkmate"</p>
      </div>
    </div>
  );
}

export default Hero;
