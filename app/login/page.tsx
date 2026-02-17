"use client";

import { supabase } from "@/lib/supabase";

export default function Login() {
  const login = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 text-center space-y-6">
        
        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-800">
          Smart Bookmark App
        </h1>

        <p className="text-gray-500 text-sm">
          Save and manage your bookmarks in realtime.
        </p>

        {/* Login Button */}
        <button
          onClick={login}
          className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-3 font-semibold hover:bg-gray-50 transition"
        >
          {/* Google Icon */}
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          Continue with Google
        </button>

      </div>
    </div>
  );
}
