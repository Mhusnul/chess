import { useState, useEffect } from "react";

// Utility function to parse price string to number
const parsePrice = (priceStr) => {
  if (!priceStr) return 0;
  // Extract numbers from "Rp 50.000,-" format
  const numbers = priceStr.replace(/[^0-9]/g, "");
  return parseInt(numbers) || 0;
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
      console.log("Fetching course data from CSV...");

      const response = await fetch(CSV_URL);
      const csvText = await response.text();

      console.log("Raw CSV data:", csvText);

      const lines = csvText.split("\n").filter((line) => line.trim());
      const courseData = lines
        .slice(1)
        .map((line, index) => {
          // Simple CSV parsing for this specific format
          const values = [];
          let current = "";
          let inQuotes = false;

          for (let i = 0; i < line.length; i++) {
            const char = line[i];
            if (char === '"') {
              inQuotes = !inQuotes;
            } else if (char === "," && !inQuotes) {
              values.push(current.trim());
              current = "";
            } else {
              current += char;
            }
          }
          values.push(current.trim()); // Add last value

          if (values.length >= 6 && values[0]) {
            return {
              id: values[0] || (index + 1).toString(),
              title: values[1] || "Course",
              price: parsePrice(values[2]),
              priceDisplay: values[2] || "Free",
              category: values[3] || "General",
              materi: values[4] || "",
              pertemuan: values[5] || "",
              jamPelatihan: values[6] || "",
              keterangan: values[7] || "",
              promo: values[8] || "",
              syarat: values[9] || "",
            };
          }
          return null;
        })
        .filter((course) => course !== null);

      console.log("Parsed course data:", courseData);
      setCourses(courseData);
      setError(null);
    } catch (err) {
      console.error("Error fetching course data:", err);
      setError(err.message);
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
