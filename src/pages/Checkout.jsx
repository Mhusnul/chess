import React, { useState } from "react";
import useCartStore from "../store/cartStore";
import bookBg from "../assets/book-bg.jpg";
import courseBg from "../assets/course-bg.jpg";
import ModernNav from "../components/common/ModernNav";
import Footer from "../components/layout/Footer";
import { Plus, Minus, Trash2 } from "lucide-react";

const Checkout = () => {
  const { items, getTotalPrice, clearCart, updateQuantity, removeFromCart } =
    useCartStore();

  const [currentStep, setCurrentStep] = useState(1); // 1: Form, 2: Payment, 3: Success
  const [customerData, setCustomerData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    notes: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [paymentProof, setPaymentProof] = useState(null);

  // Handle quantity changes
  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
    } else {
      updateQuantity(itemId, newQuantity);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setCurrentStep(2); // Pindah ke step pembayaran
  };

  const handlePaymentProof = (e) => {
    const file = e.target.files[0];
    setPaymentProof(file);
  };

  const handleFinalSubmit = async () => {
    setIsLoading(true);

    try {
      // Generate Order ID
      const orderId = `ORD-${Date.now()}-${Math.random()
        .toString(36)
        .substr(2, 4)
        .toUpperCase()}`;

      // Prepare data for Google Sheets
      const orderData = {
        orderId: orderId,
        customerName: customerData.name,
        email: customerData.email,
        phone: customerData.phone,
        address: customerData.address,
        city: "", // Bisa diextract dari alamat jika diperlukan
        postalCode: "", // Bisa diextract dari alamat jika diperlukan
        notes: customerData.notes,
        totalAmount: getTotalPrice(),
        status: "Pending Payment",
        items: items.map((item) => ({
          title: item.title,
          quantity: item.quantity,
          price: item.price,
          subtotal: item.price * item.quantity,
        })),
      };

      // Send data to Google Sheets
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbzU69q4AULRx0GdPX9298xLFKvN1dkQqskhJJaMSrQfY00Z8Z8vWAEVw0F0BtQ5W7Uo/exec",
        {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        }
      );

      // Buat pesan WhatsApp
      const orderDetails = items
        .map(
          (item, index) =>
            `${index + 1}. ${item.title} - ${item.quantity}x - Rp ${(
              item.price * item.quantity
            ).toLocaleString("id-ID")}`
        )
        .join("\n");

      const message = encodeURIComponent(
        `*PESANAN*\n\n` +
          `Order ID: ${orderId}\n` +
          `Nama: ${customerData.name}\n` +
          `Email: ${customerData.email}\n` +
          `HP: ${customerData.phone}\n` +
          `Alamat: ${customerData.address}\n\n` +
          `*DETAIL PESANAN:*\n${orderDetails}\n\n` +
          `*Total: Rp ${getTotalPrice().toLocaleString("id-ID")}*\n\n` +
          `Bukti pembayaran sudah dikirim.\n` +
          (customerData.notes ? `Catatan: ${customerData.notes}\n\n` : "") +
          `Terima kasih!`
      );

      // Buka WhatsApp dengan deteksi device dan fallback
      const whatsappNumber = "6285337735757"; // Nomor WA bisnis yang baru

      // Deteksi apakah user menggunakan mobile device
      const isMobile =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        );

      if (isMobile) {
        // Untuk mobile, coba buka aplikasi langsung dengan URL scheme
        const mobileUrl = `whatsapp://send?phone=${whatsappNumber}&text=${message}`;
        const webUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

        // Coba buka aplikasi, jika gagal fallback ke web
        window.location.href = mobileUrl;

        // Fallback ke web setelah delay singkat jika aplikasi tidak terbuka
        setTimeout(() => {
          window.open(webUrl, "_blank");
        }, 1000);
      } else {
        // Untuk desktop, langsung ke WhatsApp Web
        window.open(
          `https://wa.me/${whatsappNumber}?text=${message}`,
          "_blank"
        );
      } // Clear cart dan pindah ke success
      clearCart();
      setCurrentStep(3);
    } catch (error) {
      console.error("Error submitting order:", error);
      alert("Terjadi kesalahan saat menyimpan pesanan. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  const goBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      window.history.back();
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Jika cart kosong
  if (items.length === 0 && currentStep !== 3) {
    return (
      <>
        <ModernNav />
        <div
          className="min-h-screen text-white flex items-center justify-center pt-20"
          style={{
            backgroundImage: `url(${bookBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="bg-black/70 backdrop-blur-md rounded-xl p-8 text-center max-w-md border border-white/20">
            <h2 className="text-2xl font-bold mb-4 text-white">Cart Kosong</h2>
            <p className="mb-6 text-white/80">Belum ada item di cart Anda</p>
            <button
              onClick={goBack}
              className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
            >
              Kembali Belanja
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // Step 3: Success Page
  if (currentStep === 3) {
    return (
      <>
        <ModernNav />
        <div
          className="min-h-screen text-white flex items-center justify-center pt-20"
          style={{
            backgroundImage: `url(${bookBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="bg-black/70 backdrop-blur-md rounded-xl p-8 text-center max-w-md border border-white/20">
            <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-black"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-4 text-white">
              Pesanan Berhasil!
            </h2>
            <p className="mb-6 text-white/80">
              Terima kasih! Pesanan Anda sudah dikirim ke WhatsApp. Kami akan
              segera memproses pesanan Anda.
            </p>
            <button
              onClick={() => (window.location.href = "/")}
              className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
            >
              Kembali ke Beranda
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

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
            <h1 className="text-5xl font-bold mb-4 mt-12">
              Checkout Pembelian
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Selesaikan pembelian Anda dengan mudah dan aman. Ikuti
              langkah-langkah di bawah ini.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-4 py-12">
          {/* Header dengan Progress */}
          <div className="mb-8">
            <button
              onClick={goBack}
              className="flex items-center text-white/80 hover:text-white mb-6 transition-colors"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                ></path>
              </svg>
              Kembali
            </button>

            <div className="bg-black/30 backdrop-blur-md rounded-xl p-6 mb-6 border border-white/20">
              <h1 className="text-3xl font-bold mb-4 text-white">Checkout</h1>

              {/* Progress Bar */}
              <div className="flex items-center space-x-4">
                <div
                  className={`flex items-center space-x-2 ${
                    currentStep >= 1 ? "text-white" : "text-white/50"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      currentStep >= 1
                        ? "bg-yellow-400 text-black"
                        : "bg-white/20"
                    }`}
                  >
                    1
                  </div>
                  <span className="font-medium">Data Pelanggan</span>
                </div>
                <div className="flex-1 h-1 bg-white/20 rounded">
                  <div
                    className={`h-full bg-yellow-400 rounded transition-all duration-300 ${
                      currentStep >= 2 ? "w-full" : "w-0"
                    }`}
                  ></div>
                </div>
                <div
                  className={`flex items-center space-x-2 ${
                    currentStep >= 2 ? "text-white" : "text-white/50"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      currentStep >= 2
                        ? "bg-yellow-400 text-black"
                        : "bg-white/20"
                    }`}
                  >
                    2
                  </div>
                  <span className="font-medium">Pembayaran</span>
                </div>
                <div className="flex-1 h-1 bg-white/20 rounded">
                  <div
                    className={`h-full bg-yellow-400 rounded transition-all duration-300 ${
                      currentStep >= 3 ? "w-full" : "w-0"
                    }`}
                  ></div>
                </div>
                <div
                  className={`flex items-center space-x-2 ${
                    currentStep >= 3 ? "text-white" : "text-white/50"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      currentStep >= 3
                        ? "bg-yellow-400 text-black"
                        : "bg-white/20"
                    }`}
                  >
                    3
                  </div>
                  <span className="font-medium">Selesai</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Side - Form/Payment */}
            <div className="space-y-6">
              {currentStep === 1 && (
                /* Step 1: Customer Form */
                <div className="bg-black/70 backdrop-blur-md rounded-xl p-6 border border-white/20">
                  <h2 className="text-xl font-semibold mb-6 text-white">
                    Data Pelanggan
                  </h2>

                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium mb-2 text-white"
                      >
                        Nama Lengkap *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={customerData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-black/50 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                        placeholder="Masukkan nama lengkap"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium mb-2 text-white"
                      >
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={customerData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-black/50 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                        placeholder="email@example.com"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium mb-2 text-white"
                      >
                        Nomor WhatsApp *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={customerData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-black/50 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                        placeholder="08xxxxxxxxxx"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="address"
                        className="block text-sm font-medium mb-2 text-white"
                      >
                        Alamat Lengkap *
                      </label>
                      <textarea
                        id="address"
                        name="address"
                        value={customerData.address}
                        onChange={handleInputChange}
                        required
                        rows="3"
                        className="w-full px-4 py-3 bg-black/50 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                        placeholder="Jalan, Kecamatan, Kabupaten/Kota, Provinsi, Kode Pos"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="notes"
                        className="block text-sm font-medium mb-2 text-white"
                      >
                        Catatan (Opsional)
                      </label>
                      <textarea
                        id="notes"
                        name="notes"
                        value={customerData.notes}
                        onChange={handleInputChange}
                        rows="2"
                        className="w-full px-4 py-3 bg-black/50 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                        placeholder="Catatan tambahan untuk pesanan"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-yellow-400 text-black py-3 px-4 rounded-lg hover:bg-yellow-300 transition-all duration-300 font-semibold"
                    >
                      Lanjut ke Pembayaran
                    </button>
                  </form>
                </div>
              )}

              {currentStep === 2 && (
                /* Step 2: Payment */
                <div className="bg-black/70 backdrop-blur-md rounded-xl p-6 border border-white/20">
                  <h2 className="text-xl font-semibold mb-6 text-white">
                    Pembayaran
                  </h2>

                  {/* QRIS Payment */}
                  <div className="text-center mb-6">
                    <div className="bg-white p-4 rounded-lg inline-block mb-4">
                      {/* QR Code Placeholder - Replace with actual QR code */}
                      <div className="w-48 h-48 bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
                        QR CODE QRIS
                        <br />
                        (Tambahkan QR Code disini)
                      </div>
                    </div>
                    <p className="text-white/80 mb-2">
                      Scan QR Code untuk pembayaran
                    </p>
                    <p className="text-yellow-400 font-bold text-xl">
                      Total: {formatPrice(getTotalPrice())}
                    </p>
                  </div>

                  {/* Upload Bukti Pembayaran */}
                  <div className="mb-6">
                    <label
                      htmlFor="payment-proof"
                      className="block text-sm font-medium mb-2 text-white"
                    >
                      Upload Bukti Pembayaran *
                    </label>
                    <input
                      type="file"
                      id="payment-proof"
                      accept="image/*"
                      onChange={handlePaymentProof}
                      required
                      className="w-full px-4 py-3 bg-black/50 border border-white/30 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-yellow-400 file:text-black file:font-medium hover:file:bg-yellow-300"
                    />
                    {paymentProof && (
                      <p className="text-green-400 text-sm mt-2">
                        ✓ File terpilih: {paymentProof.name}
                      </p>
                    )}
                  </div>

                  <button
                    onClick={handleFinalSubmit}
                    disabled={!paymentProof || isLoading}
                    className="w-full bg-yellow-400 text-black py-3 px-4 rounded-lg hover:bg-yellow-300 disabled:bg-gray-500 disabled:cursor-not-allowed transition-all duration-300 font-semibold"
                  >
                    {isLoading ? "Memproses..." : "Konfirmasi Pesanan"}
                  </button>
                </div>
              )}
            </div>

            {/* Right Side - Order Summary */}
            <div className="bg-black/70 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <h2 className="text-xl font-semibold mb-6 text-white">
                Ringkasan Pesanan
              </h2>

              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center space-x-4 py-3 border-b border-white/20"
                  >
                    <img
                      src={item.img || "/placeholder-book.jpg"}
                      alt={item.title}
                      className="w-16 h-20 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-white">{item.title}</h3>
                      <p className="text-sm text-white/70 mb-2">
                        {item.author && `oleh ${item.author}`}
                      </p>

                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="text-sm text-white/70">Jumlah:</span>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() =>
                              handleQuantityChange(item.id, item.quantity - 1)
                            }
                            className="w-8 h-8 bg-red-600 hover:bg-red-700 text-white rounded-full flex items-center justify-center transition-colors"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="text-white font-medium w-8 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              handleQuantityChange(item.id, item.quantity + 1)
                            }
                            className="w-8 h-8 bg-red-600 hover:bg-red-700 text-white rounded-full flex items-center justify-center transition-colors"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="w-8 h-8 bg-gray-600 hover:bg-gray-700 text-white rounded-full flex items-center justify-center transition-colors ml-2"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      <p className="text-sm font-medium text-yellow-400">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/20 pt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white/80">Subtotal:</span>
                  <span className="font-medium text-white">
                    {formatPrice(getTotalPrice())}
                  </span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white/80">Ongkir:</span>
                  <span className="font-medium text-white">Gratis</span>
                </div>
                <div className="flex justify-between items-center text-lg font-bold text-yellow-400 border-t border-white/20 pt-2">
                  <span>Total:</span>
                  <span>{formatPrice(getTotalPrice())}</span>
                </div>
              </div>

              {/* Customer Info Preview (Step 2) */}
              {currentStep === 2 && (
                <div className="mt-6 border-t border-white/20 pt-4">
                  <h3 className="font-semibold mb-3 text-white">
                    Data Pelanggan:
                  </h3>
                  <div className="text-sm space-y-1 text-white/80">
                    <p>
                      <strong className="text-white">Nama:</strong>{" "}
                      {customerData.name}
                    </p>
                    <p>
                      <strong className="text-white">Email:</strong>{" "}
                      {customerData.email}
                    </p>
                    <p>
                      <strong className="text-white">HP:</strong>{" "}
                      {customerData.phone}
                    </p>
                    <p>
                      <strong className="text-white">Alamat:</strong>{" "}
                      {customerData.address}
                    </p>
                    {customerData.notes && (
                      <p>
                        <strong className="text-white">Catatan:</strong>{" "}
                        {customerData.notes}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Checkout;
