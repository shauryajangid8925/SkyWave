import Footer from "./Footer";

function About() {
  return (
    <div
      className={`
        relative min-h-screen text-white z-10 
        bg-[url('https://thumbs.dreamstime.com/b/day-clouds-weather-app-screen-mobile-interface-design-forecast-weather-background-time-concept-vector-banner-day-clouds-262298631.jpg')] 
        bg-cover bg-center bg-no-repeat 
        md:bg-none
        px-5 pb-[64px]
      `}
    >
      {/* Background Fade Overlay (optional) */}
      <div className="absolute inset-0 z-0"></div>

      {/* Centered only on md+ */}
      <div
        className={`
          relative z-10 w-full max-w-3xl mx-auto
          pt-20 space-y-4
          md:pt-[70px] md:pb-0 md:min-h-[calc(100vh-64px)] md:flex  md:justify-center md:items-center
        `}
      >
        <div className="space-y-4 w-full">
          {/* Section 1 */}
          <div className="bg-white/20 p-3 md:p-4 backdrop-blur-md rounded-xl shadow-md border border-white/30">
            <h2 className="md:text-2xl text-xl font-semibold text-black mb-1">🌦️ Purpose</h2>
            <p className="text-base md:text-lg text-blue-950 md:text-white">
              Get real-time weather updates with elegant UI and location-based forecasting.
            </p>
          </div>

          {/* Section 2 */}
          <div className="bg-white/20 p-3 md:p-4 backdrop-blur-md rounded-xl shadow-md border border-white/30">
            <h2 className="text-xl md:text-2xl font-semibold text-black mb-1">👨‍💻 Built With</h2>
            <p className="text-base md:text-lg text-blue-950 md:text-white">
              React, Tailwind CSS, and OpenWeather API. Optimized for performance and accessibility.
            </p>
          </div>

          {/* Section 3 */}
          <div className="bg-white/20 p-3 md:p-4 backdrop-blur-md rounded-xl shadow-md border border-white/30">
            <h2 className="text-xl md:text-2xl font-semibold text-black mb-1">📱 Features Coming Soon</h2>
            <p className="text-base md:text-lg text-blue-950 md:text-white">
              Dark mode, severe alerts, and a weekly forecast chart coming soon.
            </p>
          </div>
        </div>
      </div>

      {/* Footer Fixed Bottom */}
      <div className="fixed bottom-0 left-0 w-full z-20">
        <Footer />
      </div>
    </div>
  );
}

export default About;
