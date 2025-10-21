import {
  Play,
  Youtube,
  Instagram,
  BookOpen,
  Video,
  Camera,
  Twitch,
} from "lucide-react";
import coursebg from "../../assets/chess-bg.jpg";
import contentBg from "../../assets/chess-bg2.jpg";

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
        "Saksikan pertandingan langsung dan analisis permainan catur secara real-time di Twitch",
      type: "Live Stream",
      count: "Weekly",
    },
  ];

  return (
    <div id="content" className="text-white p-5 mt-5 ">
      {/* Main Content Grid */}
      <div
        style={{
          backgroundImage: `url(${coursebg})`,
          backgroundSize: "cover",
        }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto rounded-2xl"
      >
        {/* Featured Video Section */}
        <div className="lg:col-span-2">
          <div className="rounded-xl p-6 mb-6">
            {/* Embed YouTube */}
            <div className="relative rounded-lg overflow-hidden aspect-video">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/GqHo3jUQ1Eo?si=RVTLsYZEwgJEKjZK"
                title="YouTube video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="mt-4">
              <h4 className="text-lg font-semibold">
                Tonton Konten-konten Menarik Lainnya!
              </h4>
              <p className="text-gray-300 text-sm mt-2">
                Banyak video-video menarik lainnya loh! Kunjungi akun youtube
                coach untuk cek lebih banyak!
              </p>
                        
            </div>
          </div>
        </div>

        {/* Content Types */}
        <div className="space-y-4 p-5">
          {contentData.map((item, index) => (
            <div
              key={index}
              className="bg-white/20 backdrop-blur-md rounded-xl p-5 hover:bg-white/30 transition-all duration-300 text-black"
            >
              <div className="flex items-start gap-4">
                <div className=" flex-shrink-0">{item.icon}</div>
                <div className="flex-1">
                  <h4 className="font-semibold text-lg mb-2">{item.title}</h4>
                  <p className=" text-sm mb-3">{item.description}</p>
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
        </div>
      </div>

      {/* Bottom CTA Section */}
      <div className=" my-5 text-center">
        <div
          className="bg-black/40 backdrop-blur-md rounded-xl p-8 max-w-4xl mx-auto"
          style={{
            backgroundImage: `url(${contentBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <h3 className="text-3xl font-bold mb-4">
            Ikuti Perjalanan Catur Dziths
          </h3>
          <p className="text-gray-300 mb-6 text-lg">
            Jangan lewatkan konten terbaru, live streaming, tips eksklusif, dan
            update dari dunia catur professional. Bergabunglah dengan komunitas
            pecinta catur yang terus berkembang di berbagai platform.
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 justify-center">
            <a
              href="https://www.youtube.com/@dzithschess"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-red-600 hover:bg-red-700 transition-colors px-4 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 text-white no-underline"
            >
              <Youtube size={20} />
              <span className="hidden sm:inline">YouTube</span>
            </a>
            <a
              href="https://www.instagram.com/dziths_?igsh=bzl6bWJkdnp3dTJm"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-colors px-4 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 text-white no-underline"
            >
              <Instagram size={20} />
              <span className="hidden sm:inline">Instagram</span>
            </a>
            <a
              href="https://www.twitch.tv/cmdziths"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-purple-600 hover:bg-purple-700 transition-colors px-4 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 text-white no-underline"
            >
              <Twitch size={20} />
              <span className="hidden sm:inline">Twitch</span>
            </a>
            <a
              href="https://www.tiktok.com/@dziths?is_from_webapp=1&sender_device=pc"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black hover:bg-gray-800 transition-colors px-4 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 text-white no-underline"
            >
              <Video size={20} />
              <span className="hidden sm:inline">TikTok</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Content;
