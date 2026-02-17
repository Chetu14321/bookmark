"use client";

import { supabase } from "@/lib/supabase";

export default function Login() {
  const login = async () => {
    await supabase.auth.signInWithOAuth({
  provider: "google",
  options: {
    redirectTo: "http://localhost:3000/auth/callback",
  },
});

  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Login</h1>
      <button onClick={login}>Login with Google</button>
    </div>
  );
}
