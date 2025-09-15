# 📊 Google Spreadsheet Integration Setup

## 🎯 Overview

Integrasi ini akan otomatis menyimpan data pesanan dari checkout ke Google Spreadsheet dengan struktur:

- Timestamp
- Order ID
- Customer Name
- Email
- Phone
- Address
- City
- Postal Code
- Notes
- Total Amount
- Status
- Items

## 🚀 Setup Instructions

### 1. Setup Google Apps Script

1. **Buka Google Apps Script**: https://script.google.com
2. **Buat Project Baru**: Klik "New Project"
3. **Copy paste code** dari file `google-apps-script.js`
4. **Ganti Spreadsheet ID**:
   ```javascript
   const spreadsheet = SpreadsheetApp.openById("YOUR_SPREADSHEET_ID");
   ```
   Dengan ID spreadsheet Anda (ambil dari URL spreadsheet)

### 2. Deploy Web App

1. **Klik Deploy** > "New deployment"
2. **Type**: Pilih "Web app"
3. **Execute as**: "Me (your-email@gmail.com)"
4. **Who has access**: "Anyone"
5. **Deploy** dan copy URL yang diberikan

### 3. Update URL di Website

URL yang sudah ada di code:

```javascript
https://script.google.com/macros/s/AKfycbzU69q4AULRx0GdPX9298xLFKvN1dkQqskhJJaMSrQfY00Z8Z8vWAEVw0F0BtQ5W7Uo/exec
```

Jika perlu ganti dengan URL deployment baru Anda.

## 📋 Data Structure

### Order Data yang Dikirim:

```json
{
  "orderId": "ORD-1234567890-ABC1",
  "customerName": "John Doe",
  "email": "john@example.com",
  "phone": "6281234567890",
  "address": "Jl. Contoh No. 123, Jakarta",
  "city": "",
  "postalCode": "",
  "notes": "Catatan tambahan",
  "totalAmount": 150000,
  "status": "Pending Payment",
  "items": [
    {
      "title": "Buku Catur Dasar",
      "quantity": 2,
      "price": 75000,
      "subtotal": 150000
    }
  ]
}
```

### Spreadsheet Columns:

1. **Timestamp** - Waktu otomatis
2. **Order ID** - Generated: ORD-timestamp-random
3. **Customer Name** - Dari form
4. **Email** - Dari form
5. **Phone** - Dari form
6. **Address** - Dari form
7. **City** - Kosong (bisa diisi manual)
8. **Postal Code** - Kosong (bisa diisi manual)
9. **Notes** - Catatan customer
10. **Total Amount** - Total harga
11. **Status** - Default: "Pending Payment"
12. **Items** - Detail produk (formatted string)

## 🔧 Features

### ✅ Auto Order ID Generation

- Format: `ORD-{timestamp}-{random4digit}`
- Contoh: `ORD-1694781234567-A1B2`

### ✅ Real-time Data Sync

- Data langsung masuk ke spreadsheet saat checkout
- No manual input needed

### ✅ WhatsApp Integration

- Order ID included in WhatsApp message
- Formatted order details

### ✅ Error Handling

- Try-catch untuk network errors
- User feedback jika gagal

## 🎨 Spreadsheet Auto-formatting

- Header dengan background abu-abu
- Bold text untuk header
- Auto-resize columns
- Timestamp in local timezone

## 🧪 Testing

1. **Test Endpoint**: Buka URL script di browser
2. **Should return**: "Chess Book Store Order API is running!"
3. **Test Order**: Lakukan checkout test
4. **Check Spreadsheet**: Data harus muncul otomatis

## 🔒 Security Notes

- Script berjalan dengan permission Anda
- Data dikirim via HTTPS
- No sensitive data exposed
- Only POST requests accepted untuk order data

## 🐛 Troubleshooting

### Jika data tidak masuk spreadsheet:

1. Check spreadsheet ID benar
2. Check script permissions
3. Check deployment settings
4. Check browser console untuk errors

### Common Issues:

- **CORS Error**: Normal karena mode 'no-cors'
- **Permission Denied**: Re-authorize script
- **Spreadsheet Not Found**: Check ID spreadsheet

## 📞 Support

Jika ada masalah dengan setup:

1. Check browser developer console
2. Check Google Apps Script execution log
3. Verify spreadsheet permissions
4. Test URL endpoint manually
