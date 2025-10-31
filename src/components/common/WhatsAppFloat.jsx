import React from "react";
import { MessageCircle } from "lucide-react";

const WhatsAppFloat = () => {
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      "Message Dziths Chess on WhatsApp. https://wa.me/6282340875540"
    );

    const whatsappNumber = "6282340875540";
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );

    if (isMobile) {
      // Untuk mobile, coba buka aplikasi langsung
      const mobileUrl = `whatsapp://send?phone=${whatsappNumber}&text=${message}`;
      const webUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

      window.location.href = mobileUrl;

      // Fallback ke web setelah delay singkat
      setTimeout(() => {
        window.open(webUrl, "_blank");
      }, 1000);
    } else {
      // Untuk desktop, langsung ke WhatsApp Web
      window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");
    }
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 z-50 hover:scale-110 animate-pulse"
      title="Chat WhatsApp"
    >
      <MessageCircle size={24} />
    </button>
  );
};

export default WhatsAppFloat;
