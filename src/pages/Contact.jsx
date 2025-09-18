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
} from "lucide-react";
import courseBg from "../assets/chess-bg2.jpg";

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
  const { showToast, ToastComponent } = useToast();

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setIsSubmitted(true);
      showToast(
        "Pesan berhasil dikirim! Kami akan segera menghubungi Anda.",
        "success"
      );

      // Reset form
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

  // Go back to previous page
  const goBack = () => {
    window.history.back();
  };

  return (
    <>
      <div className="bg-black font-serif min-h-screen">
        <ModernNav />

        {/* Hero Section */}
        <div
          style={{
            backgroundImage: `url(${courseBg})`,
            backgroundSize: "cover",
          }}
          className="relative min-h-[50vh] flex items-center justify-center"
        >
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="relative z-10 text-center text-white px-4">
            <h1 className="text-5xl font-bold mb-4 mt-12">Hubungi Kami</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Ada pertanyaan tentang kelas catur atau buku? Kami siap membantu
              Anda. Jangan ragu untuk menghubungi kami kapan saja.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          <ToastComponent />

          {/* Back Button */}
          <button
            onClick={goBack}
            className="mb-6 flex items-center space-x-2 text-white/80 hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Kembali</span>
          </button>

          {/* Contact Info & Form Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div className="bg-black/50 backdrop-blur-md rounded-xl p-8 border border-white/20">
                <h2 className="text-3xl font-bold text-white mb-6">
                  Informasi Kontak
                </h2>

                <div className="space-y-6">
                  {/* Email */}
                  <div className="flex items-start space-x-4">
                    <div className="bg-red-600 p-3 rounded-lg">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">
                        Email
                      </h3>
                      <p className="text-gray-300">info@fulanchess.com</p>
                      <p className="text-gray-300">support@fulanchess.com</p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start space-x-4">
                    <div className="bg-red-600 p-3 rounded-lg">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">
                        Telepon
                      </h3>
                      <p className="text-gray-300">+62 21 1234 5678</p>
                      <p className="text-gray-300">
                        +62 812 3456 7890 (WhatsApp)
                      </p>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="flex items-start space-x-4">
                    <div className="bg-red-600 p-3 rounded-lg">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">
                        Alamat
                      </h3>
                      <p className="text-gray-300">
                        Jl. Catur Raya No. 123
                        <br />
                        Jakarta Selatan 12345
                        <br />
                        Indonesia
                      </p>
                    </div>
                  </div>

                  {/* Business Hours */}
                  <div className="flex items-start space-x-4">
                    <div className="bg-red-600 p-3 rounded-lg">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">
                        Jam Operasional
                      </h3>
                      <p className="text-gray-300">
                        Senin - Jumat: 09:00 - 18:00
                      </p>
                      <p className="text-gray-300">Sabtu: 09:00 - 15:00</p>
                      <p className="text-gray-300">Minggu: Tutup</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQ Section */}
              <div className="bg-black/50 backdrop-blur-md rounded-xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold text-white mb-6">
                  Pertanyaan Umum
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-yellow-400 mb-2">
                      Bagaimana cara mendaftar kelas?
                    </h4>
                    <p className="text-gray-300 text-sm">
                      Anda dapat mendaftar kelas melalui halaman Kelas, pilih
                      kelas yang diinginkan dan klik "Daftar Kelas".
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-yellow-400 mb-2">
                      Apakah ada trial class?
                    </h4>
                    <p className="text-gray-300 text-sm">
                      Ya, kami menyediakan trial class gratis untuk pemula.
                      Silakan hubungi kami untuk jadwal trial.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-yellow-400 mb-2">
                      Bagaimana metode pembayaran?
                    </h4>
                    <p className="text-gray-300 text-sm">
                      Kami menerima pembayaran melalui transfer bank, e-wallet,
                      dan pembayaran tunai.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-black/50 backdrop-blur-md rounded-xl p-8 border border-white/20">
              <h2 className="text-3xl font-bold text-white mb-6">
                Kirim Pesan
              </h2>

              {isSubmitted ? (
                <div className="text-center py-8">
                  <div className="bg-green-600 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Pesan Terkirim!
                  </h3>
                  <p className="text-gray-300 mb-6">
                    Terima kasih atas pesan Anda. Kami akan menghubungi Anda
                    segera.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Kirim Pesan Lain
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Nama Lengkap *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-red-500 transition-colors"
                        placeholder="Masukkan nama lengkap Anda"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Email *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-red-500 transition-colors"
                        placeholder="contoh@email.com"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Nomor Telepon
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-red-500 transition-colors"
                        placeholder="+62 812 3456 7890"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Subjek *
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-red-500 transition-colors"
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

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Pesan *
                    </label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-3 text-white/60 w-5 h-5" />
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows="4"
                        className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-red-500 transition-colors resize-none"
                        placeholder="Tulis pesan Anda di sini..."
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-600/50 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
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

          {/* Map Section */}
          <div className="bg-black/50 backdrop-blur-md rounded-xl p-8">
            <h2 className="text-3xl font-bold text-white mb-6 text-center">
              Lokasi Kami
            </h2>
            <div className="bg-gray-800 rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1015127.3947614729!2d106.15840715280285!3d-6.349826533092082!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69ec45b619cb31%3A0x1c835056ba51ca21!2sJabodetabek!5e0!3m2!1sid!2sid!4v1758004680898!5m2!1sid!2sid"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Lokasi Kami - Jabodetabek"
              />
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}

export default Contact;
