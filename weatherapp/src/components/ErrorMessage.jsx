import { useWeather } from "../context/WeatherContext";

export default function ErrorMessage() {
  const { error } = useWeather();
  if (!error) return null;
  return (
    <div className="bg-red-200 text-red-800 rounded p-2 mb-4 text-center">
      {error}
    </div>
  );
}
