import React from "react";
import {
  Play,
  Youtube,
  Instagram,
  BookOpen,
  Video,
  Camera,
} from "lucide-react";
import contentBg from "../../assets/chess-bg2.jpg";
import videoFrame from "../../assets/videoframe_4250.png";

function Content() {
  const contentData = [
    {
      icon: <Youtube size={32} />,
      title: "Video Tutorial Catur",
      description:
        "Pelajari strategi catur melalui video pembelajaran yang interaktif dan mudah dipahami",
      type: "YouTube",
      count: "50+ Video",
    },
    {
      icon: <Instagram size={32} />,
      title: "Konten Instagram",
      description:
        "Tips dan trik catur harian, motivasi, dan behind the scenes kehidupan seorang atlet catur",
      type: "Instagram",
      count: "1000+ Post",
    },
    {
      icon: <BookOpen size={32} />,
      title: "E-Book & Guide",
      description:
        "Panduan lengkap strategi catur dalam format digital yang bisa diakses kapan saja",
      type: "Digital Book",
      count: "12 E-Books",
    },
    {
      icon: <Video size={32} />,
      title: "Live Streaming",
      description:
        "Saksikan pertandingan langsung dan analisis permainan catur secara real-time",
      type: "Live Stream",
      count: "Weekly",
    },
  ];

  return (
    <div
      id="content"
      className="min-h-screen text-white p-6"
      style={{
        backgroundImage: `url(${contentBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Header Section */}
      <div className="text-center mb-12">
        <h2 className="text-5xl font-bold tracking-wider uppercase bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent drop-shadow-lg mb-4">
          Konten Digital
        </h2>
        <p className="text-xl font-light text-gray-200 max-w-3xl mx-auto leading-relaxed">
          Temukan berbagai konten edukatif dan inspiratif seputar dunia catur.
          Dari video tutorial hingga e-book, semua dirancang untuk mengembangkan
          kemampuan bermain catur Anda.
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {/* Featured Video Section */}
        <div className="lg:col-span-2">
          <div className="bg-black/30 backdrop-blur-md rounded-xl p-6 mb-6">
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <Play className="text-white" size={28} />
              Video Unggulan
            </h3>
            <div className="relative rounded-lg overflow-hidden">
              <img
                src={videoFrame}
                alt="Featured Video"
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <button className="bg-white hover:bg-gray-200 transition-colors p-4 rounded-full">
                  <Play fill="black" size={32} />
                </button>
              </div>
            </div>
            <div className="mt-4">
              <h4 className="text-lg font-semibold">
                Strategi Opening Terbaik untuk Pemula
              </h4>
              <p className="text-gray-300 text-sm mt-2">
                Pelajari 5 opening catur terbaik yang wajib dikuasai oleh setiap
                pemula. Video ini akan memandu Anda langkah demi langkah dengan
                penjelasan yang mudah dipahami.
              </p>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-white">50K+</div>
              <div className="text-sm text-gray-300">Subscribers</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-white">2M+</div>
              <div className="text-sm text-gray-300">Views</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-white">100+</div>
              <div className="text-sm text-gray-300">Videos</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-white">15K+</div>
              <div className="text-sm text-gray-300">Followers</div>
            </div>
          </div>
        </div>

        {/* Content Types */}
        <div className="space-y-4">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <Camera className="text-white" size={28} />
            Jenis Konten
          </h3>

          {contentData.map((item, index) => (
            <div
              key={index}
              className="bg-white/20 backdrop-blur-md rounded-xl p-5 hover:bg-white/30 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="text-white flex-shrink-0">{item.icon}</div>
                <div className="flex-1">
                  <h4 className="font-semibold text-lg mb-2">{item.title}</h4>
                  <p className="text-gray-300 text-sm mb-3">
                    {item.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs bg-gray-600/20 text-gray-300 px-2 py-1 rounded-full">
                      {item.type}
                    </span>
                    <span className="text-xs text-gray-400 font-medium">
                      {item.count}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* CTA Button */}
          <div className="mt-8">
            <button className="w-full bg-gradient-to-r from-gray-800 to-black hover:from-gray-700 hover:to-gray-900 transition-all duration-300 text-white font-semibold py-3 px-6 rounded-xl">
              Lihat Semua Konten
            </button>
          </div>
        </div>
      </div>

      {/* Bottom CTA Section */}
      <div className="mt-16 text-center">
        <div className="bg-black/40 backdrop-blur-md rounded-xl p-8 max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold mb-4">
            Ikuti Perjalanan Catur Saya
          </h3>
          <p className="text-gray-300 mb-6 text-lg">
            Jangan lewatkan konten terbaru, tips eksklusif, dan update dari
            dunia catur professional. Bergabunglah dengan komunitas pecinta
            catur yang terus berkembang.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gray-800 hover:bg-gray-700 transition-colors px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2">
              <Youtube className="text-white" size={20} />
              Subscribe YouTube
            </button>
            <button className="bg-gradient-to-r from-gray-800 to-black hover:from-gray-700 hover:to-gray-900 transition-colors px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2">
              <Instagram className="text-white" size={20} />
              Follow Instagram
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Content;
