import React from "react";
import Home from "./pages/Home";
import Class from "./pages/Class";
import About from "./pages/About";
import Book from "./pages/Book";
import Checkout from "./pages/Checkout";

function App() {
  // Simple routing based on URL path
  const currentPath = window.location.pathname;

  if (currentPath === "/class" || currentPath === "/kelas") {
    return <Class />;
  }

  if (currentPath === "/about" || currentPath === "/profile") {
    return <About />;
  }

  if (currentPath === "/book" || currentPath === "/books") {
    return <Book />;
  }

  if (currentPath === "/checkout") {
    return <Checkout />;
  }

  return <Home />;
}

export default App;
