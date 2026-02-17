"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { User, RealtimeChannel } from "@supabase/supabase-js";

type Bookmark = {
  id: string;
  title: string;
  url: string;
};

export default function Home() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(true);

  /* ---------- FETCH ---------- */
  const fetchBookmarks = async () => {
    const { data } = await supabase
      .from("bookmarks")
      .select("*")
      .order("created_at", { ascending: false });

    setBookmarks(data || []);
  };

  /* ---------- ADD ---------- */
  const addBookmark = async () => {
  if (!title || !url || !user) return;

  await supabase.from("bookmarks").insert({
    title,
    url,
    user_id: user.id,
  });

  // 🔥 instantly refresh UI
  await fetchBookmarks();

  setTitle("");
  setUrl("");
};


  /* ---------- DELETE ---------- */
 const deleteBookmark = async (id: string) => {
  await supabase.from("bookmarks").delete().eq("id", id);

  // 🔥 instantly refresh current tab
  await fetchBookmarks();
};


  /* ---------- AUTH INIT ---------- */
  useEffect(() => {
    let channel: RealtimeChannel | null = null;

    // 🔥 VERY IMPORTANT — get session first
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        router.push("/login");
        setLoading(false);
        return;
      }

      setUser(data.session.user);
      fetchBookmarks();
      setLoading(false);
    });

    // 🔥 LISTEN FOR LOGIN EVENT
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user) {
          setUser(session.user);
          fetchBookmarks();
        }
      }
    );

    // 🔥 REALTIME
    channel = supabase
      .channel("realtime-bookmarks")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "bookmarks" },
        fetchBookmarks
      )
      .subscribe();

    return () => {
      listener.subscription.unsubscribe();
      if (channel) supabase.removeChannel(channel);
    };
  }, [router]);

  if (loading) return <p>Loading...</p>;

  /* ---------- UI ---------- */
  /* ---------- UI ---------- */
return (
  <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
    <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-6 space-y-6">
      
      <h1 className="text-2xl font-bold text-center text-gray-800">
        Smart Bookmark App
      </h1>

      {/* Add Form */}
      <div className="space-y-3">
        <input
          className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <button
          onClick={addBookmark}
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Add Bookmark
        </button>
      </div>

      <hr />

      {/* Bookmark List */}
      <div className="space-y-3">
        {bookmarks.length === 0 && (
          <p className="text-center text-gray-500">No bookmarks yet.</p>
        )}

        {bookmarks.map((b) => (
          <div
            key={b.id}
            className="flex items-center justify-between bg-gray-50 border rounded-xl px-4 py-3"
          >
            <a
              href={b.url}
              target="_blank"
              className="text-blue-600 font-medium hover:underline"
            >
              {b.title}
            </a>

            <button
              onClick={() => deleteBookmark(b.id)}
              className="text-sm bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  </div>
);

}
