'use client';

import { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState('');
  const [bgColor, setBgColor] = useState('#f0f2f5'); // Default light gray

  // 🔹 AI Chat state
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

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

  // 🔹 Send message to OpenAI
  const sendMessage = async () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { role: 'user', text: input }]);
    setLoading(true);
    setInput('');

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { role: 'ai', text: data.reply },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'ai', text: '❌ AI error' },
      ]);
    }

    setLoading(false);
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
            <p className="text-gray-500">AI Powered Dashboard</p>
          </div>
          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg shadow-md transition-all duration-300"
          >
            Logout
          </button>
        </header>

        {/* 🤖 AI Chat Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 h-[500px] flex flex-col">
          <h3 className="text-2xl font-semibold mb-4 text-gray-900">🤖 AI Assistant</h3>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto mb-4 space-y-3 p-2">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-md px-5 py-3 rounded-xl shadow-sm ${
                  m.role === 'user'
                    ? 'ml-auto bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-800'
                }`}
              >
                {m.text}
              </div>
            ))}
            {loading && (
              <p className="text-gray-500 text-sm">AI is thinking...</p>
            )}
          </div>

          {/* Input */}
          <div className="flex gap-3">
            <input
              className="flex-1 bg-gray-200 border border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              placeholder="Ask AI something..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            />
            <button
              onClick={sendMessage}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow-md transition-all duration-300"
            >
              Send
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
