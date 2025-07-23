import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import axios from "axios";

const Forecast = () => {
  const [city, setCity] = useState("");
  const [forecastData, setForecastData] = useState([]);
  const [tempAlert, setTempAlert] = useState("");
  const [showCards, setShowCards] = useState(false);

  const showTempAlert = (msg) => {
    setTempAlert(msg);
    setTimeout(() => setTempAlert(""), 2000);
  };

  const handleSearch = async () => {
    if (!city.trim()) {
      showTempAlert("Please enter a city name.");
      return;
    }

    try {
      showTempAlert(`Searching forecast for ${city}...`);

      const geoRes = await axios.get(
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}`
      );

      if (!geoRes.data?.results?.length) {
        showTempAlert("City not found.");
        return;
      }

      const { latitude, longitude } = geoRes.data.results[0];

      const forecastRes = await axios.get(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`
      );

      const days = forecastRes.data.daily;
      const result = [];

      for (let i = 0; i < 5; i++) {
        result.push({
          date: days.time[i],
          min: days.temperature_2m_min[i],
          max: days.temperature_2m_max[i],
          code: days.weathercode[i],
        });
      }

      setForecastData(result);
      setShowCards(true);
    } catch (err) {
      console.error(err);
      showTempAlert("Failed to fetch forecast.");
    }
  };

  useEffect(() => {
    setShowCards(false);
  }, [city]);

  return (
    <div
      className={`
        relative text-white px-4 pb-[110px] pt-[64px]
        min-h-screen overflow-x-hidden
        bg-[url('https://thumbs.dreamstime.com/b/day-clouds-weather-app-screen-mobile-interface-design-forecast-weather-background-time-concept-vector-banner-day-clouds-262298631.jpg')]
        bg-cover bg-center bg-no-repeat bg-fixed
        md:bg-none
        flex flex-col
      `}
    >
      {/* Alert */}
      {tempAlert && (
        <div className="fixed top-[60px] md:top-[75px] left-1/2 transform -translate-x-1/2 bg-sky-700 text-white font-semibold px-6 py-3 shadow-lg z-50 w-full md:w-1/2 text-center md:rounded-xl whitespace-nowrap">
          {tempAlert}
        </div>
      )}

      {/* Centered Wrapper */}
      <div
        className={`flex-grow w-full max-w-5xl mx-auto transition-all duration-300 ${
          !showCards ? "flex items-center justify-center" : ""
        }`}
      >
        <div className="w-full">
          {/* Input Box */}
          <div
            className={`text-center bg-white/20 backdrop-blur-md rounded-xl py-10 md:py-12 md:px-8 px-6 shadow-lg transition-all duration-300 ${
              showCards ? "md:mt-20 mt-10" : ""
            }`}
          >
            <h1 className="flex flex-col md:flex-row md:items-center md:gap-5 md:justify-center md:mb-10 md:text-4xl font-bold text-black italic text-xl">
              <span>📈</span>
              <span>Forecast Your Favourite City Now!</span>
            </h1>

            <div className="flex flex-col md:flex-row gap-4 items-center">
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter city name..."
                className="w-full px-4 py-2 mt-3 md:mt-0 rounded-md bg-gray-100 text-gray-800 outline-none shadow-sm"
              />
              <button
                onClick={handleSearch}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 font-semibold px-4 py-2 rounded-md shadow-md hover:from-yellow-500 hover:to-yellow-600 hover:scale-105 transform transition duration-300"
              >
                <span className="text-lg">🔍</span> Check
              </button>
            </div>
          </div>

          {/* Forecast Cards */}
          {showCards && (
            <div className="w-full mt-11 grid grid-cols-1 md:grid-cols-5 gap-4">
              {forecastData.map((day, index) => (
                <div
                  key={index}
                  className="bg-white/20 backdrop-blur-md p-5 rounded-xl text-center shadow-md flex flex-col items-center"
                >
                  <p className="text-sm text-black md:text-xl font-semibold">
                    {new Date(day.date).toDateString()}
                  </p>
                  <p className="text-lg font-bold text-gray-700 md:text-white mt-2">
                    🌡️ {day.min}°C - {day.max}°C
                  </p>
                  <p className="mt-2 text-black text-lg md:text-white">
                    📍 Code: {day.code}
                  </p>
                </div>
              ))}
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

export default Forecast;
