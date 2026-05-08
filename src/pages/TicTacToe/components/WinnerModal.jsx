// import Confetti from "react-confetti";
// import { motion } from "framer-motion";

// function WinnerModal({ winner, isTie, playerName, onReset }) {
//   return (
//     <>
//       {/* Confetti ABOVE overlay */}
//       {!isTie && (
//         <div className="fixed inset-0 z-[60] pointer-events-none">
//           <Confetti />
//         </div>
//       )}

//       {/* Dark overlay */}
//       <div
//         className="
//           fixed inset-0 z-50
//           flex items-center justify-center
//           bg-black/60
//         "
//       >
//         {/* ONLY TEXT */}
//         <motion.div
//           initial={{ opacity: 0, scale: 0.7 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{
//             type: "spring",
//             stiffness: 120,
//           }}
//           className="text-center"
//         >
//           <h1
//             className="
//               text-6xl
//               font-extrabold
//               tracking-wide
//               text-green-400
//               drop-shadow-[0_0_25px_rgba(74,222,128,0.8)]
//             "
//           >
//             {isTie ? "MATCH TIE" : `${playerName} Wins`}
//           </h1>

//           <button
//             onClick={onReset}
//             className="
//               mt-10
//               rounded-xl
//               bg-green-400
//               px-6 py-3
//               text-lg
//               font-bold
//               text-black
//               transition-all
//               hover:scale-105
//             "
//           >
//             Play Again
//           </button>
//         </motion.div>
//       </div>
//     </>
//   );
// }

// export default WinnerModal;

import Confetti from "react-confetti";
import { motion } from "framer-motion";

function WinnerModal({ winner, isTie, playerName, onReset }) {
  return (
    <>
      {/* Confetti ABOVE overlay */}
      {!isTie && (
        <div className="fixed inset-0 z-[60] pointer-events-none">
          <Confetti />
        </div>
      )}

      {/* Dark overlay */}
      <div
        className="
          fixed inset-0 z-50
          flex items-center justify-center
          bg-black/60
        "
      >
        {/* ONLY TEXT */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 120,
          }}
          className="text-center"
        >
          <h1
            className="
              text-6xl
              font-extrabold
              tracking-wide
              text-green-400
              drop-shadow-[0_0_25px_rgba(74,222,128,0.8)]
            "
          >
            {isTie ? "MATCH TIE" : `${playerName} WINS`}
          </h1>

          <button
            onClick={onReset}
            className="
              mt-10
              rounded-xl
              bg-green-400
              px-6 py-3
              text-lg
              font-bold
              text-black
              transition-all
              hover:scale-105
            "
          >
            Play Again
          </button>
        </motion.div>
      </div>
    </>
  );
}

export default WinnerModal;
