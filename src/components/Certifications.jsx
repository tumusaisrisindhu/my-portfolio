import { motion } from "framer-motion";

const certs = [
  {
    title: "Python Certification",
    link: "#",
  },
  {
    title: "Frontend Development",
    link: "#",
  },
  {
    title: "React Certification",
    link: "#",
  },
];

function Certifications() {
  return (
    <section
      id="certifications"
      className="py-20 px-20 flex flex-col justify-center"
    >
      <motion.h2
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-green-400 mb-10"
      >
        Certifications
      </motion.h2>

      <div className="grid md:grid-cols-3 gap-6">
        {certs.map((cert, index) => (
          <motion.a
            key={index}
            href={cert.link}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            className="border border-gray-800 p-6 rounded-lg hover:border-green-400 transition cursor-pointer"
          >
            <h3 className="text-xl font-semibold">{cert.title}</h3>
          </motion.a>
        ))}
      </div>
    </section>
  );
}

export default Certifications;
