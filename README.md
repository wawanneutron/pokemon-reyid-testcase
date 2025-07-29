# 🧠 Pokédex App

A modern Pokédex web app built using **Next.js**, **React**, **Material UI**, and **PokeAPI**. This app allows users to browse Pokémon by type, view detailed information, and explore evolution chains.

## 🚀 Live Demo

👉 [Deployment Link](https://your-deployment-link.vercel.app)

---

## ⚒️ Setup Instructions

1. **Clone the repository:**

```bash
git clone https://github.com/wawanneutron/pokemon-reyid-testcase.git
cd pokemon-reyid-testcase
```

2. **Install dependencies:**

```bash
npm install
# or
yarn install
```

3. **Run development server:**

```bash
npm run dev
# or
yarn dev
```

4. Open `http://localhost:3000` in your browser.

---

## ✅ Features Implemented

- 🏠 Welcome modal shown on first visit using `sessionStorage`
- 📚 Browse Pokémon list with filters by type
- 🧬 View Pokémon evolution chains with navigation to each
- 🔎 Fetch Pokémon details with pagination
- 🌈 Type-based accent background and colors
- 🌟 Responsive UI with Material UI components
- 🔀 Reusable pagination hook and modular hooks for fetching data
- 🔗 Dynamic routing with query params (e.g., `/pokemon/type?name=fire`)

---

## 💡 Technical Decisions

- **Next.js App Router** was chosen for flexible routing and server/client components.
- **React Query** (`@tanstack/react-query`) was used for data fetching, caching, and background updates.
- **Material UI (MUI)** provided a clean and customizable UI component system.
- **PokeAPI** serves as the data source for all Pokémon-related info.
- **Session Storage** is used for temporary state persistence (e.g., welcome modal).
- **Pagination logic** was encapsulated into a custom `usePagination` hook for reuse.

---

## 🌱 Future Improvements

- 💬 Add search functionality for Pokémon by name
- 🔀 Support infinite scroll instead of pagination
- 💖 User favorites with localStorage or backend
- ⚡ Improve loading states with skeletons or transitions

---

## ⏱️ Time Spent

| Task                         | Time           |
| ---------------------------- | -------------- |
| Project setup + layout       | 2 hours        |
| Type filtering & fetch logic | 3 hours        |
| Evolution chain feature      | 2.5 hours      |
| UI                           | 2 hours        |
| Modal + session handling     | 1 hour         |
| Pagination + optimization    | 2 hours        |
| **Total**                    | **\~12.5 hrs** |
