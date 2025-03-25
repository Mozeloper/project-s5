import React, { useState } from "react";

// Utility function to format date to MM/DD/YYYY
const formatDate = (date: Date) => {
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
};

const DateRangeForm = ({ onExport, isLoading }) => {
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>(
    // new Date().toISOString().slice(0, 10)
    ""
  ); // Default end date is today's date

  const handleExport = () => {
    if (onExport) onExport(startDate, endDate);
  };

  // Handle the date changes and convert them to MM/DD/YYYY format
  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(e.target.value);
    setStartDate(formatDate(date));
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(e.target.value);
    setEndDate(formatDate(date));
  };

  return (
    <div className="flex items-center justify-center mt-16 bg-gray-100 py-8">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-xl font-semibold text-center text-gray-700 mb-6">
          Date Range Export
        </h2>

        <div className="mb-4">
          <label
            htmlFor="startDate"
            className="block text-sm font-medium text-gray-600 mb-2"
          >
            Start Date
          </label>
          <input
            type="date"
            id="startDate"
            value={
              startDate ? new Date(startDate).toISOString().slice(0, 10) : ""
            }
            onChange={handleStartDateChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="endDate"
            className="block text-sm font-medium text-gray-600 mb-2"
          >
            End Date
          </label>
          <input
            type="date"
            id="endDate"
            value={endDate ? new Date(endDate).toISOString().slice(0, 10) : ""}
            onChange={handleEndDateChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        <button
          onClick={handleExport}
          className="w-full py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <p className="animate-spin">{"⏳ "}</p>{" "}
              <small>{` `} Exporting...</small>{" "}
            </div>
          ) : (
            <div className="animate-pulse">{"Export"}</div>
          )}
        </button>
      </div>
    </div>
  );
};

export default DateRangeForm;
