import React from "react";
import { Outlet } from "react-router-dom";

export default function Authlayout() {
  return (
    <div className="w-full flex h-screen overflow-auto">
      <div className="w-full overflow-scroll bg-white h-full md:block hidden">
        <Outlet />
      </div>
      <div className="bg-[url('assets/images/p5-bg.jpg')] bg-[100%] bg-no-repeat bg-cover w-full h-full  overflow-scroll md:hidden">
        <div className="p-5 bg-[#38404b] bg-opacity-80 relative flex flex-col justify-center items-center min-h-[100%]">
          <Outlet />
        </div>
      </div>
      <div className="w-[80%] relative h-full bg-[url('assets/images/p5-bg.jpg')] flex-col justify-center items-center bg-no-repeat bg-[100%] p-2 md:flex hidden">
        <h3 className="text-white lg:text-5xl md:text-4xl lg:w-[500px] md:w-[400px] font-black leading-4">
          The Fruit of the rightous is a tree of life, and he who
          <span className="text-yellow-500"> wins soul</span> is wise.
        </h3>
        <h3 className="text-primary lg:text-5xl md:text-4xl lg:w-[500px] md:w-[400px] font-black leading-4">
          Prov 11:30
        </h3>
      </div>
    </div>
  );
}
