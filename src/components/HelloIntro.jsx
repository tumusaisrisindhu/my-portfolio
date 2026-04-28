import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const messages = [
  "Hello!",
  "Bonjour!",
  "Hola!",
  "Ciao!",
  "Hallo!",
  "Olá!",
  "नमस्ते!",
  "こんにちは!",
  "안녕하세요!",
  "నమస్కారం!",
];

function HelloIntro({ onFinish }) {
  const [index, setIndex] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (index >= messages.length) {
      setTimeout(onFinish, 500);
      return;
    }

    const isFirst = index === 0;
    const isLast = index === messages.length - 1;

    const holdTime = isFirst || isLast ? 500 : 150;

    const timer = setTimeout(() => {
      setShow(false); // trigger exit
    }, holdTime);

    return () => clearTimeout(timer);
  }, [index, onFinish]);

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <AnimatePresence
        mode="wait"
        onExitComplete={() => {
          setIndex((prev) => prev + 1); // ✅ only increment AFTER exit
          setShow(true); // show next
        }}
      >
        {show && index < messages.length && (
          <motion.h1
            key={messages[index]}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="text-4xl md:text-6xl font-bold text-white"
          >
            {messages[index]}
          </motion.h1>
        )}
      </AnimatePresence>
    </div>
  );
}

export default HelloIntro;
