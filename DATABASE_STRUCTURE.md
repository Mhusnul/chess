# 📊 Database Structure untuk Google Sheets Books

## ✅ **Struktur Database Final**

### **Urutan Kolom yang Benar:**

```
title | deskripsi | bahasa | price | category | cover
```

### **Contoh Data di Google Sheets:**

```csv
title,deskripsi,bahasa,price,category,cover
Strategi Pembukaan Catur,Panduan lengkap untuk menguasai berbagai strategi pembukaan dalam permainan catur,Indonesia,150000,Strategi,https://drive.google.com/file/d/12SAH5nj4dje0SpqskfuFevk7ERRsKqh9/view
Taktik Catur Mahir,Kumpulan taktik jitu dan kombinasi brilian untuk meningkatkan skill bermain catur,Indonesia,120000,Taktik,https://www.google.com/url?q=https://drive.google.com/file/d/1XYZ789/view
Endgame Master Class,Teknik-teknik advanced untuk menguasai permainan akhir catur,English,200000,Endgame,
Psikologi Bermain Catur,Memahami aspek mental dan psikologi dalam kompetisi catur,Indonesia,0,Psikologi,https://drive.google.com/file/d/1ABC123/view
```

## 🔧 **Field Mapping & Processing**

### **Primary Fields (Sesuai Database):**

- ✅ **`title`** → Judul buku
- ✅ **`deskripsi`** → Deskripsi lengkap buku
- ✅ **`bahasa`** → Bahasa buku (Indonesia/English/dll)
- ✅ **`price`** → Harga (angka saja, 0 untuk coming soon)
- ✅ **`category`** → Kategori (Strategi/Taktik/Endgame/dll)
- ✅ **`cover`** → URL cover (support Google Drive & redirects)

### **Auto-Generated Fields:**

- 🔄 **`author`** → Default: "Author Coming Soon"
- 🔄 **`id`** → Auto-increment dari index
- 🔄 **`rating`** → Default: "4.5"
- 🔄 **`stock`** → Default: "1"

## 🌐 **Google Drive Cover Support**

### **Format Link yang Didukung:**

1. **Direct Google Drive:**

   ```
   https://drive.google.com/file/d/FILE_ID/view
   ```

2. **Google Redirect URLs:**

   ```
   https://www.google.com/url?q=https://drive.google.com/file/d/FILE_ID/view?usp%3Ddrive_link&sa=D&source=editors&ust=XXX&usg=XXX
   ```

3. **Old Format:**
   ```
   https://drive.google.com/open?id=FILE_ID
   ```

### **Auto-Processing:**

- ✅ **Decode redirect URLs** secara otomatis
- ✅ **Extract File ID** dari berbagai format
- ✅ **Convert ke thumbnail** format optimal
- ✅ **Final format**: `https://drive.google.com/thumbnail?id=FILE_ID&sz=w400-h600`

## 🎨 **Card Display Features**

### **Book Section Cards:**

- 📚 **Category badge** - Red dengan emoji
- 🌐 **Language badge** - Blue dengan emoji
- 📄 **Format badge** - Green dengan emoji
- 💰 **Smart pricing** - Yellow untuk harga, Gray untuk "Coming Soon"

### **Book Page Cards:**

- 🌐 **Language info** dengan emoji
- 📄 **Format info** dengan emoji
- 🏢 **Publisher info** (jika ada)
- 💾 **File size info** (jika ada)

## 🚀 **Contoh Implementasi**

### **Di Google Sheets Anda:**

```csv
title,deskripsi,bahasa,price,category,cover
Strategi Pembukaan Catur,Panduan lengkap strategi pembukaan untuk pemula hingga mahir yang ingin menguasai permainan catur dengan baik,Indonesia,150000,Strategi,https://www.google.com/url?q=https://drive.google.com/file/d/12SAH5nj4dje0SpqskfuFevk7ERRsKqh9/view?usp%3Ddrive_link&sa=D&source=editors&ust=1760786960915691&usg=AOvVaw3igwuK-eO0EC3y3lz8mArT
```

### **Hasil di Aplikasi:**

- ✅ **Title**: "Strategi Pembukaan Catur"
- ✅ **Description**: "Panduan lengkap strategi..."
- ✅ **Language Badge**: 🌐 Indonesia
- ✅ **Category Badge**: 📚 Strategi
- ✅ **Price**: Rp 150.000
- ✅ **Cover**: Thumbnail dari Google Drive

## 🔍 **Debug & Monitoring**

### **Console Logs untuk Debugging:**

- 📊 **Headers found** - Melihat kolom yang terdeteksi
- 📝 **Total rows** - Jumlah data yang ditemukan
- 📖 **Processing book** - Detail setiap buku yang diproses
- 🔗 **URL processing** - Test konversi Google Drive URLs
- 📚 **Books loaded** - Konfirmasi data berhasil dimuat

### **Cara Melihat Debug:**

1. **Buka Browser Console** (F12 → Console)
2. **Refresh halaman** untuk trigger data loading
3. **Lihat log dengan emoji** untuk monitor proses

Aplikasi sekarang siap dengan struktur database yang sesuai! 🎯✨
