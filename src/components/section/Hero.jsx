import board from "../../assets/pion-board.jpg";
import LightRays from "../common/LightRays";
import SplitText from "../common/SplitText";
import { Trophy, Target, Zap } from "lucide-react";

function Hero() {
  const handleAnimationComplete = () => {
    console.log("All letters have animated!");
  };

  const features = [
    {
      icon: <Trophy className="w-5 h-5" />,
      text: "Professional Coach",
    },
    {
      icon: <Target className="w-5 h-5" />,
      text: "Proven Methods",
    },
    {
      icon: <Zap className="w-5 h-5" />,
      text: "Fast Results",
    },
  ];

  return (
    <div
      id="home"
      className="relative hero min-h-screen max-w-screen overflow-x-hidden text-white"
      style={{
        backgroundImage: `url(${board})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 w-full h-full z-10">
        <LightRays
          raysOrigin="top-center"
          raysColor="#fbbf24"
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

      {/* Main Content - Tata Letak Seperti Awal */}
      <div className="absolute left-1/2 transform -translate-x-1/2 z-20 text-center max-w-screen top-1/2 -translate-y-1/2 px-4">
        <p className="italic mb-4 text-lg sm:text-xl">
          Welcome to the Brain Chess Factory
        </p>

        <SplitText
          text="Dziths Chess Course"
          className="text-2xl sm:text-4xl md:text-6xl font-semibold text-center"
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

        <p className="mt-4 text-sm sm:text-base">
          Take a look and be more stronger chess player!
        </p>
        <p className="text-sm sm:text-base mb-6">
          "Where Every Thought is a Checkmate"
        </p>

        {/* Feature Badges - Tambahan */}
        <div className="flex flex-wrap justify-center gap-3 mt-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-black/40 backdrop-blur-md border border-white/30 rounded-full px-4 py-2 flex items-center gap-2 hover:bg-black/60 hover:border-yellow-400/50 transition-all duration-300 hover:transform hover:scale-105"
            >
              <div className="text-yellow-400">{feature.icon}</div>
              <span className="text-sm font-semibold">{feature.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Hero;
