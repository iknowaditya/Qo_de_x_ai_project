import { useWeather } from "../context/WeatherContext";
import { FaTint, FaWind } from "react-icons/fa";

export default function WeatherDisplay() {
  const { weather, weatherLoading, units, toggleUnits } = useWeather();

  if (weatherLoading)
    return <div className="text-center text-white">Loading...</div>;
  if (!weather) return null;

  const { name, main, weather: weatherArr, wind } = weather;
  const icon = weatherArr[0].icon;
  const tempUnit = units === "metric" ? "°C" : "°F";
  const speedUnit = units === "metric" ? "m/s" : "mph";

  return (
    <div className="bg-white/20 rounded-xl shadow-lg p-8 text-center mb-6">
      <h2 className="text-2xl font-bold mb-2 text-white">{name}</h2>
      <img
        src={`https://openweathermap.org/img/wn/${icon}@4x.png`}
        alt={weatherArr[0].description}
        className="mx-auto"
      />
      <div className="flex justify-center items-center gap-4 mt-4">
        <span className="text-5xl font-semibold text-white drop-shadow">
          {Math.round(main.temp)}
          {tempUnit}
        </span>
        {/* Stylish Toggle */}
        <button
          className={`relative w-16 h-8 bg-gray-300 rounded-full transition-colors duration-300 focus:outline-none ml-4`}
          onClick={toggleUnits}
          title="Toggle Celsius/Fahrenheit"
        >
          <span
            className={`absolute left-1 top-1 w-6 h-6 rounded-full shadow bg-white transition-transform duration-300 ${
              units === "metric" ? "" : "translate-x-8"
            }`}
          ></span>
          <span
            className={`absolute left-3 top-1.5 text-blue-700 text-sm font-bold transition-colors duration-300 ${
              units === "metric" ? "opacity-100" : "opacity-50"
            }`}
          >
            °C
          </span>
          <span
            className={`absolute right-3 top-1.5 text-pink-700 text-sm font-bold transition-colors duration-300 ${
              units === "imperial" ? "opacity-100" : "opacity-50"
            }`}
          >
            °F
          </span>
        </button>
      </div>
      <div className="flex justify-center gap-6 text-gray-200 mt-4">
        <span className="flex items-center gap-1">
          <FaTint /> {main.humidity}%
        </span>
        <span className="flex items-center gap-1">
          <FaWind /> {wind.speed} {speedUnit}
        </span>
      </div>
    </div>
  );
}
