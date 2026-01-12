'use client';

import { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState('');
  const [bgColor, setBgColor] = useState('#f0f2f5'); // Default light gray

  const colorPalette = ['#f0f2f5', '#e0e7ff', '#fef3c7', '#fecaca', '#d1fae5'];

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push('/login');
      } else {
        setUserEmail(user.email);
      }
    });
    return () => unsub();
  }, [router]);

  const logout = async () => {
    await signOut(auth);
    router.push('/login');
  };

  return (
    <div style={{ backgroundColor: bgColor }} className="min-h-screen flex text-gray-800 transition-colors duration-500">
      {/* Sidebar */}
      <aside className="w-64 bg-white p-6 shadow-md">
        <h1 className="text-3xl font-bold mb-8 text-gray-900">Dashboard</h1>
        <nav>
          <ul>
            <li className="mb-4 text-gray-700 hover:text-blue-600 cursor-pointer">🏠 Home</li>
            <li className="mb-4 text-gray-700 hover:text-blue-600 cursor-pointer">📊 Analytics</li>
            <li className="mb-4 text-gray-700 hover:text-blue-600 cursor-pointer">⚙️ Settings</li>
          </ul>
        </nav>

        {/* Color Palette */}
        <div className="mt-10">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Theme Color</h3>
            <div className="flex gap-3">
                {colorPalette.map(color => (
                    <button 
                        key={color} 
                        style={{ backgroundColor: color }}
                        className="w-8 h-8 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-transform transform hover:scale-110"
                        onClick={() => setBgColor(color)}
                    />
                ))}
            </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        {/* Header */}
        <header className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-4xl font-bold text-gray-900">
              Welcome, {userEmail || 'User'} 👋
            </h2>
            <p className="text-gray-500">Your personal dashboard</p>
          </div>
          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg shadow-md transition-all duration-300"
          >
            Logout
          </button>
        </header>

      </main>
    </div>
  );
}
