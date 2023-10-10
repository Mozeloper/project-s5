import React from "react";
import { Outlet } from "react-router-dom";

export default function Authlayout() {
  return (
    <div className="w-full flex h-screen overflow-hidden">
      <div className="w-full overflow-scroll bg-white h-full overflow-x-hidden md:block hidden">
        <Outlet />
      </div>
      <div className="bg-[url('assets/images/p5-bg.jpg')] bg-[100%] bg-no-repeat bg-cover w-full h-full  overflow-scroll md:hidden">
        <div className="p-5 bg-gray-900 bg-opacity-80 relative flex flex-col justify-center items-center min-h-[100%]">
          <Outlet />
        </div>
      </div>
      <div className="md:w-[60%] lg:w-[50%] xl:w-[80%] relative h-full bg-cover bg-[url('assets/images/p5-bg.jpg')] flex-col justify-center items-center bg-no-repeat bg-[100%] p-5 md:flex hidden">
        <h3 className="text-white lg:text-5xl md:text-4xl lg:max-w-[500px] md:w-[100%] leading-4 font-black">
          The fruit of the righteous is a tree of life, And he who
          <span className="text-yellow-400"> wins souls</span> is wise.
        </h3>
        <h3 className="text-primary lg:text-5xl md:text-4xl lg:max-w-[500px] md:w-[100%] font-black leading-4">
          Prov 11:30
        </h3>
      </div>
    </div>
  );
}
