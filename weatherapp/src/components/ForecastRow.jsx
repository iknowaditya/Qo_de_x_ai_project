import { useWeather } from "../context/WeatherContext";
import ForecastDay from "./ForecastDay";

export default function ForecastRow() {
  const { forecast, forecastLoading } = useWeather();

  if (forecastLoading)
    return <div className="text-center text-white">Loading forecast...</div>;

  // Show placeholders if no forecast data
  if (!forecast?.list)
    return (
      <div className="flex justify-between mt-6 px-2 overflow-x-auto">
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-white/20 rounded p-2 flex flex-col items-center w-16"
          >
            <div className="text-sm font-medium text-white">--</div>
            <div className="text-lg font-bold text-white">--°</div>
          </div>
        ))}
      </div>
    );

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
