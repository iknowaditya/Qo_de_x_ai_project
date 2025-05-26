export default function ForecastDay({ day }) {
  const date = new Date(day.dt * 1000);
  const weekday = date.toLocaleDateString([], { weekday: "short" });

  return (
    <div className="flex flex-col items-center text-white min-w-[60px]">
      <span>{weekday}</span>
      <img
        src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
        alt={day.weather[0].main}
        className="w-8 h-8"
      />
      <span>{Math.round(day.main.temp)}°</span>
    </div>
  );
}
