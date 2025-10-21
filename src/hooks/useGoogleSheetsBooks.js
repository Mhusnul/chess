import { useState, useEffect } from "react";

const useGoogleSheetsBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const SPREADSHEET_URL =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vTNib4sX059YjhaWyavQysuVLKAnLvIXj10C3mD0ELC3PVq_wDjnDkB4OCbvYLs1vTco1Dqo-XHcAPA/pub?gid=0&single=true&output=csv";

  const processImageUrl = (url) => {
    if (!url || url.trim() === "") return "";

    try {
      // Handle ImageKit URLs (direct use)
      if (url.includes("ik.imagekit.io")) {
        return url;
      }

      // Handle Google Drive URLs
      if (url.includes("drive.google.com")) {
        // Handle Google redirect URLs
        if (url.includes("google.com/url?q=")) {
          const urlMatch = url.match(/q=([^&]+)/);
          if (urlMatch) {
            url = decodeURIComponent(urlMatch[1]);
          }
        }

        // Extract file ID from Google Drive URLs
        const fileIdMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
        if (fileIdMatch) {
          const fileId = fileIdMatch[1];
          return `https://drive.google.com/uc?export=view&id=${fileId}`;
        }
      }

      // Return original URL for other services
      return url;
    } catch (error) {
      return url;
    }
  };

  const parseCSVLine = (line) => {
    const values = [];
    let value = "";
    let insideQuotes = false;

    for (let char of line) {
      if (char === '"') {
        insideQuotes = !insideQuotes;
      } else if (char === "," && !insideQuotes) {
        values.push(value.trim());
        value = "";
      } else {
        value += char;
      }
    }
    values.push(value.trim());
    return values;
  };

  const cleanPrice = (price) => {
    if (!price) return 0;

    // Remove currency symbols and clean whitespace
    let cleanedPrice = price.toString().replace(/[Rp\s]/g, "");

    // Handle decimal separators (both comma and dot)
    // Replace comma with dot for proper parsing
    cleanedPrice = cleanedPrice.replace(/,/g, ".");

    // If there are multiple dots, assume the last one is decimal separator
    const dotCount = (cleanedPrice.match(/\./g) || []).length;
    if (dotCount > 1) {
      // Remove all dots except the last one (thousands separator)
      const lastDotIndex = cleanedPrice.lastIndexOf(".");
      cleanedPrice =
        cleanedPrice.substring(0, lastDotIndex).replace(/\./g, "") +
        cleanedPrice.substring(lastDotIndex);
    } else if (dotCount === 1) {
      // Check if it's thousands separator or decimal
      const parts = cleanedPrice.split(".");
      if (parts[1] && parts[1].length === 3 && !parts[1].includes("0")) {
        // Likely thousands separator (e.g., 15.000)
        cleanedPrice = cleanedPrice.replace(".", "");
      }
      // Otherwise it's decimal separator, keep it
    }

    const parsed = parseFloat(cleanedPrice) || 0;
    console.log(
      `💰 Price parsing: "${price}" -> "${cleanedPrice}" -> ${parsed}`
    );
    return Math.round(parsed); // Return as integer
  };

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        console.log("🔄 Fetching books data...");

        const response = await fetch(SPREADSHEET_URL);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const csvText = await response.text();

        // Parse CSV data
        const lines = csvText.split("\n").filter((line) => line.trim());
        const headers = parseCSVLine(lines[0]).map((header) =>
          header.toLowerCase().trim().replace(/"/g, "")
        );

        const booksData = lines.slice(1).map((line, index) => {
          const values = parseCSVLine(line);
          const book = {};

          headers.forEach((header, i) => {
            book[header] = values[i]
              ? values[i].replace(/^"(.*)"$/, "$1").trim()
              : "";
          });

          // Process cover URL (handles both ImageKit and Google Drive)
          const processedCover = processImageUrl(book.cover);

          // Map to database structure: title, deskripsi, bahasa, price, category, cover
          return {
            id: book.id || String(index + 1),
            title: book.title || "Untitled",
            deskripsi: book.deskripsi || "Deskripsi akan segera tersedia.",
            bahasa: book.bahasa || "Indonesia",
            price: cleanPrice(book.price || "0"),
            category: book.category || "General",
            cover: processedCover,
            // Backward compatibility
            description: book.deskripsi || "Deskripsi akan segera tersedia.",
            language: book.bahasa || "Indonesia",
            author: "Chess Academy",
            isbn: "",
            publishYear: new Date().getFullYear().toString(),
            rating: "4.5",
            stock: "1",
          };
        });

        setBooks(booksData);
        setError(null);
      } catch (err) {
        console.error("❌ Error fetching books:", err);
        setError("Gagal memuat data buku: " + err.message);
        setBooks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return { books, loading, error };
};

export default useGoogleSheetsBooks;
