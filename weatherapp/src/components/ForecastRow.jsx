import { useWeather } from "../context/WeatherContext";
import ForecastDay from "./ForecastDay";

export default function ForecastRow() {
  const { forecast, forecastLoading } = useWeather();
  if (forecastLoading || !forecast?.list) return null;

  // Filter: one forecast per day (12:00)
  const daily = [];
  const seen = {};
  forecast.list.forEach((item) => {
    const date = new Date(item.dt * 1000);
    const day = date.toLocaleDateString();
    if (!seen[day] && item.dt_txt.includes("12:00:00")) {
      daily.push(item);
      seen[day] = true;
    }
  });

  return (
    <div className="flex justify-between mt-6 px-2 overflow-x-auto">
      {daily.map((item, idx) => (
        <ForecastDay key={idx} day={item} />
      ))}
    </div>
  );
}
