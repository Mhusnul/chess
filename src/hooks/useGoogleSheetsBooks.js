import { useState, useEffect } from "react";

const useGoogleSheetsBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const SPREADSHEET_URL =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vTNib4sX059YjhaWyavQysuVLKAnLvIXj10C3mD0ELC3PVq_wDjnDkB4OCbvYLs1vTco1Dqo-XHcAPA/pub?gid=0&single=true&output=csv";

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);

        // Fetch CSV data from Google Sheets
        const response = await fetch(SPREADSHEET_URL);
        const csvText = await response.text();

        // Parse CSV data
        const rows = csvText.split("\n").filter((row) => row.trim() !== "");
        const headers = rows[0]
          .split(",")
          .map((header) => header.trim().replace(/"/g, ""));

        console.log("📊 Headers found:", headers);
        console.log("📝 Total rows:", rows.length);
        console.log("📝 First few rows:", rows.slice(0, 3));

        const booksData = rows.slice(1).map((row, index) => {
          const values = row
            .split(",")
            .map((value) => value.trim().replace(/"/g, ""));

          const book = {};
          headers.forEach((header, headerIndex) => {
            book[header.toLowerCase()] = values[headerIndex] || "";
          });

          // Process cover URL for Google Drive links
          let processedCover = book.cover || "";
          if (processedCover) {
            // Convert Google Drive share links to proper image URLs
            if (processedCover.includes("drive.google.com/file/d/")) {
              // Extract file ID from Google Drive link
              const fileIdMatch = processedCover.match(
                /\/file\/d\/([a-zA-Z0-9-_]+)/
              );
              if (fileIdMatch) {
                const fileId = fileIdMatch[1];
                // Use thumbnail format for better performance
                processedCover = `https://drive.google.com/thumbnail?id=${fileId}&sz=w400-h600`;
              }
            } else if (processedCover.includes("drive.google.com/open?id=")) {
              // Handle old Google Drive format
              const fileIdMatch = processedCover.match(/id=([a-zA-Z0-9-_]+)/);
              if (fileIdMatch) {
                const fileId = fileIdMatch[1];
                processedCover = `https://drive.google.com/thumbnail?id=${fileId}&sz=w400-h600`;
              }
            }
          }

          console.log(`📖 Processing book ${index + 1}:`, book);

          // Ensure required fields with defaults for simple structure
          return {
            id: book.id || index + 1,
            title: book.title || book.judul || "Untitled",
            author:
              book.author ||
              book.penulis ||
              book.pengarang ||
              "Author Coming Soon",
            description:
              book.description ||
              book.deskripsi ||
              book.desc ||
              "Deskripsi buku akan segera tersedia. Buku ini merupakan bagian dari koleksi catur terbaik untuk meningkatkan kemampuan bermain Anda.",
            price:
              book.price && book.price !== "0" && book.price !== "Rp 0"
                ? book.price.replace(/[^\d]/g, "")
                : "0",
            category: book.category || book.kategori || book.cat || "General",
            cover: processedCover,
            pages: book.pages || book.halaman || book.hal || "200",
            language: book.language || book.bahasa || book.lang || "Indonesia",
            isbn: book.isbn || "",
            publishYear:
              book.publishyear ||
              book.tahunterbit ||
              book.tahun ||
              new Date().getFullYear().toString(),
            rating: book.rating || book.rate || "4.5",
            stock: book.stock || book.stok || "1",
            // Additional fields that might be useful
            publisher: book.publisher || book.penerbit || "",
            format: book.format || book.tipe || "PDF",
            fileSize: book.filesize || book.ukuranfile || "",
            downloadUrl: book.downloadurl || book.linkdownload || "",
          };
        });

        setBooks(booksData);
        setError(null);
      } catch (err) {
        console.error("Error fetching books data:", err);
        setError("Failed to load books data");

        // Fallback to sample data if fetch fails
        setBooks([
          {
            id: 1,
            title: "Chess Fundamentals",
            author: "Jose Raul Capablanca",
            description: "Buku dasar catur untuk pemula",
            price: "150000",
            category: "Beginner",
            cover: "",
            pages: "200",
            language: "Indonesia",
            isbn: "978-123456789",
            publishYear: "2023",
            rating: "4.5",
            stock: "10",
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const refreshBooks = () => {
    setBooks([]);
    setLoading(true);
    setError(null);
    // Trigger useEffect again
    window.location.reload();
  };

  return { books, loading, error, refreshBooks };
};

export default useGoogleSheetsBooks;
