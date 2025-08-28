import React from "react";
import Home from "./pages/Home";
import CourseTest from "./components/test/CourseTest";

function App() {
  // Temporary: Check URL for test route
  const isTestMode =
    window.location.pathname === "/test-course" ||
    window.location.search.includes("test=course");

  if (isTestMode) {
    return <CourseTest />;
  }

  return <Home />;
}

export default App;
