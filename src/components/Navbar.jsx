import { useEffect, useState } from "react";

const sections = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "resume", label: "Resume" },
  { id: "certifications", label: "Certs" },
];

function Navbar({ theme, setTheme }) {
  const [active, setActive] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      sections.forEach((sec) => {
        const el = document.getElementById(sec.id);
        if (el) {
          if (
            scrollY >= el.offsetTop - 120 &&
            scrollY < el.offsetTop + el.offsetHeight
          ) {
            setActive(sec.id);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full z-40 backdrop-blur-md bg-white/70 dark:bg-black/70 border-b border-gray-300 dark:border-gray-800">
      <div className="flex justify-between items-center px-6 py-4">
        {/* LOGO */}
        <h1
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            })
          }
          className="font-bold text-lg tracking-wide cursor-pointer"
        >
          Sai Sri Sindhu
        </h1>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex space-x-8">
          {sections.map((sec) => (
            <a
              key={sec.id}
              href={`#${sec.id}`}
              className="relative group text-sm font-medium"
            >
              <span
                className={`transition ${
                  active === sec.id
                    ? "text-green-400"
                    : "text-gray-600 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white"
                }`}
              >
                {sec.label}
              </span>

              {/* Animated underline */}
              <span
                className={`absolute left-0 -bottom-1 h-[2px] bg-green-400 transition-all duration-300 ${
                  active === sec.id ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </a>
          ))}
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4">
          {/* THEME TOGGLE */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="text-xl hover:scale-110 transition"
          >
            {theme === "dark" ? "🌙" : "☀️"}
          </button>

          {/* MOBILE MENU BUTTON */}
          <button
            className="md:hidden text-xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col items-center py-4 bg-white/90 dark:bg-black/90 backdrop-blur-md">
          {sections.map((sec) => (
            <a
              key={sec.id}
              href={`#${sec.id}`}
              onClick={() => setMenuOpen(false)}
              className={`py-2 text-lg ${
                active === sec.id
                  ? "text-green-400"
                  : "text-gray-600 dark:text-gray-400"
              }`}
            >
              {sec.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
