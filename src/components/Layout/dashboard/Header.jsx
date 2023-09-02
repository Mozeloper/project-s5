import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { BiMenuAltLeft } from "react-icons/bi";
import { FiLogOut } from "react-icons/fi";

import ArrowDown from "../../../assets/icons/arrow-down.svg";
import profile from "../../../assets/icons/profile.svg";

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
      <div className="flex items-center md:gap-8 gap-4">
        <div className="flex flex-col">
          <h3 className="font-bold text-white text-sm">
            {userObj?.FirstName} {userObj?.SurName}
          </h3>
          <h4 className="font-normal text-white text-sm self-end">
            <span className="font-black">Year Joined:</span>{" "}
            {userObj?.YearJoined}
          </h4>
        </div>
        <div className="w-auto h-auto min-w-[40px] min-h-[40px] font-medium text-xl flex justify-center items-center">
          {`${userObj?.FirstName + userObj?.SurName}`?.charAt(0) +
            `${userObj?.FirstName + userObj?.SurName}`?.charAt(
              `${userObj?.FirstName + userObj?.SurName}`?.indexOf(" ") + 1
            )}
        </div>
        <div
          onClick={() => (isMenuOpen ? handleIconLeave() : handleIconHover())}
          onMouseLeave={handleIconLeave}
          className="relative"
        >
          <img
            src={ArrowDown}
            alt="icon"
            loading="lazy"
            className="h-[29px] w-[29px] cursor-pointer"
          />
          {isMenuOpen && (
            <div className="absolute top-full right-0 w-[290px] h-[240px] bg-white shadow-lg rounded-2xl z-40">
              <div className="flex gap-4 border-b border-borderColor p-6">
                <div className="flex flex-col gap-1 justify-between">
                  <h3 className="text-textDark_200 font-black text-sm leading-[18px]">
                    {userObj?.FirstName} {userObj?.SurName}
                  </h3>
                  <h3 className="text-secondary font-bold text-sm leading-[18px] text-right">
                    <span className="font-black">Year Joined:</span>{" "}
                    {userObj?.YearJoined}
                  </h3>
                </div>
                <div className="w-auto h-auto text-secondary min-w-[40px] min-h-[40px] rounded-md font-medium text-xl flex justify-center items-center">
                  {`${userObj?.FirstName + userObj?.SurName}`?.charAt(0) +
                    `${userObj?.FirstName + userObj?.SurName}`?.charAt(
                      `${userObj?.FirstName + userObj?.SurName}`?.indexOf(" ") +
                        1
                    )}
                </div>
              </div>
              <div className="border-b border-borderColor p-6">
                <div
                  onClick={() => navigate("/profile")}
                  className="flex gap-4 cursor-pointer"
                >
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
              <div className="p-6">
                <div
                  onClick={() => setLogoutConfirmation(true)}
                  className="flex gap-4 cursor-pointer"
                >
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
