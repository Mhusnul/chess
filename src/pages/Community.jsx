import ModernNav from "../components/common/ModernNav";
import Footer from "../components/layout/Footer";
import Cart from "../components/common/Cart";
import {
  MessageCircle,
  Users,
  ExternalLink,
  Globe,
  Newspaper,
  Crown,
  Zap,
} from "lucide-react";
import chessBg3 from "../assets/card-comunity.jpg";
import coursebg from "../assets/bg-chess-comunity.jpg";

function Community() {
  // Community data
  const communityItems = [
    {
      id: 1,
      title: "Chess.com Club",
      description:
        "Bergabunglah dengan klub catur online kami di Chess.com. Main bareng, ikuti turnamen, dan tingkatkan skill catur kamu bersama member lainnya.",
      icon: Crown,
      link: "https://www.chess.com/club/dziths-chess-1",
      type: "chess-club",
      status: "Active",
      members: "50+ Members",
      features: [
        "Turnamen Rutin",
        "Diskusi Strategi",
        "Rating Games",
        "Chess Puzzles",
      ],
    },
    {
      id: 2,
      title: "brosur turnamen catur",
      description:
        "Ikuti saluran WhatsApp kami untuk mendapatkan update terbaru, tips catur harian, dan informasi event terkini.",
      icon: MessageCircle,
      link: "https://whatsapp.com/channel/0029VbAL9SMJ93wX9FPAFR2R",
      type: "whatsapp-channel",
      status: "Active",
      members: "100+ Subscribers",
      features: ["Update Harian", "Tips & Tricks", "Event Info", "Chess News"],
    },
    {
      id: 3,
      title: "Discord Server",
      description:
        "Komunitas Discord untuk diskusi real-time, voice chat saat bermain, dan berbagi pengalaman dengan sesama pecinta catur.",
      icon: MessageCircle,
      link: "#",
      type: "discord",
      status: "Coming Soon",
      members: "Soon",
      features: [
        "Voice Chat",
        "Real-time Discussion",
        "Game Sessions",
        "Study Groups",
      ],
    },
    {
      id: 4,
      title: "chess comunity by whatsapp",
      description:
        "Dapatkan berita catur terkini, analisis pertandingan GM, dan update dunia catur internasional langsung di WhatsApp.",
      icon: Newspaper,
      link: "#",
      type: "whatsapp-news",
      status: "Coming Soon",
      members: "Soon",
      features: [
        "Berita Harian",
        "Analisis GM",
        "Tournament Updates",
        "Chess History",
      ],
    },
  ];

  // Get card background style - same for all cards
  const getCardBackground = () => {
    return {
      backgroundImage: `url(${chessBg3})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    };
  };

  // Get card classes - same for all cards
  const getCardClasses = () => {
    return "group bg-black/70 backdrop-blur-xl rounded-2xl border border-white/10 shadow-xl overflow-hidden transition-all duration-300 hover:transform hover:scale-[1.02] hover:border-white/20 hover:shadow-2xl relative";
  };

  // Get status badge color
  const getStatusColor = (status) => {
    return status === "Active"
      ? "bg-green-500/90 text-white"
      : "bg-yellow-500/90 text-black";
  };

  // Handle link click
  const handleLinkClick = (link, type) => {
    if (link === "#") {
      alert("Coming Soon! Fitur ini akan segera hadir.");
      return;
    }
    window.open(link, "_blank");
  };

  return (
    <div className="bg-black font-serif min-h-screen overflow-x-hidden">
      <ModernNav />

      {/* Hero Section */}
      <div
        style={{
          backgroundImage: `url(${coursebg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="relative min-h-[60vh] flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black"></div>
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight animate-fade-in">
            Komunitas Catur
          </h1>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed animate-fade-in-up">
            Bergabunglah dengan komunitas catur kami! Temukan teman bermain,
            diskusi strategi, ikuti turnamen, dan dapatkan update terbaru dari
            dunia catur.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Community Info */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            Pilih Platform Komunitas
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Kami hadir di berbagai platform untuk memudahkan kamu terhubung
            dengan sesama pecinta catur. Pilih platform favoritmu!
          </p>
        </div>

        {/* Community Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {communityItems.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                className={getCardClasses()}
                style={getCardBackground()}
              >
                {/* Background overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-black/80"></div>

                {/* Card Header */}
                <div className="p-6 border-b border-white/10 relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-yellow-600 rounded-xl">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-white group-hover:text-yellow-400 transition-colors">
                          {item.title}
                        </h4>
                        <p className="text-sm text-gray-400">{item.members}</p>
                      </div>
                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                        item.status
                      )}`}
                    >
                      {item.status}
                    </span>
                  </div>

                  <p className="text-white/80 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Card Content */}
                <div className="p-6 relative z-10">
                  {/* Features */}
                  <div className="mb-6">
                    <h5 className="text-white font-semibold mb-3 flex items-center gap-2">
                      <Zap className="w-4 h-4 text-yellow-400" />
                      Fitur Utama
                    </h5>
                    <div className="grid grid-cols-2 gap-2">
                      {item.features.map((feature, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 text-sm text-white/70"
                        >
                          <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={() => handleLinkClick(item.link, item.type)}
                    disabled={item.status === "Coming Soon"}
                    className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                      item.status === "Active"
                        ? "bg-gradient-to-r from-white to-gray-200 hover:from-gray-200 hover:to-gray-300 text-black transform hover:scale-105"
                        : "bg-gray-600 text-gray-300 cursor-not-allowed opacity-75"
                    }`}
                  >
                    {item.status === "Active" ? (
                      <>
                        <ExternalLink className="w-5 h-5" />
                        Bergabung Sekarang
                      </>
                    ) : (
                      <>
                        <Users className="w-5 h-5" />
                        Coming Soon
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <div className="bg-black/50 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <h3 className="text-xl font-bold text-white mb-3">
              Ada Pertanyaan?
            </h3>
            <p className="text-gray-400 mb-4">
              Jika ada pertanyaan tentang komunitas atau butuh bantuan
              bergabung, jangan ragu untuk menghubungi kami.
            </p>
            <button
              onClick={() =>
                window.open("https://wa.me/6285337735757", "_blank")
              }
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 mx-auto"
            >
              <MessageCircle className="w-5 h-5" />
              Hubungi Admin
            </button>
          </div>
        </div>
      </div>

      <Footer />
      <Cart />
    </div>
  );
}

export default Community;
