import { useState } from "react";

import { calculateDiscount } from "../../../services/api";

import ResultCard from "../../../components/calculators/ResultCard";

function Discount() {
  const [formData, setFormData] = useState({
    original_price: "",
    discount_value: "",
    discount_type: "percentage",
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

    const data = await calculateDiscount(formData);

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
            Discount Calculator
          </h2>

          <div className="grid gap-6">
            {/* ORIGINAL PRICE */}
            <div>
              <label
                className="
                  mb-2
                  block
                  text-sm
                  font-medium
                "
              >
                Original Price (₹)
              </label>

              <input
                type="number"
                name="original_price"
                value={formData.original_price}
                onChange={handleChange}
                placeholder="Enter original price"
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
                  dark:[color-scheme:dark]
                "
                required
              />
            </div>

            {/* DISCOUNT */}
            <div>
              <label
                className="
                  mb-2
                  block
                  text-sm
                  font-medium
                "
              >
                Discount
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
                  name="discount_value"
                  value={formData.discount_value}
                  onChange={handleChange}
                  placeholder="Enter discount"
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
                  name="discount_type"
                  value={formData.discount_type}
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
                  <option value="percentage">Percentage (%)</option>

                  <option value="value">Flat Value (₹)</option>
                </select>
              </div>
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
              Calculate Discount
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
            title="Discount Amount"
            value={result?.discount_amount ?? "0.00"}
          />

          <ResultCard
            title="Final Price"
            value={result?.final_price ?? "0.00"}
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
              Final Price = Original − Discount
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
              <p>Discount Amount = Original × (% / 100)</p>

              <p>Final Price = Original − Discount Amount</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Discount;
