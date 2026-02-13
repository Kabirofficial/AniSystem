# AniSystem 🌸

**The production-grade, local-first media tracker for Anime and TV Shows.**

![AniSystem Banner](/public/logo.png)

## 🚀 Overview

**AniSystem** is a modern, privacy-focused application designed to track your watching habits without relying on external servers for data persistence. Built with **React 18** and **Vite**, it leverages `localStorage` for a zero-latency, offline-capable experience while fetching rich metadata from **AniList** (Anime) and **TVmaze** (TV Shows).

> **Status**: Production Ready (v1.0.0)

## ✨ Key Features

-   **🔒 Privacy First**: All user data lives in your browser. No accounts, no tracking, no servers.
-   **⚡ Zero Latency**: Instant interactions powered by optimistic UI updates and local persistence.
-   **📅 Release Calendar**: Visual schedule of upcoming episodes for your tracked series.
-   **🔔 Smart Notifications**: Browser alerts for new episodes (configurable).
-   **🌗 Dark Mode Native**: Designed with a sleek, high-contrast dark theme by default.
-   **📱 Fully Responsive**: Optimized for Desktop, Tablet, and Mobile devices.
-   **🔍 Dual-Source Search**: Seamlessly search across Anime and Western TV shows.

## 🛠️ Tech Stack

-   **Frontend Engine**: [React 18](https://react.dev/) + [Vite](https://vitejs.dev/)
-   **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
-   **State Management**: [Zustand](https://github.com/pmndrs/zustand) + Persist Middleware
-   **Data Fetching**: Custom hooks for AniList GraphQL & TVmaze REST APIs
-   **Routing**: [React Router v6](https://reactrouter.com/)
-   **SEO**: `react-helmet-async` for dynamic metadata
-   **Icons**: `lucide-react`

## 📦 Getting Started

### Prerequisites

-   Node.js 18+
-   npm or yarn

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/anisystem.git
    cd anisystem
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Start the development server**
    ```bash
    npm run dev
    ```
    Open `http://localhost:5173` to view it in the browser.

## 🚢 Deployment

AniSystem is optimized for **Vercel**.

1.  **Build for production**
    ```bash
    npm run build
    ```

2.  **Preview the build**
    ```bash
    npm run preview
    ```

3.  **Deploy to Vercel**
    -   Push your code to GitHub/GitLab.
    -   Import the project in Vercel.
    -   Framework preset: **Vite**.
    -   Click **Deploy**.

## 📂 Project Structure

```bash
src/
├── api/              # API clients (AniList, TVmaze)
├── components/       # Reusable UI components (Navbar, Cards, etc.)
├── layouts/          # Page layouts (MainLayout, Sidebar)
├── pages/            # Route components (Dashboard, Details, Search)
├── store/            # Global state (Zustand)
└── App.jsx           # Main entry point with Routing
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

*Designed and built for the community.*
