# 🔍 **DEBUG: Google Drive URL Processing Test**

## 🔗 **URL yang Anda Berikan:**

```
https://www.google.com/url?q=https://drive.google.com/file/d/12SAH5nj4dje0SpqskfuFevk7ERRsKqh9/view?usp%3Ddrive_link&sa=D&source=editors&ust=1760940842532219&usg=AOvVaw04HHFAZuT1WwOkZjr4Rk7E
```

## 🧪 **Manual URL Processing Test:**

### **Step 1: Extract dari Google Redirect**

```javascript
// Original URL
const originalUrl =
  "https://www.google.com/url?q=https://drive.google.com/file/d/12SAH5nj4dje0SpqskfuFevk7ERRsKqh9/view?usp%3Ddrive_link&sa=D&source=editors&ust=1760940842532219&usg=AOvVaw04HHFAZuT1WwOkZjr4Rk7E";

// Extract q parameter
const urlMatch = originalUrl.match(/q=([^&]+)/);
if (urlMatch) {
  const extractedUrl = decodeURIComponent(urlMatch[1]);
  console.log("Extracted:", extractedUrl);
  // Result: https://drive.google.com/file/d/12SAH5nj4dje0SpqskfuFevk7ERRsKqh9/view?usp=drive_link
}
```

### **Step 2: Extract File ID**

```javascript
const driveUrl =
  "https://drive.google.com/file/d/12SAH5nj4dje0SpqskfuFevk7ERRsKqh9/view?usp=drive_link";

// Extract file ID
const fileIdMatch = driveUrl.match(/\/file\/d\/([a-zA-Z0-9-_]+)/);
if (fileIdMatch) {
  const fileId = fileIdMatch[1];
  console.log("File ID:", fileId);
  // Result: 12SAH5nj4dje0SpqskfuFevk7ERRsKqh9
}
```

### **Step 3: Generate Thumbnail URL**

```javascript
const fileId = "12SAH5nj4dje0SpqskfuFevk7ERRsKqh9";
const thumbnailUrl = `https://drive.google.com/thumbnail?id=${fileId}&sz=w400-h600`;
console.log("Final URL:", thumbnailUrl);
// Result: https://drive.google.com/thumbnail?id=12SAH5nj4dje0SpqskfuFevk7ERRsKqh9&sz=w400-h600
```

## ✅ **Expected Result:**

```
https://drive.google.com/thumbnail?id=12SAH5nj4dje0SpqskfuFevk7ERRsKqh9&sz=w400-h600
```

## 🧪 **Test di Browser:**

Buka console di `http://localhost:5174/book` dan lihat:

1. **📊 Headers found:** - untuk melihat kolom yang terbaca
2. **🔗 Testing NEW URL from user:** - untuk melihat URL processing
3. **📖 Processing book X:** - untuk melihat data per book
4. **🎯 Field mapping check:** - untuk melihat mapping field
5. **📚 Final processed books:** - untuk melihat hasil akhir

## 🎯 **Database Structure Check:**

Pastikan Google Sheets Anda memiliki kolom dalam urutan:

```
title | deskripsi | bahasa | price | category | cover
```

## 🔧 **Possible Issues:**

1. **Cover tidak muncul:**

   - Cek apakah URL di Google Sheets benar
   - Cek apakah file ID ter-extract dengan benar
   - Cek apakah permission Google Drive file sudah public

2. **Data acak-acakan:**
   - Cek apakah header kolom di Google Sheets sesuai
   - Cek apakah tidak ada karakter aneh di CSV
   - Cek console log untuk field mapping

## 🔍 **Next Steps:**

1. Buka browser console di halaman Book
2. Lihat debug output di console
3. Cek apakah URL processing berjalan dengan benar
4. Pastikan field mapping sesuai dengan database structure
