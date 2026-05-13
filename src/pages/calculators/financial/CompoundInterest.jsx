import { useState } from "react";

import { calculateCompoundInterest } from "../../../services/api";

import ResultCard from "../../../components/calculators/ResultCard";

function CompoundInterest() {
  const [formData, setFormData] = useState({
    principal: "",
    rate: "",
    time: "",
    tenure_type: "years",
    frequency_type: "yearly",
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

    const data = await calculateCompoundInterest(formData);

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
        {/* LEFT */}
        <form
          onSubmit={handleCalculate}
          className="
            rounded-3xl
            border
            border-black/10
            bg-gray-100
            p-8
            shadow-sm
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
            Compound Interest
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
                  focus:border-green-500
                  dark:border-white/10
                  dark:bg-black/20
                  dark:[color-scheme:dark]
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
                  focus:border-green-500
                  dark:border-white/10
                  dark:bg-black/20
                  dark:[color-scheme:dark]
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
                Time Period
              </label>

              <div
                className="
                  grid
                  grid-cols-2
                  gap-3
                "
              >
                <input
                  type="number"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  placeholder="Enter time"
                  className="
                    w-full
                    rounded-xl
                    border
                    border-black/20
                    bg-white
                    px-4
                    py-3
                    outline-none
                    focus:border-green-500
                    dark:border-white/10
                    dark:bg-black
                    dark:[color-scheme:dark]
                  "
                  required
                />

                <select
                  name="tenure_type"
                  value={formData.tenure_type}
                  onChange={handleChange}
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
                    focus:ring-2
                    focus:ring-green-500
                    hover:border-green-500
                    dark:border-white/10
                    dark:bg-black
                    dark:text-white
                  "
                >
                  <option value="days">Days</option>

                  <option value="months">Months</option>

                  <option value="years">Years</option>
                </select>
              </div>
            </div>

            {/* COMPOUND FREQUENCY */}
            <div>
              <label
                className="
                  mb-2
                  block
                  text-sm
                  font-medium
                "
              >
                Compound Frequency
              </label>

              <select
                name="frequency_type"
                value={formData.frequency_type}
                onChange={handleChange}
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
                  focus:ring-2
                  focus:ring-green-500
                  hover:border-green-500
                  dark:border-white/10
                  dark:bg-black
                  dark:text-white
                "
              >
                <option value="daily">Daily</option>

                <option value="monthly">Monthly</option>

                <option value="quarterly">Quarterly</option>

                <option value="half-yearly">Half-Yearly</option>

                <option value="yearly">Yearly</option>
              </select>
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

        {/* RIGHT */}
        <div
          className="
            flex
            flex-col
            gap-6
          "
        >
          <ResultCard
            title="
            Compound Interest"
            value={result?.compound_interest ?? "0.00"}
          />

          <ResultCard
            title="
            Total Amount"
            value={result?.total_amount ?? "0.00"}
          />

          {/* FORMULA */}
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
              A = P(1 + R/N)^NT
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompoundInterest;
