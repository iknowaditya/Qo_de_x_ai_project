import { useWeather } from "../context/WeatherContext";

export default function WeatherMain() {
  const { weather, weatherLoading } = useWeather();

  if (weatherLoading)
    return <div className="text-white text-center">Loading...</div>;
  if (!weather) return null;

  const date = new Date();
  const time = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const day = date.toLocaleDateString([], { weekday: "long" });

  return (
    <div className="flex flex-col items-center mb-6">
      <div className="flex justify-between w-full mb-4">
        <span className="text-white text-lg">Weather Dashboard</span>
        <span className="text-white">
          {weather.name} | {time}
        </span>
      </div>
    </div>
  );
}
