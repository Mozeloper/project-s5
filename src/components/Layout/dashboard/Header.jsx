import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { BiMenuAltLeft } from "react-icons/bi";
import { FiLogOut } from "react-icons/fi";

import ArrowDown from "../../../assets/icons/arrow-down.svg";
import profile from "../../../assets/icons/profile.svg";
import { toPascalCase } from "../../../Helper/toPascalCase";

export default function Header({
  setIsSideBarOpen,
  isSideBarOpen,
  setLogoutConfirmation,
  toggleDrawer,
}) {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const userObj = JSON.parse(sessionStorage.getItem("userObj"));

  const handleIconHover = () => {
    setIsMenuOpen(true);
  };

  const handleIconLeave = () => {
    setIsMenuOpen(false);
  };



  return (
    <div className="w-full h-full text-white flex items-center justify-between">
      <BiMenuAltLeft
        onClick={() => setIsSideBarOpen(!isSideBarOpen)}
        className="w-[18px] h-[20px] cursor-pointer lg:block hidden"
      />
      <BiMenuAltLeft
        onClick={() => toggleDrawer()}
        className="w-[18px] h-[20px] cursor-pointer lg:hidden block"
      />
      <div className="">
        {/* Uncomment this line of code below to show YearJoined and full name on the top right of the dashboard */}

        {/* <div className="flex flex-col">
          <h3 className="font-bold text-white text-sm">
            {toPascalCase(userObj?.FirstName)} {toPascalCase(userObj?.SurName)}
          </h3>
          <h4 className="font-normal text-white text-sm self-end">
            <span className="font-black">Year Joined:</span>{" "}
            {userObj?.YearJoined}
          </h4>
        </div> */}

        <div
          onClick={() => (isMenuOpen ? handleIconLeave() : handleIconHover())}
          onMouseLeave={handleIconLeave}
          className="relative flex items-center cursor-pointer"
        >
          <div className="w-auto h-auto min-w-[40px] min-h-[40px] font-medium text-xl flex justify-center items-center rounded-full bg-MODAL_BACKGROUND p-2">
            {`${userObj?.FirstName + userObj?.SurName}`
              ?.charAt(0)
              .toUpperCase() +
              `${userObj?.SurName + userObj?.FirstName}`
                ?.charAt(
                  `${userObj?.FirstName + userObj?.SurName}`?.indexOf(' ') + 1
                )
                .toUpperCase()}
          </div>
          <img
            src={ArrowDown}
            alt="icon"
            loading="lazy"
            className="h-[29px] w-[29px]"
          />
          {isMenuOpen && (
            <div className="absolute top-full right-0 w-[290px] h-[240px] bg-white shadow-lg rounded-2xl z-40">
              <div
                className="flex gap-4 border-b border-borderColor p-6 cursor-pointer hover:bg-slate-100 rounded-2xl duration-300 ease-in-out"
                onClick={() => navigate('/profile')}
              >
                <div className="w-auto h-auto text-white min-w-[40px] min-h-[40px] font-medium text-xl flex justify-center items-center  rounded-full bg-[#38404b] p-2">
                  {`${userObj?.FirstName + userObj?.SurName}`
                    ?.charAt(0)
                    .toUpperCase() +
                    `${userObj?.SurName + userObj?.FirstName}`
                      ?.charAt(
                        `${userObj?.FirstName + userObj?.SurName}`?.indexOf(
                          ' '
                        ) + 1
                      )
                      .toUpperCase()}
                </div>
                <div className="flex flex-col gap-1 justify-between">
                  <h3 className="text-textDark_200 font-black text-sm leading-[18px] capitalize">
                    {/* {toPascalCase(userObj?.FirstName)}{' '}
                    {toPascalCase(userObj?.SurName)} */}
                    {userObj?.FullName}
                  </h3>
                  <h3 className="text-secondary font-bold text-sm leading-[18px] text-right">
                    <span className="font-black">Year Joined:</span>{' '}
                    {userObj?.YearJoined}
                  </h3>
                </div>
              </div>
              <div
                className="border-b border-borderColor p-6 hover:bg-slate-100 rounded-2xl duration-300 ease-in-out cursor-pointer"
                onClick={() => navigate('/profile')}
              >
                <div className="flex gap-4">
                  <img
                    src={profile}
                    alt="icon"
                    loading="lazy"
                    className="h-[16px] w-[14px] cursor-pointer"
                  />
                  <h3 className="text-textDark_200 font-normal text-sm leading-5">
                    My Profile
                  </h3>
                </div>
              </div>
              <div
                className="p-6 hover:bg-slate-100 rounded-2xl duration-300 ease-in-out cursor-pointer"
                onClick={() => setLogoutConfirmation(true)}
              >
                <div className="flex gap-4">
                  <FiLogOut className="h-[16px] w-[14px] cursor-pointer text-[#8A9099]" />
                  <h3 className="text-textDark_200 font-normal text-sm leading-5">
                    Logout
                  </h3>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
