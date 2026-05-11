import { useState } from "react";

import { calculateSimpleInterest } from "../../../services/api";

import ResultCard from "../../../components/calculators/ResultCard";

function SimpleInterest() {
  const [formData, setFormData] = useState({
    principal: "",
    rate: "",
    time: "",
  });

  const [result, setResult] = useState(null);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleCalculate = async (event) => {
    event.preventDefault();

    const data = await calculateSimpleInterest(formData);

    setResult(data);
  };

  return (
    <div className="mx-auto max-w-6xl">
      <div
        className="
          grid
          gap-10
          lg:grid-cols-2
        "
      >
        {/* LEFT SIDE */}
        <form
          onSubmit={handleCalculate}
          className="
            rounded-3xl
            border
            border-black/10
            bg-gray-100
            p-8
            shadow-sm
            transition-all
            dark:border-white/10
            dark:bg-white/5
          "
        >
          <h2
            className="
              mb-8
              text-3xl
              font-bold
            "
          >
            Simple Interest
          </h2>

          <div className="grid gap-6">
            {/* PRINCIPAL */}
            <div>
              <label
                className="
                  mb-2
                  block
                  text-sm
                  font-medium
                "
              >
                Principal Amount (₹)
              </label>

              <input
                type="number"
                name="principal"
                value={formData.principal}
                onChange={handleChange}
                placeholder="Enter amount"
                className="
                  w-full
                  rounded-xl
                  border
                  border-black/20
                  bg-white
                  px-4
                  py-3
                  outline-none
                  transition-all
                  focus:border-green-500
                  dark:border-white/10
                  dark:bg-black/20
                "
                required
              />
            </div>

            {/* RATE */}
            <div>
              <label
                className="
                  mb-2
                  block
                  text-sm
                  font-medium
                "
              >
                Interest Rate (%)
              </label>

              <input
                type="number"
                name="rate"
                value={formData.rate}
                onChange={handleChange}
                placeholder="Enter rate"
                className="
                  w-full
                  rounded-xl
                  border
                  border-black/20
                  bg-white
                  px-4
                  py-3
                  outline-none
                  transition-all
                  focus:border-green-500
                  dark:border-white/10
                  dark:bg-black/20
                "
                required
              />
            </div>

            {/* TIME */}
            <div>
              <label
                className="
                  mb-2
                  block
                  text-sm
                  font-medium
                "
              >
                Time Period (Years)
              </label>

              <input
                type="number"
                name="time"
                value={formData.time}
                onChange={handleChange}
                placeholder="Enter years"
                className="
                  w-full
                  rounded-xl
                  border
                  border-black/20
                  bg-white
                  px-4
                  py-3
                  outline-none
                  transition-all
                  focus:border-green-500
                  dark:border-white/10
                  dark:bg-black/20
                "
                required
              />
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              className="
                mt-4
                rounded-xl
                bg-green-500
                px-6
                py-3
                font-semibold
                text-white
                transition-all
                hover:scale-[1.02]
                hover:bg-green-600
              "
            >
              Calculate Interest
            </button>
          </div>
        </form>

        {/* RIGHT SIDE */}
        <div
          className="
            flex
            flex-col
            gap-6
          "
        >
          <ResultCard
            title="Simple Interest"
            value={result?.simple_interest ?? "0.00"}
          />

          <ResultCard
            title="Total Amount"
            value={result?.total_amount ?? "0.00"}
          />

          {/* FORMULA CARD */}
          <div
            className="
              rounded-3xl
              border
              border-black/10
              bg-gray-100
              p-6
              shadow-sm
              dark:border-white/10
              dark:bg-white/5
            "
          >
            <p
              className="
                text-sm
                text-gray-600
                dark:text-gray-400
              "
            >
              Formula
            </p>

            <h2
              className="
                mt-3
                text-2xl
                font-bold
                text-green-500
              "
            >
              SI = (P × R × T) / 100
            </h2>

            <div
              className="
                mt-4
                text-sm
                leading-7
                text-gray-600
                dark:text-gray-400
              "
            >
              <p>P = Principal Amount</p>

              <p>R = Rate of Interest</p>

              <p>T = Time Period</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SimpleInterest;
