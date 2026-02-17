"use client";

import { useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function CallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const handleAuth = async () => {
      // 🔥 VERY IMPORTANT
      // This reads #access_token from URL and saves session
      await supabase.auth.getSession();

      // Clean URL and go home
      router.replace("/");
    };

    handleAuth();
  }, [router]);

  return <p>Signing you in...</p>;
}
