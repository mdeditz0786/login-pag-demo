"use client";

import { useState } from "react";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../../firebase";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] = useState(""); // success | error
  const router = useRouter();

  // 🔹 Email/Password login
  const handleLogin = async () => {
    setMessage("");

    try {
      await signInWithEmailAndPassword(auth, email, password);

      setType("success");
      setMessage("✅ Login successful! Redirecting...");

      setTimeout(() => {
        router.push("/dashboard");
      }, 1500);
    } catch (error) {
      setType("error");

      if (error.code === "auth/user-not-found") {
        setMessage("❌ Email not registered");
      } else if (error.code === "auth/wrong-password") {
        setMessage("❌ Wrong password");
      } else {
        setMessage("❌ Login failed");
      }
    }
  };

  // 🔹 Forgot Password
  const handleForgotPassword = async () => {
    if (!email) {
      setType("error");
      setMessage("❌ Please enter your email first");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setType("success");
      setMessage("✅ Password reset email sent! Check your inbox.");
    } catch (error) {
      setType("error");
      setMessage("❌ Failed to send reset email");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-96">
        <h2 className="text-3xl font-bold text-center mb-6">Login</h2>

        {message && (
          <div
            className={`mb-4 p-3 rounded text-sm font-medium ${
              type === "success"
                ? "bg-green-900 text-green-300"
                : "bg-red-900 text-red-300"
            }`}
          >
            {message}
          </div>
        )}

        <div className="relative mb-4">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
          </span>
          <input
            className="w-full bg-gray-700 border border-gray-600 p-2 pl-10 rounded"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="relative mb-4">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
          </span>
          <input
            type="password"
            className="w-full bg-gray-700 border border-gray-600 p-2 pl-10 rounded"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          onClick={handleLogin}
          className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 rounded-lg font-semibold mb-2 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300"
        >
          Login
        </button>

        <button
          onClick={handleForgotPassword}
          className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white py-3 rounded-lg font-semibold mb-2 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300"
        >
          Forgot Password?
        </button>

        <p className="text-sm text-center mt-4">
          No account?{" "}
          <Link href="/signup" className="text-blue-400 hover:text-blue-300 font-semibold">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
}