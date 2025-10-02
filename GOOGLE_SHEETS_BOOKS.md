# Google Sheets Books Integration

## Setup Google Sheets untuk Data Buku

### Format CSV yang Diharapkan

Aplikasi akan membaca data dari Google Sheets dalam format CSV dengan kolom-kolom berikut:

#### Kolom yang Diperlukan (Minimal):

- `title` - Judul buku (wajib)
- `price` - Harga buku (bisa "0" atau "Rp 0" untuk coming soon)
- `category` - Kategori buku
- `cover` - URL cover buku (bisa kosong)

#### Kolom Opsional (Akan diisi otomatis jika kosong):

- `id` - ID unik buku (auto-generated)
- `author` - Nama penulis (default: "Author Coming Soon")
- `description` - Deskripsi buku (default deskripsi umum)
- `pages` - Jumlah halaman (default: "200")
- `language` - Bahasa buku (default: "Indonesia")
- `rating` - Rating buku (default: "4.5")

### Contoh Format di Google Sheets (Struktur Sederhana):

```
title,price,category,cover
Strategi Pembukaan Catur,150000,Strategi,https://drive.google.com/file/d/1ABCDEFGhijk123/view
Taktik & Kombinasi Catur,120000,Taktik,https://drive.google.com/file/d/1XYZ789mnop456/view
Endgame Mastery,0,Endgame,
Psikologi Catur,200000,Psikologi,https://drive.google.com/open?id=1QWERTYuiop789
```

**Hasilnya di aplikasi:**

- ✅ **Cover otomatis muncul** dari halaman pertama PDF
- ✅ **Responsive dan optimal** untuk mobile & desktop
- ✅ **Loading placeholder** saat gambar sedang dimuat
- ✅ **Fallback** ke icon BookOpen jika gagal load

### Link Google Sheets yang Digunakan:

https://docs.google.com/spreadsheets/d/e/2PACX-1vTNib4sX059YjhaWyavQysuVLKAnLvIXj10C3mD0ELC3PVq_wDjnDkB4OCbvYLs1vTco1Dqo-XHcAPA/pubhtml?gid=0&single=true

### Catatan Penting:

1. **Cover buku bisa dikosongkan** - Akan menampilkan placeholder icon BookOpen
2. **Cover dari Google Drive PDF** - Bisa menggunakan link Google Drive langsung (akan dikonversi otomatis ke thumbnail)
3. **Harga "0" atau "Rp 0"** - Akan menampilkan "Harga Coming Soon" dan tombol disabled
4. **Format harga** - Angka saja tanpa simbol Rp (contoh: 150000 bukan Rp 150.000)
5. **Kategori yang tersedia**: Strategi, Taktik, Endgame, Psikologi, Sejarah, Analisis, General
6. **Google Sheets harus di-publish** sebagai CSV untuk dapat diakses aplikasi
7. **Field kosong akan diisi otomatis** dengan default values yang sesuai
8. **Error handling** - Jika gagal load data, akan menampilkan pesan error
9. **Loading state** - Aplikasi menampilkan loading saat mengambil data

### 🔥 **CARA MENGGUNAKAN COVER DARI E-BOOK GOOGLE DRIVE:**

#### **Langkah-langkah:**

1. **Buka file PDF e-book** di Google Drive
2. **Klik kanan** pada file → **Get link** / **Dapatkan link**
3. **Set permission** ke "Anyone with the link" / "Siapa saja dengan link"
4. **Copy link** yang didapat
5. **Paste langsung** ke kolom `cover` di Google Sheets

#### **Contoh Link Google Drive:**

```
https://drive.google.com/file/d/1ABCDEFGhijklmnop123456789/view?usp=sharing
```

#### **Aplikasi Otomatis Akan:**

- ✅ **Extract File ID** dari link Google Drive
- ✅ **Convert ke thumbnail** format yang optimal untuk cover
- ✅ **Resize ke 400x600px** untuk performa terbaik
- ✅ **Handle berbagai format** Google Drive link

#### **Format Link yang Didukung:**

- ✅ `https://drive.google.com/file/d/FILE_ID/view`
- ✅ `https://drive.google.com/open?id=FILE_ID`
- ✅ `https://drive.google.com/file/d/FILE_ID/view?usp=sharing`
- ✅ URL gambar langsung dari internet
- ✅ Kosong (akan tampil placeholder BookOpen)

### Cara Update Data:

1. Edit Google Sheets langsung
2. Data akan otomatis ter-update di aplikasi saat page di-refresh
3. Tidak perlu republish jika sudah di-set ke public

### Fitur yang Didukung:

- ✅ Auto-load dari Google Sheets
- ✅ Cover placeholder jika kosong
- ✅ Error handling dan loading states
- ✅ Search dan filter berdasarkan data sheets
- ✅ Add to cart dengan data sheets
- ✅ Responsive design
