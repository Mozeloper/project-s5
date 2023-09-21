import React from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function SummeryCard({ data, error, loading }) {
  // console.log(`the data arrived: ${data}`)
  
  //Diagram of the analytics api response
  // const dataResponse = {
  //   soulsCountThisWeek: 0,
  //   soulsCountThisMonth: 2,
  //   soulsCountThisYear: 2,
  //   soulsCountLastWeek: 2,
  //   soulsCountLastMonth: 2,
  //   soulsCountLastYear: 0,
  //   totalSoulsCountSinceInception: 2
  // }

  const stats = [
    { message: 'Souls Last Week', data: data && data.SoulsCountLastWeek },
    { message: 'Souls This month', data: data && data.SoulsCountThisMonth },
    { message: 'Souls Last month', data: data && data.SoulsCountLastMonth },
    {
      message: 'Total Souls',
      data: data && data.TotalSoulsCountSinceInception,
    },
    // { message: "Success rate", data: "98.5%" },
  ];

  return (
    <div className="bg-[#38404b] rounded-md">
      {/* <div className="h2">{title}</div> */}
      {/* data */}
      <div className="grid grid-cols-1 bg-gray-700/10 sm:grid-cols-2 lg:grid-cols-4">
        {(stats)?.map((stat, statIdx) =>
          <div
            key={statIdx}
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
                {loading ? 'Loading...' : error ? 'Not-Avaliable' : stat?.data ? stat?.data : '0'}
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
