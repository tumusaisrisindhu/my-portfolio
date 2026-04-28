import { motion } from "framer-motion";

function About() {
  return (
    <section id="about" className="py-20 px-6 md:px-20">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-4xl"
      >
        <h2 className="text-4xl font-bold mb-6 text-green-400">About Me</h2>

        <p className="text-gray-600 dark:text-gray-300 text-lg mb-6">
          I build full-stack applications using React and Flask, focusing on
          clean architecture, performance, and real-world usability.
        </p>

        <p className="text-gray-600 dark:text-gray-300 mb-6">
          I have worked on API-driven applications including a To-Do system with
          full CRUD operations, a weather application using external APIs, and
          backend-driven logic systems like games and utilities.
        </p>

        <div className="space-y-4">
          <div>
            <h3 className="font-semibold">Backend Development</h3>
            <p className="text-gray-500">
              REST APIs, Flask, data handling, system design
            </p>
          </div>

          <div>
            <h3 className="font-semibold">Frontend</h3>
            <p className="text-gray-500">
              React, responsive UI, component architecture
            </p>
          </div>

          <div>
            <h3 className="font-semibold">Database</h3>
            <p className="text-gray-500">
              MySQL, structured data design, CRUD operations
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default About;
