import coursebg from "../../assets/chess-bg3.jpg";
import logo from "../../assets/logo1.png";
import {
  Home,
  Trophy,
  BookOpen,
  Book,
  PlaySquare,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

function Footer() {
  return (
    <footer
      id="footer"
      style={{ backgroundImage: `url(${coursebg})` }}
      className=" text-white"
    >
      <div className="backdrop-blur-sm py-10 px-5 font-sans">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand & About */}
          <div>
            <h2 className="text-xl font-bold mb-4">Dziths Chess</h2>
            <p className="text-sm leading-relaxed ">
              Tempat belajar catur yang tepat untuk mengasah kemampuan strategis
              dan mental. Bergabunglah dengan kami untuk mengembangkan skill
              catur dari dasar hingga mahir.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Navigate</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="/"
                  className="flex items-center gap-2 hover:text-red-400 transition-colors"
                >
                  <Home size={16} /> Home
                </a>
              </li>
              <li>
                <a
                  href="/class"
                  className="flex items-center gap-2 hover:text-red-400 transition-colors"
                >
                  <PlaySquare size={16} /> Kelas
                </a>
              </li>
              <li>
                <a
                  href="/book"
                  className="flex items-center gap-2 hover:text-red-400 transition-colors"
                >
                  <BookOpen size={16} /> Books
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="flex items-center gap-2 hover:text-red-400 transition-colors"
                >
                  <Phone size={16} /> Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Link */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="/checkout"
                  className="flex items-center gap-2 hover:text-red-400 transition-colors"
                >
                  <BookOpen size={16} /> Checkout
                </a>
              </li>
              <li>
                <a
                  href="https://saweria.co/dzithschess"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-red-400 transition-colors"
                >
                  <Trophy size={16} /> Donasi (Saweria)
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Services</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="/class"
                  className="flex items-center gap-2 hover:text-red-400 transition-colors"
                >
                  <PlaySquare size={16} /> Kelas Catur Online
                </a>
              </li>
              <li>
                <a
                  href="/book"
                  className="flex items-center gap-2 hover:text-red-400 transition-colors"
                >
                  <Book size={16} /> Buku & E-Book Catur
                </a>
              </li>
              <li>
                <span className="flex items-center gap-2 text-gray-300">
                  <PlaySquare size={16} /> Content Digital
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col md:flex-row justify-between text-sm border-t border-gray-700 pt-5">
          <div className="flex items-center gap-2 mb-2 md:mb-0">
            <MapPin size={16} /> Jakarta
          </div>
          <div className="flex items-center gap-2 mb-2 md:mb-0">
            <Phone size={16} />
            <a
              href="https://wa.me/6282340875540"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-400"
            >
              Message Dziths Chess on WhatsApp. https://wa.me/6282340875540
            </a>
          </div>
          <div className="flex items-center gap-2">
            <Mail size={16} /> dziththaulyramadhan@gmail.com
          </div>
        </div>

        {/* Copyright */}
        <div className="bg-black/50 backdrop-blur-md py-4 rounded-lg mt-5">
          <div className="flex items-center justify-center gap-2 mb-2">
            <img src={logo} alt="Dziths Chess" className="h-6 w-auto" />
            <span className="text-sm font-semibold">Dziths Chess</span>
          </div>
          <p className="text-center text-xs">
            &copy; 2023 Dziths Chess. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
