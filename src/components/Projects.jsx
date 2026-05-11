import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const projects = [
  {
    title: "Interest Calculator API",
    desc: "Calculates simple and compound interest using a Python Flask backend.",
    tech: "React + Flask API",
    route: "/projects/calculators",
  },
  {
    title: "Unit Converter API",
    desc: "Converts units like temperature, weight, and length via backend logic.",
    tech: "React + Flask API",
    route: "/projects/converter",
  },
  {
    title: "Tic-Tac-Toe (API Based)",
    desc: "Game logic handled entirely in backend with API calls.",
    tech: "React + Flask API",
    route: "/projects/tic-tac-toe",
  },
  {
    title: "Weather App",
    desc: "Fetches weather data using external APIs through a backend server.",
    tech: "React + Flask API",
    route: "/projects/weather",
  },
  {
    title: "To-Do App",
    desc: "Full CRUD app with backend storage.",
    tech: "React + Flask + MySQL",
    route: "/projects/todo",
  },
  {
    title: "Housie Game",
    desc: "Interactive housie/tambola game with autoplay and history.",
    tech: "React + Flask",
    route: "/projects/housie",
  },
];

const extendedProjects = [...projects, ...projects];

function Projects() {
  const scrollRef = useRef(null);
  const isHovered = useRef(false);

  // AUTO SCROLL
  useEffect(() => {
    const interval = setInterval(() => {
      if (!scrollRef.current || isHovered.current) return;

      scrollRef.current.scrollLeft += 0.5;

      if (scrollRef.current.scrollLeft >= scrollRef.current.scrollWidth / 2) {
        scrollRef.current.scrollLeft = 0;
      }
    }, 16);

    return () => clearInterval(interval);
  }, []);

  const scroll = (dir) => {
    const amount = 320;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="projects"
      className="relative py-20 px-10 md:px-20 overflow-hidden"
    >
      {/* BACKGROUND */}
      <div className="absolute top-[-80px] left-[-80px] w-[250px] h-[250px] bg-green-400 opacity-10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-80px] right-[-80px] w-[250px] h-[250px] bg-purple-500 opacity-10 blur-[120px] rounded-full pointer-events-none"></div>

      {/* TITLE */}
      <motion.h2
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-green-400 mb-10 relative z-10"
      >
        Projects
      </motion.h2>

      <div className="relative">
        {/* FADE EDGES */}
        <div className="absolute left-0 top-0 h-full w-12 bg-gradient-to-r from-white dark:from-black to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-white dark:from-black to-transparent z-10 pointer-events-none" />

        {/* CAROUSEL */}
        <div
          ref={scrollRef}
          onMouseEnter={() => (isHovered.current = true)}
          onMouseLeave={() => (isHovered.current = false)}
          onMouseDown={(e) => {
            const el = scrollRef.current;
            el.isDown = true;
            el.startX = e.pageX - el.offsetLeft;
            el.scrollLeftStart = el.scrollLeft;
            isHovered.current = true;
          }}
          onMouseUp={() => {
            if (scrollRef.current) scrollRef.current.isDown = false;
          }}
          onMouseLeaveCapture={() => {
            if (scrollRef.current) scrollRef.current.isDown = false;
          }}
          onMouseMove={(e) => {
            const el = scrollRef.current;
            if (!el || !el.isDown) return;

            e.preventDefault();
            const x = e.pageX - el.offsetLeft;
            const walk = (x - el.startX) * 1.2;
            el.scrollLeft = el.scrollLeftStart - walk;
          }}
          className="flex gap-6 overflow-x-auto overflow-y-visible scrollbar-hide px-12 py-6 cursor-grab active:cursor-grabbing select-none"
        >
          {extendedProjects.map((proj, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -6, scale: 1.015 }}
              transition={{ type: "spring", stiffness: 180, damping: 18 }}
              className="min-w-[320px] max-w-[320px] flex-shrink-0"
            >
              <div
                className="h-full p-6 rounded-2xl 
              bg-white/5 dark:bg-white/5
              backdrop-blur-xl 
              border border-white/10
              shadow-md
              transition
              hover:shadow-xl hover:border-white/20"
              >
                <h3 className="text-xl font-semibold mb-2 text-black dark:text-white">
                  {proj.title}
                </h3>

                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  {proj.desc}
                </p>

                <p className="text-sm text-green-400 mb-4">{proj.tech}</p>

                <div className="flex gap-3">
                  <Link
                    to={proj.route}
                    target="_blank"
                    className="px-4 py-1 text-sm rounded-full 
                  border border-white/20
                  hover:bg-black hover:text-white 
                  dark:hover:bg-white dark:hover:text-black 
                  transition"
                  >
                    Open
                  </Link>

                  <a
                    href="#"
                    className="px-4 py-1 text-sm rounded-full 
                  border border-white/20
                  hover:bg-black hover:text-white 
                  dark:hover:bg-white dark:hover:text-black 
                  transition"
                  >
                    Demo
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
