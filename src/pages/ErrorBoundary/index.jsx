import { Button } from "@mui/material";
import React from "react";
import logo from "../../assets/icons/Operation-5S-logo-white.png";

export default function ErrorBoundaryScreen({ resetErrorBoundary }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#38404b] ">
      <div className={`w-full h-[65px] fixed top-10 left-10 max-w-xs`}>
        <img
          src={logo}
          alt="tphol logo"
          loading="lazy"
          className={"max-w-[60%]"}
        />
      </div>

      <h1 className="text-4xl font-semibold text-white mb-4">
        Opps!!! Something went wrong
      </h1>
      <p className="text-lg text-gray-300">Looks like There was an error!</p>
      <div className="mt-8">
        <div
          onClick={() => resetErrorBoundary()}
          className="inline-block cursor-pointer px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg"
        >
          <button>Try again</button>
        </div>
      </div>
    </div>
  );
}
