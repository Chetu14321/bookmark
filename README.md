# 🔖 Smart Bookmark App

A realtime bookmark manager built with **Next.js (App Router)** and **Supabase**.

## 🚀 Live Demo

👉 https://bookmark-vert-iota.vercel.app/

---

## ✨ Features

* 🔐 Google Authentication (Supabase Auth)
* 👤 Private bookmarks per user (Row Level Security)
* ⚡ Realtime updates across tabs
* ➕ Add bookmarks
* 🗑 Delete bookmarks
* 🎨 Tailwind CSS modern UI
* 📱 Responsive layout

---

## 🛠 Tech Stack

* Next.js 14 (App Router + TypeScript)
* Supabase (Auth + Database + Realtime)
* Tailwind CSS
* Vercel Deployment

---

## 📦 Installation

Clone repository:

```bash
git clone https://github.com/Chetu14321/bookmark.git
cd smart-bookmark-app
npm install
```

Create `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_publishable_key
```

Run project:

```bash
npm run dev
```

---

## 🔐 Security

Row Level Security (RLS) ensures:

* Users can only see their own bookmarks
* Secure Supabase policies enforced

---

## ⚡ Realtime

Supabase realtime channels update bookmarks instantly across browser tabs.

---

## 🧠 Challenges & Solutions

* OAuth redirect loop fixed using `onAuthStateChange`
* Session timing issues solved with `getSession()`
* Optimistic UI updates added for smooth UX

---

## 📄 License

This project was built as part of a technical assignment.
