import React, { createContext, useContext, useState, useEffect } from "react";
import { fetchWeather, fetchForecast } from "../utils/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "./AuthContext";

const WeatherContext = createContext();

export function WeatherProvider({ children }) {
  const [city, setCity] = useState(localStorage.getItem("lastCity") || "");
  const [coords, setCoords] = useState(null);
  const [units, setUnits] = useState(localStorage.getItem("units") || "metric"); // "metric" or "imperial"
  const [error, setError] = useState("");
  const [locationLoaded, setLocationLoaded] = useState(false);
  const { user, supabase } = useAuth();
  const queryClient = useQueryClient();

  // Geolocation on mount
  useEffect(() => {
    if (!city) {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            setCoords({ lat: pos.coords.latitude, lon: pos.coords.longitude });
            setLocationLoaded(true);
          },
          () => {
            setCity("Delhi");
            setLocationLoaded(true);
          }
        );
      } else {
        setCity("Delhi");
        setLocationLoaded(true);
      }
    } else {
      setLocationLoaded(true);
    }
  }, [city]);

  // Save last city/unit to localStorage
  useEffect(() => {
    if (city) localStorage.setItem("lastCity", city);
  }, [city]);
  useEffect(() => {
    localStorage.setItem("units", units);
  }, [units]);

  // Save last search to Supabase for logged-in user
  useEffect(() => {
    if (user && city) {
      supabase
        .from("weather_searches")
        .insert([{ user_id: user.id, city, units }]);
    }
  }, [user, city, units, supabase]);

  // Query keys
  const weatherKey = coords
    ? ["weather", coords.lat, coords.lon, units]
    : ["weather", city, units];
  const forecastKey = coords
    ? ["forecast", coords.lat, coords.lon, units]
    : ["forecast", city, units];

  // React Query: Weather
  const {
    data: weather,
    isLoading: weatherLoading,
    error: weatherError,
    refetch: refetchWeather,
  } = useQuery({
    queryKey: weatherKey,
    queryFn: () =>
      coords
        ? fetchWeather("", coords.lat, coords.lon, units)
        : fetchWeather(city, undefined, undefined, units),
    enabled: !!locationLoaded,
    refetchInterval: 30000,
    onError: (err) => {
      // Axios error: err.response?.status === 404 means city not found
      if (err?.response?.status === 404) {
        setError(
          "City/place not found. Please check your spelling and try again."
        );
      } else {
        setError("Weather API error: " + (err?.message || "Unknown error"));
      }
    },
  });

  // React Query: Forecast
  const {
    data: forecast,
    isLoading: forecastLoading,
    error: forecastError,
    refetch: refetchForecast,
  } = useQuery({
    queryKey: forecastKey,
    queryFn: () =>
      coords
        ? fetchForecast("", coords.lat, coords.lon, units)
        : fetchForecast(city, undefined, undefined, units),
    enabled: !!locationLoaded,
    refetchInterval: 30000,
    onError: (err) => {
      if (err?.response?.status === 404) {
        setError(
          "City/place not found. Please check your spelling and try again."
        );
      } else {
        setError("Forecast API error: " + (err?.message || "Unknown error"));
      }
    },
  });

  // Search handler
  const searchCity = (cityName) => {
    setCoords(null);
    setCity(cityName);
    setError("");
    queryClient.invalidateQueries({ queryKey: ["weather"] });
    queryClient.invalidateQueries({ queryKey: ["forecast"] });
  };

  // Units toggle
  const toggleUnits = () =>
    setUnits(units === "metric" ? "imperial" : "metric");

  return (
    <WeatherContext.Provider
      value={{
        city,
        setCity: searchCity,
        coords,
        setCoords,
        weather,
        forecast,
        error,
        weatherLoading,
        forecastLoading,
        searchCity,
        units,
        toggleUnits,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
}

export function useWeather() {
  return useContext(WeatherContext);
}
