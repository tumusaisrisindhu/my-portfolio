import { useState } from "react";

import CalculatorTabs from "../../components/calculators/CalculatorTabs";

import SimpleInterest from "./financial/SimpleInterest";
import CompoundInterest from "./financial/CompoundInterest";
import EMI from "./financial/EMI";

function CalculatorPage() {
  const [activeCalculator, setActiveCalculator] = useState("simple-interest");

  return (
    <div
      className="
        min-h-screen
        px-4
        py-12
        bg-white
        dark:bg-black
        text-black
        dark:text-white
      "
    >
      <h1
        className="
          text-5xl
          font-bold
          text-center
          mb-12
          text-green-500
        "
      >
        Calculators
      </h1>

      <CalculatorTabs
        activeCalculator={activeCalculator}
        setActiveCalculator={setActiveCalculator}
      />

      {/* ACTIVE CALCULATOR */}
      {activeCalculator === "simple-interest" && <SimpleInterest />}
      {activeCalculator === "compound-interest" && <CompoundInterest />}
      {activeCalculator === "emi" && <EMI />}
    </div>
  );
}

export default CalculatorPage;
