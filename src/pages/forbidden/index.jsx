import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from "../../assets/icons/Operation-5S-logo-white.png";

export default function Forbidden() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-primary">
       <div className={`w-full h-[65px] fixed top-10 left-10 max-w-xs`}>
        <img
          src={logo}
          alt="tphol logo"
          loading="lazy"
          className={"max-w-[60%]"}
        />
      </div>
      <h1 className="text-4xl font-semibold text-white mb-4">
        Opps!!! This Page is Forbidden
      </h1>
      <p className="text-lg text-gray-300">
        Looks like you do not have the permission to view this resource.
      </p>
      <div className="mt-8">
        <div
          onClick={() => navigate(-2)}
          className="inline-block cursor-pointer px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg"
        >
          Go back
        </div>
      </div>
    </div>
  );
}
