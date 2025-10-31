import React, { useState } from "react";
import ModernNav from "../components/common/ModernNav";
import Footer from "../components/layout/Footer";
import useToast from "../hooks/useToast.jsx";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  User,
  MessageSquare,
  ArrowLeft,
  CheckCircle,
  ChevronDown,
} from "lucide-react";
import courseBg from "../assets/chess-bg2.jpg";
import Content from "../components/section/Content.jsx";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);
  const { showToast, ToastComponent } = useToast();

  // FAQ Data
  const faqData = [
    {
      question: "Bagaimana cara mendaftar kelas?",
      answer:
        'Anda dapat mendaftar kelas melalui halaman Kelas, pilih kelas yang diinginkan dan klik "Daftar Kelas".',
    },
    {
      question: "Apakah ada trial class?",
      answer:
        "Ya, kami menyediakan trial class gratis untuk pemula. Silakan hubungi kami untuk jadwal trial.",
    },
    {
      question: "Bagaimana metode pembayaran?",
      answer:
        "Kami menerima pembayaran melalui transfer bank, e-wallet, dan pembayaran tunai.",
    },
  ];

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Toggle FAQ
  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!formData.name || !formData.message) {
        showToast("Harap isi nama dan pesan terlebih dahulu", "error");
        setIsSubmitting(false);
        return;
      }

      const waMessage = encodeURIComponent(
        `*PESAN DARI WEBSITE*\n\n` +
          `Nama: ${formData.name}\n` +
          `Email: ${formData.email}\n` +
          `Telepon: ${formData.phone}\n` +
          `Subjek: ${formData.subject}\n\n` +
          `Pesan:\n${formData.message}`
      );

      const whatsappNumber = "6282340875540";
      const isMobile =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        );

      if (isMobile) {
        const mobileUrl = `whatsapp://send?phone=${whatsappNumber}&text=${waMessage}`;
        const webUrl = `https://wa.me/${whatsappNumber}?text=${waMessage}`;

        window.location.href = mobileUrl;
        setTimeout(() => {
          window.open(webUrl, "_blank");
        }, 1000);
      } else {
        window.open(
          `https://wa.me/${whatsappNumber}?text=${waMessage}`,
          "_blank"
        );
      }

      setIsSubmitted(true);
      showToast("Pesan berhasil dikirim ke WhatsApp!", "success");

      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      showToast("Gagal mengirim pesan. Silakan coba lagi.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const goBack = () => {
    window.history.back();
  };

  return (
    <div className="bg-black font-serif min-h-screen">
      <ModernNav />

      {/* Hero Section */}
      <div
        className="relative min-h-[60vh] flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `url(${courseBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black"></div>
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight animate-fade-in">
            Hubungi Kami
          </h1>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed animate-fade-in-up">
            Ada pertanyaan tentang kelas catur atau buku? Kami siap membantu
            Anda. Jangan ragu untuk menghubungi kami kapan saja.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <ToastComponent />

        {/* Back Button */}
        <button
          onClick={goBack}
          className="mb-8 group flex items-center space-x-2 text-white/80 hover:text-white transition-all duration-300"
        >
          <ArrowLeft
            size={20}
            className="group-hover:-translate-x-1 transition-transform"
          />
          <span>Kembali</span>
        </button>

        {/* Contact Info & Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-black/80 to-black/40 backdrop-blur-xl rounded-2xl p-8 border border-white/10 shadow-xl transition-all duration-300 hover:border-white/20">
              <h2 className="text-3xl font-bold text-white mb-8">
                Informasi Kontak
              </h2>

              <div className="space-y-8">
                {/* Email */}
                <div className="transform hover:translate-x-2 transition-all duration-300">
                  <div className="flex items-start space-x-4">
                    <div className="bg-gradient-to-br from-red-600 to-red-700 p-3 rounded-xl shadow-lg">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">
                        Email
                      </h3>
                      <p className="text-gray-300">
                        dziththaulyramadhan@gmail.com
                      </p>
                    </div>
                  </div>
                </div>

                {/* Phone */}
                <div className="transform hover:translate-x-2 transition-all duration-300">
                  <div className="flex items-start space-x-4">
                    <div className="bg-gradient-to-br from-red-600 to-red-700 p-3 rounded-xl shadow-lg">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">
                        Telepon
                      </h3>
                      <p className="text-gray-300">
                        <a
                          href="https://wa.me/6282340875540"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-yellow-400"
                        >
                          Message Dziths Chess on WhatsApp.
                          https://wa.me/6282340875540
                        </a>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="transform hover:translate-x-2 transition-all duration-300">
                  <div className="flex items-start space-x-4">
                    <div className="bg-gradient-to-br from-red-600 to-red-700 p-3 rounded-xl shadow-lg">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">
                        Jam Operasional
                      </h3>
                      <p className="text-gray-300">
                        Senin - Jumat: 09:00 - 18:00
                      </p>
                      <p className="text-gray-300">Sabtu - Minggu: Tutup</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-gradient-to-br from-black/80 to-black/40 backdrop-blur-xl rounded-2xl p-8 border border-white/10 shadow-xl">
              <h3 className="text-2xl font-bold text-white mb-6">
                Pertanyaan Umum
              </h3>
              <div className="space-y-4">
                {faqData.map((faq, index) => (
                  <div
                    key={index}
                    className="border border-white/10 rounded-xl overflow-hidden transition-all duration-300"
                  >
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full p-4 flex justify-between items-center text-left hover:bg-white/5 transition-colors"
                    >
                      <span className="font-semibold text-yellow-400">
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-white transition-transform duration-300 ${
                          activeFaq === index ? "transform rotate-180" : ""
                        }`}
                      />
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        activeFaq === index ? "max-h-40" : "max-h-0"
                      }`}
                    >
                      <p className="p-4 text-gray-300 text-sm border-t border-white/10">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gradient-to-br from-black/80 to-black/40 backdrop-blur-xl rounded-2xl p-8 border border-white/10 shadow-xl">
            <h2 className="text-3xl font-bold text-white mb-8">Kirim Pesan</h2>

            {isSubmitted ? (
              <div className="text-center py-12">
                <div className="bg-gradient-to-br from-green-500 to-green-600 p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center animate-bounce">
                  <CheckCircle className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">
                  Pesan Terkirim!
                </h3>
                <p className="text-gray-300 mb-8">
                  Terima kasih atas pesan Anda. Kami akan menghubungi Anda
                  segera.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                >
                  Kirim Pesan Lain
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Form fields */}
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Nama Lengkap *
                  </label>
                  <div className="relative group">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5 transition-colors group-hover:text-white" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all duration-300"
                      placeholder="Masukkan nama lengkap Anda"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Email *
                  </label>
                  <div className="relative group">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5 transition-colors group-hover:text-white" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all duration-300"
                      placeholder="contoh@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Nomor Telepon
                  </label>
                  <div className="relative group">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5 transition-colors group-hover:text-white" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all duration-300"
                      placeholder="+62 812 3456 7890"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Subjek *
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all duration-300"
                  >
                    <option value="" className="bg-black">
                      Pilih subjek
                    </option>
                    <option value="kelas" className="bg-black">
                      Pertanyaan tentang Kelas
                    </option>
                    <option value="buku" className="bg-black">
                      Pertanyaan tentang Buku
                    </option>
                    <option value="pembayaran" className="bg-black">
                      Masalah Pembayaran
                    </option>
                    <option value="kerjasama" className="bg-black">
                      Kerjasama
                    </option>
                    <option value="lainnya" className="bg-black">
                      Lainnya
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Pesan *
                  </label>
                  <div className="relative group">
                    <MessageSquare className="absolute left-3 top-3 text-white/60 w-5 h-5 transition-colors group-hover:text-white" />
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows="4"
                      className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all duration-300 resize-none"
                      placeholder="Tulis pesan Anda di sini..."
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 disabled:from-red-600/50 disabled:to-red-700/50 text-white py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Mengirim...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Kirim Pesan</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        <Content />

        {/* Map Section */}
        <div className="bg-gradient-to-br from-black/80 to-black/40 backdrop-blur-xl rounded-2xl p-8 border border-white/10 shadow-xl overflow-hidden">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Lokasi Kami
          </h2>
          <div className="rounded-xl overflow-hidden border border-white/10 shadow-2xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1015127.3947614729!2d106.15840715280285!3d-6.349826533092082!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69ec45b619cb31%3A0x1c835056ba51ca21!2sJabodetabek!5e0!3m2!1sid!2sid!4v1758004680898!5m2!1sid!2sid"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Lokasi Kami - Jabodetabek"
              className="grayscale hover:grayscale-0 transition-all duration-500"
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Contact;
