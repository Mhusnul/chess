import React from "react";
import Home from "./pages/Home";
import Class from "./pages/Class";

function App() {
  // Simple routing based on URL path
  const currentPath = window.location.pathname;
  
  if (currentPath === '/class' || currentPath === '/kelas') {
    return <Class />;
  }
  
  return <Home />;
}

export default App;
