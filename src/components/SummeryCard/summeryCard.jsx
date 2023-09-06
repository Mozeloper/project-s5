import React from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function SummeryCard({ stats }) {
  const data = [
    { message: "Souls", data: "405" },
    { message: "Average soul last month", data: "32" },
    { message: "Number of workers", data: "202" },
    { message: "Success rate", data: "98.5%" },
  ];
  return (
    <div className="bg-[#38404b]">
      {/* <div className="h2">{title}</div> */}
      {/* data */}
      <div className="grid grid-cols-1 bg-gray-700/10 sm:grid-cols-2 lg:grid-cols-4">
        {(stats ?? data)?.map((stat, statIdx) => (
          <div
            key={stat?.message}
            className={classNames(
              statIdx % 2 === 1
                ? "sm:border-l"
                : statIdx === 2
                ? "lg:border-l"
                : "",
              "border-t border-white/20 lg:py-6 py-2  px-4 sm:px-6 lg:px-8"
            )}
          >
            <p className="text-sm font-medium leading-6 text-gray-400">
              {stat?.message}
            </p>
            <p className="md:mt-2 flex items-baseline gap-x-2">
              <span className="lg:text-4xl text-lg font-semibold lg:tracking-tight text-white">
                {stat?.data}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
