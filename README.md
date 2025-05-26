# 🌦️ Weather Dashboard App

A modern, glassmorphic weather dashboard built with **React**, **Vite**, **Tailwind CSS**, **Supabase Auth** (Email/Password + Google), and **OpenWeatherMap API**.  
Features live weather, 5-day forecast, Celsius/Fahrenheit toggle, and secure authentication.

---

## 🚀 Features

- **User Authentication**  
  - Email/password sign up & login  
  - Google OAuth login  
  - User profile (name) on sign up  
  - Demo mode: no strict email validation, no email confirmation required

- **Weather Dashboard**
  - Search weather by city or use your current location
  - Live current weather: temperature, humidity, wind, icon & description
  - 5-day forecast (one per day, with icons)
  - Celsius/Fahrenheit toggle (stylish pill switch)
  - Polls weather data every 30 seconds for live updates

- **UI/UX**
  - Sleek glassmorphic design with modern cards & transitions
  - Animated error messages and feedback
  - Responsive and mobile-friendly
  - Logout button and user email display

---

## 🛠️ Tech Stack

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Supabase](https://supabase.com/) (Auth & user data)
- [OpenWeatherMap API](https://openweathermap.org/api)
- [React Query](https://tanstack.com/query/latest) (data fetching/caching)
- [Axios](https://axios-http.com/)
- [React Icons](https://react-icons.github.io/react-icons/)

---

## 📦 Folder Structure

# 🌦️ Sleek Weather Dashboard App

A modern, glassmorphic weather dashboard built with **React**, **Vite**, **Tailwind CSS**, **Supabase Auth** (Email/Password + Google), and **OpenWeatherMap API**.  
Features live weather, 5-day forecast, Celsius/Fahrenheit toggle, and secure authentication.

---

## 🚀 Features

- **User Authentication**  
  - Email/password sign up & login  
  - Google OAuth login  
  - User profile (name) on sign up  
  - Demo mode: no strict email validation, no email confirmation required

- **Weather Dashboard**
  - Search weather by city or use your current location
  - Live current weather: temperature, humidity, wind, icon & description
  - 5-day forecast (one per day, with icons)
  - Celsius/Fahrenheit toggle (stylish pill switch)
  - Polls weather data every 30 seconds for live updates

- **UI/UX**
  - Sleek glassmorphic design with modern cards & transitions
  - Animated error messages and feedback
  - Responsive and mobile-friendly
  - Logout button and user email display

---

## 🛠️ Tech Stack

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Supabase](https://supabase.com/) (Auth & user data)
- [OpenWeatherMap API](https://openweathermap.org/api)
- [React Query](https://tanstack.com/query/latest) (data fetching/caching)
- [Axios](https://axios-http.com/)
- [React Icons](https://react-icons.github.io/react-icons/)

---

## 📦 Folder Structure

src/
├── assets/
├── components/
│ ├── Auth.jsx
│ ├── ErrorMessage.jsx
│ ├── ForecastDay.jsx
│ ├── ForecastRow.jsx
│ ├── SearchBar.jsx
│ ├── WeatherDashboard.jsx
│ ├── WeatherDisplay.jsx
│ └── WeatherMain.jsx
├── context/
│ ├── AuthContext.jsx
│ └── WeatherContext.jsx
├── utils/
│ └── api.js
├── App.jsx
├── App.css
├── index.css
└── main.jsx

---

### 3. **Set up environment variables**

Create a `.env` file in the root:

VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
VITE_OPENWEATHERMAP_API_KEY=your-openweathermap-api-key


---

## 🔑 Supabase Setup

- Create a [Supabase](https://supabase.com/) project.
- Enable **Google** provider in Auth settings (add the callback URL to Google Cloud Console).
- Turn off "Confirm email" for demo mode (in Auth settings).
- Copy your Project URL and anon key to your `.env`.

---

## 🌐 API Setup

- Get a free API key from [OpenWeatherMap](https://openweathermap.org/api) and add it to your `.env`.

---

## 🙏 Credits

- Weather data: [OpenWeatherMap](https://openweathermap.org/)
- Auth backend: [Supabase](https://supabase.com/)
- UI inspiration: [Glassmorphism](https://glassmorphism.com/)

---

## 📄 License

MIT

---

## 💡 Customization

- You can easily switch to strict email validation or require email confirmation by adjusting Supabase Auth settings.
- To use in production, re-enable email confirmation and use stronger password policies.

---

**Enjoy your beautiful weather dashboard!**


