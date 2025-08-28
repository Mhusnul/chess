import { useState, useEffect } from 'react';

// Utility function to parse price string to number
const parsePrice = (priceStr) => {
  if (!priceStr) return 0;
  // Extract numbers from "Rp 50.000,-" format
  const numbers = priceStr.replace(/[^0-9]/g, '');
  return parseInt(numbers) || 0;
};

// Simple CSV parser that handles our specific format
const parseCSV = (csvText) => {
  const lines = csvText.split('\n').filter(line => line.trim());
  console.log('Total lines:', lines.length);
  
  if (lines.length < 2) {
    throw new Error('CSV data is too short');
  }
  
  const header = lines[0];
  console.log('Header:', header);
  
  const courses = [];
  
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    
    console.log(`Processing line ${i}:`, line.substring(0, 50) + '...');
    
    // Simple split by comma (not handling quotes properly for now, just to test)
    const parts = line.split(',');
    
    if (parts.length >= 4) {
      const course = {
        id: parts[0] || i.toString(),
        title: parts[1] || 'Course',
        price: parsePrice(parts[2]),
        priceDisplay: parts[2] || 'Free',
        category: parts[3] || 'General',
        materi: parts[4] || 'Basic training',
        pertemuan: parts[5] || '1x pertemuan',
        jamPelatihan: parts[6] || '1 jam',
        keterangan: parts[7] || 'Online',
        promo: parts[8] || '',
        syarat: parts[9] || ''
      };
      
      courses.push(course);
      console.log(`Added course: ${course.id} - ${course.title} - ${course.priceDisplay}`);
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
  const CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTNib4sX059YjhaWyavQysuVLKAnLvIXj10C3mD0ELC3PVq_wDjnDkB4OCbvYLs1vTco1Dqo-XHcAPA/pub?output=csv';

  const fetchCourseData = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log("🚀 Starting to fetch course data...");

      const response = await fetch(CSV_URL);
      console.log('Response status:', response.status);
      
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
