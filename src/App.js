import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Forecast from "./components/Forecast";
import About from "./components/About";
import BackgroundVideo from "./components/BackgroundVideo";
function App() {
  return (
    <Router>
      <BackgroundVideo /> {/* 👈 bg video rendered globally */}
      <div className="relative z-10">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/forecast" element={<Forecast />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
