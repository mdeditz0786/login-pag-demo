"use client";

import Link from "next/link";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/dashboard");
      }
    });
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600">
      <div className="bg-white rounded-xl shadow-lg p-10 w-96 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Welcome 🚀
        </h1>

        <p className="text-gray-500 mb-8">
          Login or create an account to continue
        </p>

        <div className="flex gap-4">
          <Link
            href="/login"
            className="w-full py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold"
          >
            Login
          </Link>

          <Link
            href="/signup"
            className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold"
          >
            Signup
          </Link>
        </div>
      </div>
    </div>
  );
}
