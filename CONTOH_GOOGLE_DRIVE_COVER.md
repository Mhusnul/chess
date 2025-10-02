# Contoh Implementasi Cover Google Drive

## Langkah-Langkah Detail:

### 1. Persiapkan E-book PDF di Google Drive

- Upload file PDF e-book Anda ke Google Drive
- Pastikan PDF memiliki cover/halaman pertama yang menarik

### 2. Dapatkan Shareable Link

1. **Klik kanan** pada file PDF di Google Drive
2. **Pilih "Share" / "Bagikan"**
3. **Klik "Copy link" / "Salin link"**
4. **Pastikan akses diset ke "Anyone with the link"**

### 3. Contoh Link yang Akan Didapat:

```
https://drive.google.com/file/d/1BxA2KcD3eF4gH5iJ6kL7mN8oP9qR0sT1u/view?usp=sharing
```

### 4. Paste ke Google Sheets

Masukkan link tersebut langsung ke kolom `cover` di Google Sheets:

```csv
title,price,category,cover
Strategi Pembukaan Catur,150000,Strategi,https://drive.google.com/file/d/1BxA2KcD3eF4gH5iJ6kL7mN8oP9qR0sT1u/view?usp=sharing
```

### 5. Aplikasi Akan Otomatis:

- Extract File ID: `1BxA2KcD3eF4gH5iJ6kL7mN8oP9qR0sT1u`
- Convert ke: `https://drive.google.com/thumbnail?id=1BxA2KcD3eF4gH5iJ6kL7mN8oP9qR0sT1u&sz=w400-h600`
- Menampilkan thumbnail halaman pertama PDF sebagai cover

## Tips & Troubleshooting:

### ✅ **Yang Harus Dilakukan:**

- Pastikan file PDF bisa diakses public (Anyone with the link)
- Gunakan link share Google Drive yang asli
- PDF harus memiliki halaman pertama yang bisa di-preview

### ❌ **Yang Harus Dihindari:**

- Jangan gunakan link download langsung
- Jangan gunakan PDF yang private/restricted
- Jangan gunakan link yang sudah expire

### 🔧 **Jika Cover Tidak Muncul:**

1. **Cek permission** file di Google Drive
2. **Coba buka link** di browser incognito
3. **Pastikan PDF tidak corrupt**
4. **Gunakan format link yang benar**

### 🎯 **Hasil Optimal:**

- Cover akan muncul sebagai thumbnail 400x600px
- Loading time cepat karena menggunakan Google's CDN
- Responsive di semua device
- Fallback otomatis ke placeholder jika gagal

## Contoh Lengkap di Google Sheets:

```csv
title,price,category,cover
Panduan Pembukaan Catur,150000,Strategi,https://drive.google.com/file/d/1ABC123def456/view
Taktik Catur Mahir,200000,Taktik,https://drive.google.com/file/d/1XYZ789ghi012/view
Endgame Mastery,0,Endgame,https://drive.google.com/file/d/1QWE345jkl678/view
Psikologi Bermain Catur,175000,Psikologi,
```

**Hasilnya:**

- 3 buku pertama akan menampilkan cover dari PDF
- Buku ke-4 akan menampilkan placeholder BookOpen icon
