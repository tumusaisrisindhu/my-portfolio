import { useState, useEffect } from "react";
import { Listbox } from "@headlessui/react";
import axios from "axios";

function UnitConverter() {
  const [config, setConfig] = useState({});
  const [category, setCategory] = useState("");
  const [value, setValue] = useState("");
  const [fromUnit, setFromUnit] = useState("");
  const [toUnit, setToUnit] = useState("");
  const [result, setResult] = useState(null);
  const [search, setSearch] = useState("");

  const filteredCategories = Object.keys(config).filter((cat) =>
    cat.toLowerCase().includes(search.toLowerCase()),
  );

  //  FETCH CONFIG FROM BACKEND
  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const res = await axios.get("http://localhost:5000/converter-config");
        setConfig(res.data);

        // set defaults safely
        const firstCategory = Object.keys(res.data)[0];
        if (firstCategory) {
          setCategory(firstCategory);
          setFromUnit(res.data[firstCategory][0]);
          setToUnit(res.data[firstCategory][1]);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchConfig();
  }, []);

  //  update units when category changes
  useEffect(() => {
    if (config[category]) {
      setFromUnit(config[category][0]);
      setToUnit(config[category][1]);
    }
  }, [category, config]);

  //  CONVERT
  const handleConvert = async () => {
    try {
      const res = await axios.post("http://localhost:5000/convert", {
        value,
        from_unit: fromUnit,
        to_unit: toUnit,
        category,
      });

      setResult(res.data.result);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-white dark:bg-black">
      <div className="w-full max-w-md p-8 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-lg bg-white dark:bg-black">
        <h1 className="text-3xl font-bold text-center mb-6 text-black dark:text-white">
          Unit Converter
        </h1>

        {/* CATEGORY */}
        <label className="block mb-2 text-sm text-gray-600 dark:text-gray-400">
          Category:
        </label>
        <Listbox value={category} onChange={setCategory}>
          <div className="relative mb-4">
            <Listbox.Button className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-black dark:text-white">
              {category}
            </Listbox.Button>

            <Listbox.Options
              className="absolute mt-1 w-full bg-white dark:bg-black border border-gray-300 dark:border-gray-700 rounded-md shadow-lg z-50
              max-h-60 overflow-y-auto"
            >
              {/* 🔍 SEARCH INPUT */}
              <div className="p-2 sticky top-0 bg-white dark:bg-black z-10">
                <input
                  type="text"
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full p-2 text-sm border border-gray-300 dark:border-gray-700 rounded-md bg-transparent text-black dark:text-white"
                />
              </div>

              {filteredCategories.map((item) => (
                <Listbox.Option
                  key={item}
                  value={item}
                  className={({ active }) =>
                    `p-3 cursor-pointer ${
                      active
                        ? "bg-green-400 text-black"
                        : "text-black dark:text-white"
                    }`
                  }
                >
                  {item}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </div>
        </Listbox>

        {/* VALUE */}
        <label className="block mb-2 text-sm text-gray-600 dark:text-gray-400">
          Value:
        </label>
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter value"
          className="w-full mb-4 p-3 rounded-md border border-gray-300 dark:border-gray-700 bg-transparent text-black dark:text-white"
        />

        {/* FROM */}
        <label className="block mb-2 text-sm text-gray-600 dark:text-gray-400">
          From:
        </label>
        <Listbox value={fromUnit} onChange={setFromUnit}>
          <div className="relative mb-4">
            <Listbox.Button className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-black dark:text-white">
              {fromUnit}
            </Listbox.Button>

            <Listbox.Options
              className="absolute mt-1 w-full bg-white dark:bg-black border border-gray-300 dark:border-gray-700 rounded-md shadow-lg z-50
              max-h-60 overflow-y-auto"
            >
              {(config[category] || []).map((unit) => (
                <Listbox.Option
                  key={unit}
                  value={unit}
                  className={({ active }) =>
                    `p-3 cursor-pointer ${
                      active
                        ? "bg-green-400 text-black"
                        : "text-black dark:text-white"
                    }`
                  }
                >
                  {unit}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </div>
        </Listbox>

        {/* TO */}
        <label className="block mb-2 text-sm text-gray-600 dark:text-gray-400">
          To:
        </label>
        <Listbox value={toUnit} onChange={setToUnit}>
          <div className="relative mb-6">
            <Listbox.Button className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-black dark:text-white">
              {toUnit}
            </Listbox.Button>

            <Listbox.Options className="absolute mt-1 w-full bg-white dark:bg-black border border-gray-300 dark:border-gray-700 rounded-md shadow-lg z-50 max-h-60 overflow-y-auto">
              {(config[category] || []).map((unit) => (
                <Listbox.Option
                  key={unit}
                  value={unit}
                  className={({ active }) =>
                    `p-3 cursor-pointer ${
                      active
                        ? "bg-green-400 text-black"
                        : "text-black dark:text-white"
                    }`
                  }
                >
                  {unit}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </div>
        </Listbox>

        {/* BUTTON */}
        <button
          onClick={handleConvert}
          className="w-full py-3 rounded-md border border-gray-300 dark:border-gray-600
          hover:bg-black hover:text-white
          dark:hover:bg-white dark:hover:text-black transition"
        >
          Convert
        </button>

        {/* RESULT */}
        {result !== null && (
          <div className="mt-6 text-center text-lg text-green-400">
            Result: {result}
          </div>
        )}
      </div>
    </div>
  );
}

export default UnitConverter;
