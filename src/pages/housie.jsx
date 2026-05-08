import { useEffect, useRef, useState } from "react";
import axios from "axios";
import {
  Play,
  Pause,
  History,
  X,
  RotateCcw,
  Volume2,
  VolumeX,
} from "lucide-react";
import { Listbox } from "@headlessui/react";
import { ChevronDown } from "lucide-react";

function HousiePage() {
  const API = "http://localhost:5000/housie";

  const [currentNumber, setCurrentNumber] = useState(null);
  const [lastFive, setLastFive] = useState([]);
  const [generatedNumbers, setGeneratedNumbers] = useState([]);

  const [historyOpen, setHistoryOpen] = useState(false);

  const [autoPlay, setAutoPlay] = useState(false);
  const [delay, setDelay] = useState(3000);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const [showExitPopup, setShowExitPopup] = useState(false);

  const intervalRef = useRef(null);

  // 🎲 GENERATE NUMBER
  const generateNumber = async () => {
    try {
      const res = await axios.post(`${API}/generate`);

      setCurrentNumber(res.data.current_number);
      setLastFive(res.data.last_five);
      setGeneratedNumbers(res.data.generated_numbers);
      speakNumber(res.data.current_number);
    } catch (err) {
      console.error(err);
    }
  };

  const speakNumber = (number) => {
    if (!soundEnabled) return;

    const speech = new SpeechSynthesisUtterance(number.toString());

    speech.rate = 0.9;
    speech.pitch = 1;

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(speech);
  };

  // 📜 HISTORY
  const fetchHistory = async () => {
    try {
      const res = await axios.get(`${API}/history`);

      setGeneratedNumbers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // 🔄 RESET
  const resetGame = async () => {
    try {
      await axios.post(`${API}/reset`);

      setCurrentNumber(null);
      setLastFive([]);
      setGeneratedNumbers([]);

      setShowExitPopup(false);
    } catch (err) {
      console.error(err);
    }
  };

  // ▶️ AUTOPLAY
  useEffect(() => {
    if (autoPlay) {
      intervalRef.current = setInterval(() => {
        generateNumber();
      }, delay);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [autoPlay, delay]);

  // 📜 OPEN HISTORY
  useEffect(() => {
    if (historyOpen) {
      fetchHistory();
    }
  }, [historyOpen]);

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white flex">
      {/* LEFT PANEL */}
      <div className="w-[120px] border-r border-gray-300 dark:border-gray-800 p-4 flex flex-col gap-4">
        {/* PLAY */}
        <button
          onClick={() => generateNumber()}
          className="flex flex-col items-center gap-2 p-3 rounded-xl border border-green-400 text-green-400 hover:bg-green-400 hover:text-black transition"
        >
          <Play size={20} />
          Play
        </button>

        {/* AUTOPLAY */}
        <button
          onClick={() => setAutoPlay(!autoPlay)}
          className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition
          ${
            autoPlay
              ? "bg-green-400 text-black border-green-400"
              : "border-gray-500"
          }`}
        >
          {autoPlay ? <Pause size={20} /> : <Play size={20} />}
          Auto
        </button>

        {/* DELAY */}
        <Listbox value={delay} onChange={setDelay}>
          <div className="relative">
            <Listbox.Button className="w-full p-2 rounded-md bg-white dark:bg-black text-black dark:text-white border border-gray-400 dark:border-gray-700 flex items-center justify-between">
              {delay / 1000} sec
              <ChevronDown size={18} />
            </Listbox.Button>

            <Listbox.Options className="absolute mt-1 w-full rounded-md bg-white dark:bg-black border border-gray-300 dark:border-gray-700 shadow-lg overflow-hidden z-50">
              {[3000, 5000, 7000].map((item) => (
                <Listbox.Option
                  key={item}
                  value={item}
                  className={({ active, selected }) =>
                    `cursor-pointer px-4 py-2 transition

                    ${active ? "bg-green-400 text-black" : "text-black dark:text-white"}

                    ${selected ? "font-semibold" : ""}`
                  }
                >
                  {item / 1000} sec
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </div>
        </Listbox>

        {/* HISTORY */}
        <button
          onClick={() => setHistoryOpen(!historyOpen)}
          className="flex flex-col items-center gap-2 p-3 rounded-xl border border-gray-500 hover:border-green-400 hover:text-green-400 transition"
        >
          <History size={20} />
          History
        </button>

        {/* EXIT */}
        <button
          onClick={() => setShowExitPopup(true)}
          className="flex flex-col items-center gap-2 p-3 rounded-xl border border-red-400 text-red-400 hover:bg-red-400 hover:text-black transition"
        >
          <X size={20} />
          Exit
        </button>
      </div>

      {/* MAIN CONTENT */}
      <div
        className={`transition-all duration-300 flex-1 p-8 ${
          historyOpen ? "mr-[280px]" : ""
        }`}
      >
        {/* CURRENT NUMBER */}
        <div className="flex flex-col items-center">
          <div className="text-sm text-gray-500 mb-4">Last Numbers</div>

          {/* LAST FIVE */}
          <div className="flex gap-3 mb-6">
            {lastFive.map((num, i) => (
              <div
                key={i}
                className="w-10 h-10 rounded-full border border-green-400 text-green-400 flex items-center justify-center text-sm"
              >
                {num}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-6">
            {/* BIG NUMBER */}
            <div className="w-40 h-40 md:w-52 md:h-52 rounded-full border-4 border-green-400 flex items-center justify-center text-6xl md:text-7xl font-bold text-green-400 shadow-[0_0_40px_rgba(74,222,128,0.25)]">
              {currentNumber || "--"}
            </div>

            {/* SOUND BUTTON */}
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`w-12 h-12 rounded-full border flex items-center justify-center transition
              ${
                soundEnabled
                  ? "border-green-400 text-green-400"
                  : "border-gray-500 text-gray-500"
              }`}
            >
              {soundEnabled ? <Volume2 /> : <VolumeX />}
            </button>
          </div>
        </div>

        {/* GRID */}
        {/* <div className="mt-16 grid grid-cols-5 md:grid-cols-10 gap-3"> */}
        <div className="mt-12 grid grid-cols-5 md:grid-cols-10 gap-2">
          {Array.from({ length: 90 }, (_, i) => i + 1).map((num) => {
            const selected = generatedNumbers.includes(num);

            return (
              <div
                key={num}
                // className={`h-14 rounded-xl border flex items-center justify-center text-lg font-semibold transition
                className={`h-10 md:h-12 rounded-lg border flex items-center justify-center text-sm md:text-base font-semibold transition
                ${
                  selected
                    ? "bg-green-400 text-black border-green-400"
                    : "border-gray-300 dark:border-gray-700"
                }`}
              >
                {num}
              </div>
            );
          })}
        </div>
      </div>

      {/* HISTORY PANEL */}
      <div
        className={`fixed right-0 top-0 h-full w-[280px]
        bg-white dark:bg-black border-l border-gray-300 dark:border-gray-800
        transition-transform duration-300 p-6
        ${historyOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-green-400">History</h2>

          <button onClick={() => setHistoryOpen(false)}>
            <X />
          </button>
        </div>

        <div className="grid grid-cols-4 gap-3 overflow-y-auto max-h-[85vh]">
          {[...generatedNumbers].reverse().map((num, i) => (
            <div
              key={i}
              className="h-12 rounded-lg bg-green-400 text-black flex items-center justify-center font-semibold"
            >
              {num}
            </div>
          ))}
        </div>
      </div>

      {/* EXIT POPUP */}
      {showExitPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-black border border-gray-300 dark:border-gray-800 rounded-2xl p-6 w-[320px]">
            <h2 className="text-xl font-semibold mb-6">Exit Game?</h2>

            <div className="flex flex-col gap-3">
              {/* RESUME */}
              <button
                onClick={() => setShowExitPopup(false)}
                className="p-3 rounded-lg border border-gray-400 hover:border-green-400 hover:text-green-400 transition"
              >
                Resume Game
              </button>

              {/* NEW GAME */}
              <button
                onClick={resetGame}
                className="p-3 rounded-lg border border-green-400 text-green-400 hover:bg-green-400 hover:text-black transition flex items-center justify-center gap-2"
              >
                <RotateCcw size={18} />
                Start New Game
              </button>

              {/* EXIT */}
              <button
                onClick={() => window.history.back()}
                className="p-3 rounded-lg border border-red-400 text-red-400 hover:bg-red-400 hover:text-black transition"
              >
                Exit Game
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HousiePage;
