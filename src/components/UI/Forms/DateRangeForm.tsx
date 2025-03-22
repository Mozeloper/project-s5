import React, { useState, useEffect } from "react";

const DateRangeForm = ({
  startDate: initialStartDate,
  endDate: initialEndDate,
  onExport,
}) => {
  // Initialize the dates with the props passed from the parent component
  const [startDate, setStartDate] = useState(initialStartDate || "");
  const [endDate, setEndDate] = useState(initialEndDate || "");

  const handleExport = () => {
    if (onExport) {
      onExport(startDate, endDate);
    } else {
      // Default export logic
      console.log("Exporting from:", startDate, "to:", endDate);
    }
  };

  useEffect(() => {
    setStartDate(initialStartDate);
    setEndDate(initialEndDate);
  }, [initialStartDate, initialEndDate]);

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
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
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
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        <button
          onClick={handleExport}
          className="w-full py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          Export
        </button>
      </div>
    </div>
  );
};

export default DateRangeForm;
