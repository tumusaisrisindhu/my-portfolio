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

import UnitConverter from "./pages/UnitConverter";
import TodoPage from "./pages/TodoPage";
import WeatherPage from "./pages/WeatherPage";
import Housie from "./pages/housie";
import TicTacToePage from "./pages/TicTacToe/TicTacToePage";
import CalculatorPage from "./pages/calculators/CalculatorPage";

// ✅ Main layout
function MainLayout({ theme, setTheme, children }) {
  return (
    <div className="py-20 bg-white text-black dark:bg-black dark:text-white transition-colors duration-300">
      <Navbar theme={theme} setTheme={setTheme} />

      {children}

      <Footer />
    </div>
  );
}

function App() {
  const [showIntro, setShowIntro] = useState(() => {
    return localStorage.getItem("introSeen") !== "true";
  });
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  useEffect(() => {
    const root = document.documentElement;

    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");

    localStorage.setItem("theme", theme);
  }, [theme]);

  if (showIntro) {
    return (
      <HelloIntro
        onFinish={() => {
          localStorage.setItem("introSeen", "true");
          setShowIntro(false);
        }}
      />
    );
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout theme={theme} setTheme={setTheme}>
              <Hero />
              <About />
              <Projects />
              <Resume />
              <Certifications />
            </MainLayout>
          }
        />

        <Route
          path="/projects/todo"
          element={
            <MainLayout theme={theme} setTheme={setTheme}>
              <TodoPage />
            </MainLayout>
          }
        />

        <Route
          path="/projects/weather"
          element={
            <MainLayout theme={theme} setTheme={setTheme}>
              <WeatherPage />
            </MainLayout>
          }
        />

        <Route
          path="/projects/converter"
          element={
            <MainLayout theme={theme} setTheme={setTheme}>
              <UnitConverter />
            </MainLayout>
          }
        />

        <Route
          path="/projects/housie"
          element={
            <MainLayout theme={theme} setTheme={setTheme}>
              <Housie />
            </MainLayout>
          }
        />

        <Route
          path="/projects/calculators"
          element={
            <MainLayout theme={theme} setTheme={setTheme}>
              <CalculatorPage />
            </MainLayout>
          }
        />

        <Route
          path="/projects/tic-tac-toe"
          element={
            <MainLayout theme={theme} setTheme={setTheme}>
              <TicTacToePage />
            </MainLayout>
          }
        />
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
