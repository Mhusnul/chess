import { useState, useEffect } from "react";

// Utility function to parse price string to number
const parsePrice = (priceStr) => {
  if (!priceStr) return 0;
  // Extract numbers from "Rp 50.000,-" format
  const numbers = priceStr.replace(/[^0-9]/g, "");
  return parseInt(numbers) || 0;
};

// Robust CSV parser that handles quoted fields with newlines
const parseCSV = (csvText) => {
  console.log("Raw CSV length:", csvText.length);
  console.log("First 500 chars:", csvText.substring(0, 500));

  const courses = [];
  let currentRow = [];
  let currentField = "";
  let inQuotes = false;
  let isHeader = true;

  for (let i = 0; i < csvText.length; i++) {
    const char = csvText[i];
    const nextChar = csvText[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        // Escaped quote
        currentField += '"';
        i++; // Skip next quote
      } else {
        // Toggle quote state
        inQuotes = !inQuotes;
      }
    } else if (char === "," && !inQuotes) {
      // End of field
      currentRow.push(currentField.trim());
      currentField = "";
    } else if (char === "\n" && !inQuotes) {
      // End of row
      currentRow.push(currentField.trim());

      if (isHeader) {
        console.log("Header row:", currentRow);
        isHeader = false;
      } else if (currentRow.length >= 4 && currentRow[0]) {
        // Create course object
        const course = {
          id: currentRow[0] || courses.length + 1,
          title: currentRow[1] || "Course",
          price: parsePrice(currentRow[2]),
          priceDisplay: currentRow[2] || "Free",
          category: currentRow[3] || "General",
          materi: currentRow[4] || "Basic training",
          pertemuan: currentRow[5] || "1x pertemuan",
          jamPelatihan: currentRow[6] || "1 jam",
          keterangan: currentRow[7] || "Online",
          promo: currentRow[8] || "",
          syarat: currentRow[9] || "",
        };

        courses.push(course);
        console.log(
          `Added course ${course.id}: ${course.title} - ${course.priceDisplay}`
        );
      }

      // Reset for next row
      currentRow = [];
      currentField = "";
    } else {
      // Regular character
      currentField += char;
    }
  }

  // Handle last row if no trailing newline
  if (currentField || currentRow.length > 0) {
    currentRow.push(currentField.trim());
    if (!isHeader && currentRow.length >= 4 && currentRow[0]) {
      const course = {
        id: currentRow[0] || courses.length + 1,
        title: currentRow[1] || "Course",
        price: parsePrice(currentRow[2]),
        priceDisplay: currentRow[2] || "Free",
        category: currentRow[3] || "General",
        materi: currentRow[4] || "Basic training",
        pertemuan: currentRow[5] || "1x pertemuan",
        jamPelatihan: currentRow[6] || "1 jam",
        keterangan: currentRow[7] || "Online",
        promo: currentRow[8] || "",
        syarat: currentRow[9] || "",
      };

      courses.push(course);
      console.log(
        `Added final course ${course.id}: ${course.title} - ${course.priceDisplay}`
      );
    }
  }

  return courses;
};

// Hook untuk mengambil data course dari CSV
export const useCourseData = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // CSV URL untuk data course
  const CSV_URL =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vTNib4sX059YjhaWyavQysuVLKAnLvIXj10C3mD0ELC3PVq_wDjnDkB4OCbvYLs1vTco1Dqo-XHcAPA/pub?output=csv";

  const fetchCourseData = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log("🚀 Starting to fetch course data...");

      const response = await fetch(CSV_URL);
      console.log("Response status:", response.status);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const csvText = await response.text();
      console.log("📄 CSV text length:", csvText.length);
      console.log("📄 First 200 chars:", csvText.substring(0, 200));

      const courseData = parseCSV(csvText);
      console.log("✅ Successfully parsed", courseData.length, "courses");

      setCourses(courseData);
    } catch (err) {
      console.error("❌ Error fetching course data:", err);
      setError(err.message);
      setCourses([]); // Reset to empty array on error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourseData();
  }, []);

  return {
    courses,
    loading,
    error,
    refetch: fetchCourseData,
  };
};
