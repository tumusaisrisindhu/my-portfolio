import { motion } from "framer-motion";

function Square({ value, onClick }) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      // className="
      //   h-28
      //   w-28
      //   rounded-2xl
      //   border
      //   border-white/10
      //   bg-white/5
      //   text-5xl
      //   font-bold
      //   text-green-400
      //   backdrop-blur-lg
      //   transition-all
      //   hover:bg-white/10
      // "
      className="
        h-28
        w-28
        rounded-2xl
        border-2
        border-black/30
        bg-gray-100
        text-5xl
        font-bold
        text-green-400
        transition-all
        hover:bg-gray-200
        dark:border-white/10
        dark:bg-white/5
        dark:hover:bg-white/10
      "
    >
      <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }}>
        {value}
      </motion.span>
    </motion.button>
  );
}

export default Square;
