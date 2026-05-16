import { useState } from "react";
import { Listbox } from "@headlessui/react";

import { calculateEMI } from "../../../services/api";

import ResultCard from "../../../components/calculators/ResultCard";

function EMI() {
  const [formData, setFormData] = useState({
    principal: "",
    rate: "",
    time: "",
    frequency: "monthly",
  });

  const frequencyOptions = [
    "weekly",
    "bi-weekly",
    "monthly",
    "quarterly",
    "half-yearly",
    "yearly",
  ];

  const [result, setResult] = useState(null);

  const handleChange = (event) => {
    setFormData({
      ...formData,

      [event.target.name]: event.target.value,
    });
  };

  const handleCalculate = async (event) => {
    event.preventDefault();

    const data = await calculateEMI(formData);

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
            EMI Calculator
          </h2>

          <div className="grid gap-6">
            {/* LOAN */}
            <div>
              <label
                className="
                  mb-2
                  block
                  text-sm
                  font-medium
                "
              >
                Loan Amount (₹)
              </label>

              <input
                type="number"
                name="principal"
                value={formData.principal}
                onChange={handleChange}
                placeholder="Enter loan amount"
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
                Loan Duration (Years)
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
                  focus:border-green-500
                  dark:border-white/10
                  dark:bg-black/20
                "
                required
              />
            </div>

            {/* FREQUENCY */}
            <div>
              <label
                className="
                  mb-2
                  block
                  text-sm
                  font-medium
                "
              >
                EMI Frequency
              </label>

              <Listbox
                value={formData.frequency}
                onChange={(value) =>
                  setFormData({
                    ...formData,
                    frequency: value,
                  })
                }
              >
                <div className="relative">
                  <Listbox.Button
                    className="
                      w-full
                      rounded-xl
                      border
                      border-black/20
                      bg-white
                      px-4
                      py-3
                      text-left
                      outline-none
                      dark:border-white/10
                      dark:bg-black/20
                    "
                  >
                    {formData.frequency}
                  </Listbox.Button>

                  <Listbox.Options
                    className="
                      absolute
                      mt-2
                      w-full
                      overflow-hidden
                      rounded-xl
                      border
                      border-black/10
                      bg-white
                      shadow-lg
                      dark:border-white/10
                      dark:bg-[#111]
                      z-20
                    "
                  >
                    {frequencyOptions.map((option) => (
                      <Listbox.Option
                        key={option}
                        value={option}
                        className={({ active }) =>
                          `
                          cursor-pointer
                          px-4
                          py-3
                          capitalize
                          ${active ? "bg-green-400 text-black" : ""}
                        `
                        }
                      >
                        {option}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </div>
              </Listbox>
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
              Calculate EMI
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
            title={`${
              result?.frequency?.charAt(0).toUpperCase() +
              result?.frequency?.slice(1)
            } EMI`}
            value={result?.emi ?? "0.00"}
          />

          <ResultCard
            title="Total Interest"
            value={result?.total_interest ?? "0.00"}
          />

          <ResultCard
            title="Total Payment"
            value={result?.total_payment ?? "0.00"}
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
                text-xl
                font-bold
                text-green-500
              "
            >
              EMI = P × R × (1+R)^N / ((1+R)^N - 1)
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EMI;
