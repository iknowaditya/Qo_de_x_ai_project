import axios from "axios";

// Use the API key from environment variables
const API_KEY = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;

export const fetchWeather = async (city, lat, lon, units = "metric") => {
  let url;
  if (lat && lon) {
    url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${units}`;
  } else {
    url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${units}`;
  }
  const res = await axios.get(url);
  return res.data;
};

export const fetchForecast = async (city, lat, lon, units = "metric") => {
  let url;
  if (lat && lon) {
    url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${units}`;
  } else {
    url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=${units}`;
  }
  const res = await axios.get(url);
  return res.data;
};
