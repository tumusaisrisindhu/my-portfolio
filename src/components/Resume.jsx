import { motion } from "framer-motion";

function Resume() {
  return (
    <section id="resume" className="py-20 px-20 flex flex-col justify-center">
      <motion.h2
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-green-400 mb-8"
      >
        Resume
      </motion.h2>

      <div className="bg-gray-900 p-6 rounded-lg">
        <iframe
          src="/Sindhu-Resume.pdf"
          title="Resume"
          className="w-full h-[500px] border-none"
        />

        <div className="mt-4 flex gap-4">
          <a
            href="/Sindhu-Resume.pdf"
            download
            className="px-6 py-2 bg-green-400 text-black font-semibold"
          >
            Download Resume
          </a>

          <a
            href="/Sindhu-Resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="px-6 py-2 border border-gray-600"
          >
            Open in New Tab
          </a>
        </div>
      </div>
    </section>
  );
}

export default Resume;
