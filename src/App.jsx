import Home from "./pages/Home";
import Class from "./pages/Class";
import Book from "./pages/Book";
import Checkout from "./pages/Checkout";
import Contact from "./pages/Contact";
import Community from "./pages/Community";
import WhatsAppFloat from "./components/common/WhatsAppFloat";
import { SpeedInsights } from "@vercel/speed-insights/react";

function App() {
  // Simple routing based on URL path
  const currentPath = window.location.pathname;

  return (
    <>
      {currentPath === "/class" || currentPath === "/kelas" ? (
        <Class />
      ) : currentPath === "/book" || currentPath === "/books" ? (
        <Book />
      ) : currentPath === "/checkout" ? (
        <Checkout />
      ) : currentPath === "/contact" || currentPath === "/kontak" ? (
        <Contact />
      ) : currentPath === "/community" || currentPath === "/komunitas" ? (
        <Community />
      ) : (
        <Home />
      )}

      {/* WhatsApp Float Button - appears on all pages */}
      <WhatsAppFloat />
      <SpeedInsights />
    </>
  );
}

export default App;
