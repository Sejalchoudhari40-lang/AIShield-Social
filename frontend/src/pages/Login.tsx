import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Logo from "../components/Logo";
import InputField from "../components/InputField";
import Button from "../components/Button";

import { login } from "../services/auth";
import { saveToken } from "../utils/auth";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please fill all fields.");
      return;
    }

    setLoading(true);

    try {
      const data = await login(email, password);

      saveToken(data.access_token);

      alert("Login Successful ✅");

      navigate("/home");

    } catch (error) {
      console.error(error);
      alert("Invalid Email or Password ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 flex items-center justify-center px-4">

      <div className="absolute h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl left-10 top-10"></div>
      <div className="absolute h-72 w-72 rounded-full bg-purple-500/20 blur-3xl right-10 bottom-10"></div>

      <div className="relative w-full max-w-md rounded-3xl border border-white/10 bg-white/10 backdrop-blur-2xl p-8 shadow-2xl">

        <Logo />

        <div className="mt-8 space-y-5">

          <InputField
            label="Email"
            placeholder="example@gmail.com"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <InputField
            label="Password"
            placeholder="••••••••"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            text={loading ? "Logging in..." : "Login 🚀"}
            onClick={handleLogin}
          />

        </div>

        <p className="mt-6 text-center text-gray-300 text-sm">
          Don't have an account?

          <span className="ml-2 cursor-pointer text-cyan-400 font-semibold hover:text-cyan-300">
            Sign Up
          </span>

        </p>

      </div>

    </div>
  );
}

export default Login;