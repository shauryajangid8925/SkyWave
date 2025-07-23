import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import WeatherResult from "./WeatherResult";

const Home = () => {
  const [city, setCity] = useState("");
  const [tempAlert, setTempAlert] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [triggerFetch, setTriggerFetch] = useState(0);
  const [headerHeight, setHeaderHeight] = useState(64);

  const showTempAlert = (msg) => {
    setTempAlert(msg);
    setTimeout(() => setTempAlert(""), 2000);
  };

  const handleSearch = () => {
    if (!city.trim()) {
      showTempAlert("Please enter a city name.");
      return;
    }
    setShowResult(true);
    setTriggerFetch((prev) => prev + 1);
    showTempAlert(`Fetching weather for ${city}...`);
  };

  const handleGeoLocation = () => {
    showTempAlert("Fetching weather for current location...");
  };

  useEffect(() => {
    setShowResult(false);
  }, [city]);

  useEffect(() => {
    const updateHeaderHeight = () => {
      const nav = document.querySelector("nav");
      if (!nav) return;

      const baseHeight = 64;
      const isMobile = window.innerWidth < 768;

      if (isMobile) {
        const navLinksContainer = nav.querySelector("div:nth-child(2)");
        const navLinksHeight = navLinksContainer?.scrollHeight || 0;
        if (nav.classList.contains("open")) {
          setHeaderHeight(baseHeight + navLinksHeight);
        } else {
          setHeaderHeight(baseHeight);
        }
      } else {
        setHeaderHeight(baseHeight);
      }
    };

    updateHeaderHeight();
    window.addEventListener("resize", updateHeaderHeight);
    const observer = new MutationObserver(updateHeaderHeight);
    const nav = document.querySelector("nav");
    if (nav) observer.observe(nav, { attributes: true, attributeFilter: ["class"] });

    return () => {
      window.removeEventListener("resize", updateHeaderHeight);
      if (nav) observer.disconnect();
    };
  }, []);

  return (
    <div
      style={{
        paddingTop: `${headerHeight}px`,
      }}
      className={`
        flex flex-col min-h-screen relative z-10 text-white
        bg-[url('https://thumbs.dreamstime.com/b/day-clouds-weather-app-screen-mobile-interface-design-forecast-weather-background-time-concept-vector-banner-day-clouds-262298631.jpg')]
        bg-cover bg-center bg-no-repeat bg-fixed
        md:bg-none
      `}
    >
      {/* Alert */}
      {tempAlert && (
        <div className="fixed md:top-[75px] top-[60px] md:p-3 left-1/2 transform -translate-x-1/2 md:bg-sky-700 bg-gray-500 text-white md:text-xl font-semibold text-sm justify-center px-6 py-3 shadow-lg z-50 w-full md:w-1/2 md:rounded-xl text-center whitespace-nowrap">
          {tempAlert}
        </div>
      )}

      {/* Centered Content */}
      <div className="flex-1 flex items-center justify-center w-full">
        <div className={`w-full flex flex-col items-center ${!showResult ? "mb-[60px]" : ""}`}>
          {/* Input Card */}
          <div className="w-[90%] md:max-w-3xl text-center bg-white/20 backdrop-blur-md rounded-xl py-7 md:px-8 px-6 shadow-lg">
            <h1 className="md:text-4xl text-xl font-bold italic text-gray-800 md:mb-2 mb-5">
              Don't Let the Weather Surprise You !
            </h1>
            <p className="text-sm md:text-white text-gray-800 italic md:text-xl md:mb-5 mb-5 font-semibold">
              Check weather in your area now !
            </p>

            <div className="flex flex-col md:flex-row gap-4 items-center mb-6 w-full">
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter city name..."
                className="w-full px-4 py-2 rounded-md bg-gray-100 text-gray-800 outline-none shadow-sm"
              />
              <button
                onClick={handleSearch}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 font-semibold px-4 py-2 rounded-md shadow-md hover:from-yellow-500 hover:to-yellow-600 hover:scale-105 transform transition duration-300"
              >
                <span className="text-lg">🔍</span> Check
              </button>
            </div>

            <div className="h-0.5 md:w-2/3 mx-auto bg-black rounded-full my-8" />

            <button
              onClick={handleGeoLocation}
              className="bg-gray-800 text-white font-bold px-6 py-2 rounded-full hover:bg-blue-900 transition"
            >
              📍 Use Current Location
            </button>
          </div>

          {/* Weather Result */}
          {showResult && (
            <div className="w-[90%] md:max-w-3xl mt-[25px] mb-[90px] bg-white/20 backdrop-blur-md rounded-xl p-2 shadow-lg">
              <WeatherResult city={city} trigger={triggerFetch} />
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="fixed bottom-0 left-0 w-full z-20">
        <Footer />
      </div>
    </div>
  );
};

export default Home;


