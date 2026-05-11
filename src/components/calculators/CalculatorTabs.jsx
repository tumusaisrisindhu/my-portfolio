import { Menu, Transition } from "@headlessui/react";

import { Fragment } from "react";

function CalculatorTabs({ activeCalculator, setActiveCalculator }) {
  return (
    <div
      className="
        flex
        justify-center
        gap-6
        mb-10
        flex-wrap
      "
    >
      {/* FINANCIAL */}
      <Menu as="div" className="relative">
        <Menu.Button
          className="
            px-5
            py-2
            rounded-xl
            border
            border-gray-300
            dark:border-gray-700
            hover:bg-green-400
            hover:text-black
            transition
          "
        >
          Financial
        </Menu.Button>

        <Transition
          as={Fragment}
          enter="
            transition
            duration-100
          "
          enterFrom="
            opacity-0
            scale-95
          "
          enterTo="
            opacity-100
            scale-100
          "
        >
          <Menu.Items
            className="
              absolute
              mt-2
              w-56
              rounded-xl
              border
              border-gray-200
              dark:border-gray-700
              bg-white
              dark:bg-black
              shadow-xl
              z-20
            "
          >
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => setActiveCalculator("simple-interest")}
                  className={`
                    w-full
                    text-left
                    px-4
                    py-3
                    ${active ? "bg-green-400 text-black" : ""}
                  `}
                >
                  Simple Interest
                </button>
              )}
            </Menu.Item>

            <Menu.Item>
              {({ active }) => (
                <button
                  className={`
                    w-full
                    text-left
                    px-4
                    py-3
                    ${active ? "bg-green-400 text-black" : ""}
                  `}
                >
                  Compound Interest
                </button>
              )}
            </Menu.Item>

            <Menu.Item>
              {({ active }) => (
                <button
                  className={`
                    w-full
                    text-left
                    px-4
                    py-3
                    ${active ? "bg-green-400 text-black" : ""}
                  `}
                >
                  EMI
                </button>
              )}
            </Menu.Item>

            <Menu.Item>
              {({ active }) => (
                <button
                  className={`
                    w-full
                    text-left
                    px-4
                    py-3
                    ${active ? "bg-green-400 text-black" : ""}
                  `}
                >
                  Loan
                </button>
              )}
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>

      {/* GENERAL */}
      <Menu as="div" className="relative">
        <Menu.Button
          className="
            px-5
            py-2
            rounded-xl
            border
            border-gray-300
            dark:border-gray-700
            hover:bg-green-400
            hover:text-black
            transition
          "
        >
          General
        </Menu.Button>

        <Menu.Items
          className="
            absolute
            mt-2
            w-56
            rounded-xl
            border
            border-gray-200
            dark:border-gray-700
            bg-white
            dark:bg-black
            shadow-xl
            z-20
          "
        >
          <Menu.Item>
            {({ active }) => (
              <button
                className={`
                  w-full
                  text-left
                  px-4
                  py-3
                  ${active ? "bg-green-400 text-black" : ""}
                `}
              >
                Discount
              </button>
            )}
          </Menu.Item>

          <Menu.Item>
            {({ active }) => (
              <button
                className={`
                  w-full
                  text-left
                  px-4
                  py-3
                  ${active ? "bg-green-400 text-black" : ""}
                `}
              >
                Percentage
              </button>
            )}
          </Menu.Item>

          <Menu.Item>
            {({ active }) => (
              <button
                className={`
                  w-full
                  text-left
                  px-4
                  py-3
                  ${active ? "bg-green-400 text-black" : ""}
                `}
              >
                Ratio
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Menu>

      {/* TIME */}
      <Menu as="div" className="relative">
        <Menu.Button
          className="
            px-5
            py-2
            rounded-xl
            border
            border-gray-300
            dark:border-gray-700
            hover:bg-green-400
            hover:text-black
            transition
          "
        >
          Time
        </Menu.Button>

        <Menu.Items
          className="
            absolute
            mt-2
            w-56
            rounded-xl
            border
            border-gray-200
            dark:border-gray-700
            bg-white
            dark:bg-black
            shadow-xl
            z-20
          "
        >
          <Menu.Item>
            {({ active }) => (
              <button
                className={`
                  w-full
                  text-left
                  px-4
                  py-3
                  ${active ? "bg-green-400 text-black" : ""}
                `}
              >
                Age Calculator
              </button>
            )}
          </Menu.Item>

          <Menu.Item>
            {({ active }) => (
              <button
                className={`
                  w-full
                  text-left
                  px-4
                  py-3
                  ${active ? "bg-green-400 text-black" : ""}
                `}
              >
                Duration Calculator
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Menu>
    </div>
  );
}

export default CalculatorTabs;
