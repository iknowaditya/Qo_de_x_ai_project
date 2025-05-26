import { useWeather } from "../context/WeatherContext";
import { FaExclamationTriangle } from "react-icons/fa";

export default function ErrorMessage() {
  const { error } = useWeather();
  if (!error) return null;
  return (
    <div className="flex items-center gap-2 bg-red-100 border border-red-300 text-red-700 rounded-lg px-4 py-3 mb-4 shadow animate-shake">
      <FaExclamationTriangle className="text-red-500" />
      <span>{error}</span>
    </div>
  );
}
