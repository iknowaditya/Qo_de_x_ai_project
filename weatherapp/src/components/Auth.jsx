import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { FcGoogle } from "react-icons/fc";
import { FaExclamationCircle } from "react-icons/fa";

export default function Auth() {
  const { supabase } = useAuth();
  const [mode, setMode] = useState("login"); // "login" or "signup"
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle login or sign up
  const handleAuth = async () => {
    setError("");
    setLoading(true);
    let result;
    if (mode === "login") {
      result = await supabase.auth.signInWithPassword({ email, password });
    } else {
      result = await supabase.auth.signUp({
        email,
        password,
        options: { data: { name } },
      });
      // If sign up is successful, try to log in immediately
      if (!result.error) {
        // You may want to check result.data.session or just call signInWithPassword
        await supabase.auth.signInWithPassword({ email, password });
      }
    }
    setLoading(false);
    if (result.error) setError(result.error.message);
  };

  // Google OAuth
  const handleGoogleLogin = async () => {
    setError("");
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    setLoading(false);
    if (error) setError(error.message);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] w-full">
      <form
        className="bg-white/20 backdrop-blur-2xl rounded-2xl shadow-2xl p-10 flex flex-col gap-6 w-full max-w-sm border border-white/30"
        onSubmit={(e) => {
          e.preventDefault();
          handleAuth();
        }}
      >
        <h2 className="text-3xl font-extrabold text-center text-white mb-2 tracking-wide drop-shadow">
          {mode === "login" ? "Welcome Back!" : "Create Account"}
        </h2>
        {mode === "signup" && (
          <input
            className="rounded-lg px-4 py-3 w-full bg-white/80 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-lg"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            autoComplete="name"
            required
          />
        )}
        <input
          className="rounded-lg px-4 py-3 w-full bg-white/80 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-lg"
          placeholder="Email (any string for demo)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
        />
        <input
          className="rounded-lg px-4 py-3 w-full bg-white/80 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-lg"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          autoComplete={mode === "login" ? "current-password" : "new-password"}
          required
        />

        <button
          className={`w-full py-3 rounded-lg font-bold text-lg shadow transition 
            ${
              mode === "login"
                ? "bg-blue-500 hover:bg-blue-600 text-white"
                : "bg-green-500 hover:bg-green-600 text-white"
            }
            ${loading ? "opacity-60 cursor-not-allowed" : ""}
          `}
          disabled={loading}
          type="submit"
        >
          {loading ? "..." : mode === "login" ? "Login" : "Sign Up"}
        </button>
        <div className="flex items-center my-2">
          <div className="flex-grow border-t border-gray-300" />
          <span className="mx-2 text-gray-400">or</span>
          <div className="flex-grow border-t border-gray-300" />
        </div>
        <button
          type="button"
          className="flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-gray-800 px-4 py-3 rounded-lg shadow transition font-semibold text-lg"
          onClick={handleGoogleLogin}
          disabled={loading}
        >
          <FcGoogle size={24} /> Continue with Google
        </button>
        {error && (
          <div className="flex items-center gap-2 text-red-500 text-center bg-red-100/80 rounded px-3 py-2 mt-2 animate-shake">
            <FaExclamationCircle /> <span className="text-sm">{error}</span>
          </div>
        )}
        <div className="text-center mt-2 text-white/80 text-sm">
          {mode === "login" ? (
            <>
              Don't have an account?{" "}
              <button
                type="button"
                className="underline hover:text-green-400 transition"
                onClick={() => {
                  setMode("signup");
                  setError("");
                }}
              >
                Sign up
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                type="button"
                className="underline hover:text-blue-400 transition"
                onClick={() => {
                  setMode("login");
                  setError("");
                }}
              >
                Login
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
}
