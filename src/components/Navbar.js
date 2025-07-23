import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNavbar = () => {
    setIsNavOpen(!isNavOpen);
  };

  const closeNavbar = () => {
    setIsNavOpen(false);
  };

  return (
    <>
      {/* Navbar Top Bar */}
      <nav
        className="bg-black fixed top-0 left-0 h-[60px] w-full z-50 text-white text-left md:text-xl shadow-md flex items-center justify-between px-4"
      >
        <div className="flex justify-between items-center w-full">
          {/* Logo + Title */}
          <h1 className="flex items-center gap-2 font-bold tracking-wide">
            <span className="md:text-4xl text-2xl">📡</span> SkyWave{" "}
            <span className="italic text-blue-300">– Feel The Flow</span>
          </h1>

          {/* Hamburger for sm devices */}
          <button
            className="md:hidden text-3xl"
            onClick={toggleNavbar}
            aria-label="Toggle Navigation"
          >
            <i className="ri-align-justify"></i>
          </button>
        </div>

        {/* MD and up nav inline */}
        <div className="hidden md:flex md:items-center md:space-x-6 ml-6">
          <Link to="/" className="hover:text-yellow-300 flex items-center gap-1">
            Home
          </Link>
          <Link to="/forecast" className="hover:text-yellow-300 flex items-center gap-1">
            Forecast
          </Link>
          <Link to="/about" className="hover:text-yellow-300 flex items-center gap-1">
            About
          </Link>
        </div>
      </nav>

      {/* Drawer for sm devices — float under nav */}
      {isNavOpen && (
        <div className="absolute top-[60px] left-0 w-full flex flex-col bg-slate-700 text-white z-40 py-4 space-y-2 px-5 md:hidden">
          <Link
            to="/"
            onClick={closeNavbar}
            className="hover:text-yellow-300 flex items-center space-x-2 transition-colors"
          >
            <span role="img" aria-label="home">🏠</span>
            <span>Home</span>
          </Link>
          <Link
            to="/forecast"
            onClick={closeNavbar}
            className="hover:text-yellow-300 flex items-center space-x-2 transition-colors"
          >
            <span role="img" aria-label="forecast">⏳</span>
            <span>Forecast</span>
          </Link>
          <Link
            to="/about"
            onClick={closeNavbar}
            className="hover:text-yellow-300 flex items-center space-x-2 transition-colors"
          >
            <span role="img" aria-label="about">📜</span>
            <span>About</span>
          </Link>
        </div>
      )}
    </>
  );
}

export default Navbar;
