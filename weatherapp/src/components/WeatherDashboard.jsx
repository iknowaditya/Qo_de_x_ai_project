import { useAuth } from "../context/AuthContext";
import SearchBar from "./SearchBar";
import WeatherMain from "./WeatherMain";
import WeatherDisplay from "./WeatherDisplay";
import ForecastRow from "./ForecastRow";
import ErrorMessage from "./ErrorMessage";

export default function WeatherDashboard() {
  const { user, supabase } = useAuth();

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <span className="text-white text-xl font-bold">Weather Dashboard</span>
        <div className="flex items-center gap-2">
          <span className="text-white text-sm">{user?.email}</span>
          <button
            className="text-sm bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg shadow transition"
            onClick={() => supabase.auth.signOut()}
          >
            Logout
          </button>
        </div>
      </div>
      <SearchBar />
      <ErrorMessage />
      <WeatherMain />
      <WeatherDisplay />
      <ForecastRow />
    </div>
  );
}
