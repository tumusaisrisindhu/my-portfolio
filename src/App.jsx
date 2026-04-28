import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Resume from "./components/Resume";
import Certifications from "./components/Certifications";
import HelloIntro from "./components/HelloIntro";
import Footer from "./components/Footer";

import TodoPage from "./pages/TodoPage";
import WeatherPage from "./pages/WeatherPage";

// ✅ Main layout
function MainLayout({ theme, setTheme }) {
  return (
    <div className="py-20 bg-white text-black dark:bg-black dark:text-white transition-colors duration-300">
      <Navbar theme={theme} setTheme={setTheme} />

      <Hero />
      <About />
      <Projects />
      <Resume />
      <Certifications />

      <Footer />
    </div>
  );
}

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  useEffect(() => {
    const root = document.documentElement;

    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");

    localStorage.setItem("theme", theme);
  }, [theme]);

  if (showIntro) {
    return <HelloIntro onFinish={() => setShowIntro(false)} />;
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<MainLayout theme={theme} setTheme={setTheme} />}
        />
        <Route path="/projects/todo" element={<TodoPage />} />
        <Route path="/projects/weather" element={<WeatherPage />} />

        {/* TEMP placeholders (better UX than empty div) */}
        <Route path="/projects/interest" element={<ComingSoon />} />
        <Route path="/projects/converter" element={<ComingSoon />} />
        <Route path="/projects/tictactoe" element={<ComingSoon />} />
      </Routes>
    </Router>
  );
}

function ComingSoon() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <h1 className="text-3xl text-green-400">
        🚧 Project in progress — coming soon
      </h1>
    </div>
  );
}

export default App;
