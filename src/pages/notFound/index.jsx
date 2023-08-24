import React from "react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-indigo-500">
      <h1 className="text-4xl font-semibold text-white mb-4">
        404 - Page Not Found
      </h1>
      <p className="text-lg text-gray-300">
        The page you're looking for does not exist.
      </p>
      <div className="mt-8">
        <div
          onClick={() => navigate(-1)}
          className="inline-block cursor-pointer px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg"
        >
          Go back
        </div>
      </div>
    </div>
  );
}
