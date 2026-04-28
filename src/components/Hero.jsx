import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Eye, Download } from "lucide-react";

const words = [
  "Portfolio",
  "Website",
  "Work Showcase",
  "Project Hub",
  "Developer World",
  "Tech Journey",
  "Build Space",
  "Code Lab",
  "Creative Space",
  "Digital Playground",
  "Innovation Zone",
  "Dev Space",
  "Creation Space",
  "Code Universe",
  "Engineering Space",
  "Ideas in Code",
  "Interactive Space",
  "Product Lab",
];

function Hero() {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const [moveToCorner, setMoveToCorner] = useState(false);
  const [showRight, setShowRight] = useState(false);

  // ✅ SAME typing animation (slightly optimized speed)
  useEffect(() => {
    const currentWord = words[wordIndex];

    let timeout;

    if (!isDeleting && charIndex === currentWord.length) {
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, 600);
    } else {
      timeout = setTimeout(
        () => {
          if (!isDeleting) {
            setText(currentWord.substring(0, charIndex + 1));
            setCharIndex((prev) => prev + 1);
          } else {
            setText(currentWord.substring(0, charIndex - 1));
            setCharIndex((prev) => prev - 1);

            if (charIndex === 0) {
              setIsDeleting(false);
              setWordIndex((prev) => (prev + 1) % words.length);
            }
          }
        },
        isDeleting ? 40 : 70, // ⚡ slightly faster typing
      );
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, wordIndex]);

  // ✅ SAME entrance animation
  useEffect(() => {
    const timer1 = setTimeout(() => setMoveToCorner(true), 1200);
    const timer2 = setTimeout(() => setShowRight(true), 1800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <section id="hero" className="h-screen relative overflow-hidden">
      {/* LEFT TEXT */}
      <motion.div
        initial={{ x: "-40%", y: "-40%", top: "35%", left: "50%" }}
        animate={
          moveToCorner
            ? { x: 0, y: 0, top: "35%", left: "6%" }
            : { x: "-50%", y: "-50%", top: "35%", left: "50%" }
        }
        transition={{ duration: 1, ease: "easeInOut" }}
        className="absolute max-w-xl"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-black dark:text-white whitespace-nowrap">
          Welcome to my{" "}
          <span className="text-green-500 dark:text-green-400">
            {text}
            <span className="animate-pulse">|</span>
          </span>
        </h1>
      </motion.div>

      {/* RIGHT SIDE */}
      {showRight && (
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="absolute right-20 top-1/3 text-left flex flex-col items-start"
        >
          <h1 className="text-3xl font-semibold text-black dark:text-white">
            Sai Sri Sindhu
          </h1>

          {/* CTA buttons */}
          <div className="mt-6 flex gap-4">
            <a
              href="#projects"
              className="flex items-center gap-2 px-5 py-2 border border-gray-300 dark:border-gray-600
    hover:bg-black hover:text-white
    dark:hover:bg-white dark:hover:text-black transition rounded-md"
            >
              <Eye size={18} />
              My Projects
            </a>

            <a
              href="/Sindhu-Resume.pdf"
              download
              className="flex items-center gap-2 px-5 py-2 border border-gray-300 dark:border-gray-600
    hover:bg-black hover:text-white
    dark:hover:bg-white dark:hover:text-black transition rounded-md"
            >
              <Download size={18} />
              Resume
            </a>
          </div>
        </motion.div>
      )}

      {/* SCROLL DOWN INDICATOR */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-4 md:bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center cursor-pointer z-10"
        onClick={() =>
          document
            .querySelector("#about")
            ?.scrollIntoView({ behavior: "smooth" })
        }
      >
        <span className="text-xs text-gray-400 mb-2 tracking-wide">Scroll</span>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-6 h-10 border border-white/30 rounded-full flex items-start justify-center p-1"
        >
          <div className="w-1 h-2 bg-white rounded-full"></div>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Hero;
