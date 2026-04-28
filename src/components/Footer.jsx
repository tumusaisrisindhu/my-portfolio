// import { GitHub, Linkedin, Mail } from "lucide-react";

function Footer() {
  return (
    <footer className="mt-20 border-t border-white/10 bg-black text-white">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between items-start gap-8">
        {/* LEFT: NAME + TAGLINE */}
        <div>
          <h2 className="text-xl font-semibold text-green-400">
            Sai Sri Sindhu
          </h2>
          <p className="text-gray-400 mt-2 text-sm max-w-xs">
            Full Stack Developer building clean and scalable web applications.
          </p>
        </div>

        {/* CENTER: NAV LINKS */}
        <div className="flex flex-col gap-2 text-sm">
          <a href="#hero" className="hover:text-green-400 transition">
            Home
          </a>
          <a href="#about" className="hover:text-green-400 transition">
            About
          </a>
          <a href="#projects" className="hover:text-green-400 transition">
            Projects
          </a>
          <a href="#resume" className="hover:text-green-400 transition">
            Resume
          </a>
        </div>

        {/* RIGHT: SOCIAL LINKS */}
        <div className="flex gap-4 items-start">
          <a
            href="https://github.com/YOUR_USERNAME"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-green-400 transition"
          >
            {/* <GitHub /> */}
          </a>

          <a
            href="https://linkedin.com/in/YOUR_PROFILE"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-green-400 transition"
          >
            {/* <Linkedin /> */}
          </a>

          <a
            href="mailto:youremail@example.com"
            className="hover:text-green-400 transition"
          >
            {/* <Mail /> */}
          </a>
        </div>

        <div className="flex items-start">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="w-10 h-10 flex items-center justify-center
    border border-white/20 rounded-full
    hover:bg-white hover:text-black
    transition"
          >
            <span className="text-xl leading-none">↑</span>
          </button>
        </div>
      </div>

      {/* BOTTOM LINE */}
      <div className="text-center text-xs text-gray-500 pb-6">
        © {new Date().getFullYear()} Sai Sri Sindhu. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
