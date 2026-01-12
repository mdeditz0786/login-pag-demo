"use client";

import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] = useState(""); // success | error
  const router = useRouter();

  const handleSignup = async () => {
    setMessage("");

    if (!email || !password) {
      setType("error");
      setMessage("❌ Please fill all fields");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);

      setType("success");
      setMessage("✅ Account created successfully!");

      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch (error) {
      setType("error");

      if (error.code === "auth/email-already-in-use") {
        setMessage("❌ Email already registered");
      } else if (error.code === "auth/weak-password") {
        setMessage("❌ Password must be at least 6 characters");
      } else if (error.code === "auth/invalid-email") {
        setMessage("❌ Invalid email format");
      } else {
        setMessage("❌ Signup failed");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-96">
        <h2 className="text-3xl font-bold text-center mb-6">Signup</h2>

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
            type="email"
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
          onClick={handleSignup}
          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300"
        >
          Signup
        </button>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link href="/login" className="text-green-400 hover:text-green-300 font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
