import { WeatherProvider } from "./context/WeatherContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import WeatherDashboard from "./components/WeatherDashboard";
import Auth from "./components/Auth";

function MainContent() {
  const { user, authLoading } = useAuth();
  if (authLoading)
    return <div className="text-white text-center">Loading...</div>;
  return user ? <WeatherDashboard /> : <Auth />;
}

export default function App() {
  return (
    <AuthProvider>
      <WeatherProvider>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-800 via-slate-700 to-slate-500">
          <div className="rounded-2xl shadow-2xl bg-white/10 backdrop-blur-md p-8 w-full max-w-xl flex flex-col items-center">
            <MainContent />
          </div>
        </div>
      </WeatherProvider>
    </AuthProvider>
  );
}
