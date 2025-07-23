import React, { useState, useEffect } from "react";

const WeatherResult = ({ city, trigger }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    if (!city.trim()) return;

    setLoading(true);
    setError(null);
    setWeatherData(null);

    try {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=28.6139&longitude=77.2090&current_weather=true`
      );

      if (!response.ok) throw new Error("Failed to fetch weather");

      const data = await response.json();
      setWeatherData(data.current_weather);
    } catch (err) {
      setError("Failed to fetch weather data.");
    } finally {
      setLoading(false);
    }
  };

  // ⛔ City change pe nahi, sirf trigger change pe fetch hoga
  useEffect(() => {
    fetchWeather();
  }, [trigger]);

  return (
    <div className="mt-4 md:p-4 rounded-lg text-gray-900 ">
      <h2 className="text-2xl font-bold mb-2">
        🌤️ Weather at  <span className="italic">{city}</span> : 
      </h2>

      {loading && <p className="text-yellow-800">Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {weatherData && (
        <div className="mt-2 md:text-white text-gray-800 font-semibold space-y-2">
          <p>🌡️ Temperature: {weatherData.temperature}°C</p>
          <p>💨 Wind Speed: {weatherData.windspeed} km/h</p>
          <p>🧭 Wind Direction: {weatherData.winddirection}°</p>
          <p>⏱️ Time: {weatherData.time}</p>
        </div>
      )}
    </div>
  );
};

export default WeatherResult;
