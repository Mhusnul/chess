import React from "react";
import Home from "./pages/Home";
import Class from "./pages/Class";
import About from "./pages/About";

function App() {
  // Simple routing based on URL path
  const currentPath = window.location.pathname;

  if (currentPath === "/class" || currentPath === "/kelas") {
    return <Class />;
  }

  if (currentPath === "/about" || currentPath === "/profile") {
    return <About />;
  }

  return <Home />;
}

export default App;
