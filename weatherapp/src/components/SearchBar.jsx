import { useState } from "react";
import { useWeather } from "../context/WeatherContext";

export default function SearchBar() {
  const { searchCity, weatherLoading } = useWeather();
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      searchCity(input.trim());
      setInput("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <input
        type="text"
        className="border rounded px-3 py-2 w-full"
        placeholder="Enter city name..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={weatherLoading}
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
        disabled={weatherLoading}
      >
        Search
      </button>
    </form>
  );
}
