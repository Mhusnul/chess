/**
 * Google Apps Script untuk menerima data order dari website
 * URL: https://script.google.com/macros/s/AKfycbzU69q4AULRx0GdPX9298xLFKvN1dkQqskhJJaMSrQfY00Z8Z8vWAEVw0F0BtQ5W7Uo/exec
 */

function doPost(e) {
  try {
    // Parse data dari request
    const data = JSON.parse(e.postData.contents);

    // Akses spreadsheet (ganti dengan ID spreadsheet Anda)
    const spreadsheet = SpreadsheetApp.openById("YOUR_SPREADSHEET_ID");
    const sheet =
      spreadsheet.getSheetByName("Orders") || spreadsheet.insertSheet("Orders");

    // Buat header jika sheet kosong
    if (sheet.getLastRow() === 0) {
      sheet
        .getRange(1, 1, 1, 12)
        .setValues([
          [
            "Timestamp",
            "Order ID",
            "Customer Name",
            "Email",
            "Phone",
            "Address",
            "City",
            "Postal Code",
            "Notes",
            "Total Amount",
            "Status",
            "Items",
          ],
        ]);

      // Format header
      const headerRange = sheet.getRange(1, 1, 1, 12);
      headerRange.setFontWeight("bold");
      headerRange.setBackground("#f1f3f4");
    }

    // Prepare data untuk spreadsheet
    const timestamp = new Date();
    const itemsString = data.items
      .map(
        (item) =>
          `${item.title} (${item.quantity}x @ Rp${item.price.toLocaleString(
            "id-ID"
          )})`
      )
      .join("; ");

    // Tambah data ke spreadsheet
    sheet.appendRow([
      timestamp,
      data.orderId,
      data.customerName,
      data.email,
      data.phone,
      data.address,
      data.city,
      data.postalCode,
      data.notes,
      data.totalAmount,
      data.status,
      itemsString,
    ]);

    // Auto-resize columns
    sheet.autoResizeColumns(1, 12);

    return ContentService.createTextOutput(
      JSON.stringify({
        success: true,
        orderId: data.orderId,
        message: "Order saved successfully",
      })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    console.error("Error:", error);
    return ContentService.createTextOutput(
      JSON.stringify({
        success: false,
        error: error.toString(),
      })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput(
    "Chess Book Store Order API is running!"
  ).setMimeType(ContentService.MimeType.TEXT);
}
