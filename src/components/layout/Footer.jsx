import coursebg from "../../assets/chess-bg3.jpg";
import {
  Home,
  Info,
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
            <h2 className="text-xl font-bold mb-4">FulanChess</h2>
            <p className="text-sm leading-relaxed">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad
              praesentium repudiandae exercitationem tempora doloribus qui rem
              quam.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Navigate</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Home size={16} /> Home
              </li>
              <li className="flex items-center gap-2">
                <Info size={16} /> About
              </li>
              <li className="flex items-center gap-2">
                <Trophy size={16} /> Achievements
              </li>
              <li className="flex items-center gap-2">
                <PlaySquare size={16} /> Courses
              </li>
              <li className="flex items-center gap-2">
                <BookOpen size={16} /> Books
              </li>
              <li className="flex items-center gap-2">
                <PlaySquare size={16} /> Content
              </li>
            </ul>
          </div>

          {/* Quick Link */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Phone size={16} /> Contact
              </li>
              <li className="flex items-center gap-2">
                <BookOpen size={16} /> Privacy Policy
              </li>
              <li className="flex items-center gap-2">
                <BookOpen size={16} /> Terms of Service
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Services</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <PlaySquare size={16} /> Online Classes
              </li>
              <li className="flex items-center gap-2">
                <Book size={16} /> Books & Publications
              </li>
              <li className="flex items-center gap-2">
                <PlaySquare size={16} /> Digital Content
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
            <Phone size={16} /> 0982-8723-187
          </div>
          <div className="flex items-center gap-2">
            <Mail size={16} /> email@example.com
          </div>
        </div>

        {/* Copyright */}
        <div className="bg-black/50 backdrop-blur-md py-4 rounded-lg mt-5">
          <p className="text-center text-xs">
            &copy; 2023 HusnulChess. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
