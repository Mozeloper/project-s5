import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import { RxDashboard } from "react-icons/rx";
import { FaUsers } from "react-icons/fa";
import { PiUsersBold } from "react-icons/pi";
import { RiUserStarFill } from "react-icons/ri";
import { BiTestTube } from "react-icons/bi";
import { CiDeliveryTruck } from "react-icons/ci";
import { CiLocationOn } from "react-icons/ci";
import { FiSettings } from "react-icons/fi";
import { BiMoney } from "react-icons/bi";
import { MdOutlineCollections } from "react-icons/md";
import { SiFuturelearn } from "react-icons/si";
import { ImUsers } from "react-icons/im";

import logo from "../../../assets/icons/TPHOL-LOGO-white.png";
import logo2 from "../../../assets/icons/logo.png";
import menuArrow from "../../../assets/icons/arrow-side-down.svg";

export default function Sidebar({ isSideBarOpen, toggleDrawer }) {
  const [isSubMenuOpen, setIsSubMenuOpen] = useState({
    id: null,
    isOpen: false,
  });

  const navLinks = [
    {
      id: 1,
      name: "Dashboard",
      path: "/dashboard",
      icon: <RxDashboard className="w-[24px] h-[24px]" />,
      hasChildren: false,
    },
    {
      id: 2,
      name: "Souls",
      path: "/souls",
      icon: <FaUsers className="w-[24px] h-[24px]" />,
      hasChildren: false,
    },
    {
      id: 3,
      name: "Profile",
      path: "/profile",
      icon: <FiSettings className="w-[24px] h-[24px]" />,
      hasChildren: false,
    },
  ];

  const handleClick = (e, list, type) => {
    if (type === "close-all") {
      setIsSubMenuOpen((prev) => ({
        ...prev,
        id: null,
        isOpen: false,
      }));
      return;
    }
    e.preventDefault();
    setIsSubMenuOpen((prev) => ({
      ...prev,
      id: null,
      isOpen: false,
    }));
    setIsSubMenuOpen((prev) => ({
      ...prev,
      id: list?.id,
      isOpen: true,
    }));
  };

  return (
    <>
      <div
        className={`w-full h-[65px] flex items-center ${
          isSideBarOpen ? "pl-6" : "pl-3"
        }`}
      >
        <img
          src={logo}
          alt="tphol logo"
          loading="lazy"
          className="h-[41px] w-[45px]"
        />
      </div>
      <div className="w-full mb-6 mt-4">
        <div className="rounded-tl-lg flex gap-2 gap-y-5 flex-col h-full">
          {navLinks.map((list) => {
            if (!list?.children) {
              return (
                <NavLink
                  key={list?.id}
                  to={list?.path}
                  onClick={(e) => {
                    toggleDrawer && toggleDrawer();
                    handleClick(e, list, "close-all");
                  }}
                  className={({ isActive }) =>
                    isActive
                      ? `flex gap-4 ${
                          isSideBarOpen
                            ? "xl:pl-8 lg:pl-6 md:pl-4 pl-2"
                            : "pl-4"
                        } items-center text-sm text-[#38404b] bg-white font-semibold md:h-[56px] h-[48px] rounded-tl-[20px] rounded-bl-[20px]`
                      : `flex gap-4 ${
                          isSideBarOpen
                            ? "xl:pl-8 lg:pl-6 md:pl-4 pl-2"
                            : "pl-4"
                        } items-center text-sm text-white md:h-[56px] h-[48px] hover:bg-white/75  duration-300 ease hover:text-[#38404b] font-semibold hover:rounded-tl-[20px] hover:rounded-bl-[20px]`
                  }
                >
                  {list?.icon}
                  {isSideBarOpen ? list?.name : null}
                </NavLink>
              );
            } else {
              return (
                <>
                  <NavLink
                    key={list?.id}
                    to={list?.path}
                    onClick={(e) => handleClick(e, list)}
                    className={({ isActive }) =>
                      isActive
                        ? `flex gap-4 w-full ${
                            isSideBarOpen
                              ? "xl:pl-8 lg:pl-6 md:pl-4 pl-2"
                              : "pl-4"
                          } items-center justify-between text-sm text-[#38404b] bg-[#f5f5f5] font-semibold md:h-[56px] h-[48px] rounded-tl-[20px] rounded-bl-[20px]`
                        : `flex gap-4 ${
                            isSideBarOpen
                              ? "xl:pl-8 lg:pl-6 md:pl-4 pl-2"
                              : "pl-4"
                          } items-center text-sm text-white md:h-[56px] h-[48px] hover:bg-white/75  duration-300 ease hover:text-[#38404b] font-semibold hover:rounded-tl-[20px] hover:rounded-bl-[20px]`
                    }
                  >
                    <div className="flex gap-4 w-full items-center">
                      {list?.icon}
                      {isSideBarOpen ? list?.name : null}
                    </div>
                    {isSideBarOpen && (
                      <img
                        src={menuArrow}
                        alt="menuArrow"
                        loading="lazy"
                        className="h-[12px] w-[12px] mr-10"
                      />
                    )}
                  </NavLink>
                  {isSubMenuOpen?.isOpen && isSubMenuOpen?.id === list?.id ? (
                    <div className="mt-2 transition-all">
                      {list?.children.map((items) => {
                        return (
                          <NavLink
                            key={items?.id}
                            to={items?.path}
                            onClick={(e) => {
                              toggleDrawer && toggleDrawer();
                            }}
                            className={({ isActive }) =>
                              isActive
                                ? `flex gap-4 text-white mt-2 ${
                                    isSideBarOpen
                                      ? "xl:pl-16 lg:pl-6 md:pl-4 pl-2"
                                      : "pl-4"
                                  } items-center mt-2 text-sm text-[#38404b] bg-[#FFFFFF14] font-semibold md:h-[56px] h-[48px] rounded-tl-[20px] rounded-bl-[20px]`
                                : `flex gap-4 mt-2 ${
                                    isSideBarOpen
                                      ? "xl:pl-16 lg:pl-6 md:pl-4 pl-2"
                                      : "pl-4"
                                  } items-center text-sm text-white md:h-[56px] h-[48px] hover:bg-white/75  duration-300 ease hover:text-white font-semibold hover:rounded-tl-[20px] hover:rounded-bl-[20px]`
                            }
                          >
                            <div className="w-[6px] h-[6px] bg-white rounded-full" />
                            {isSideBarOpen ? items?.name : null}
                          </NavLink>
                        );
                      })}
                    </div>
                  ) : null}
                </>
              );
            }
          })}
        </div>
      </div>
    </>
  );
}
