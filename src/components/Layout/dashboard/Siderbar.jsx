import React, { useState } from 'react';
import { NavLink, json } from 'react-router-dom';

import { RxDashboard } from 'react-icons/rx';
import { FaChalkboardTeacher, FaUsers } from 'react-icons/fa';
import { RiAdminFill } from 'react-icons/ri';
import { IoIosPeople } from 'react-icons/io';
import { MdAdminPanelSettings } from 'react-icons/md';
import { MdSunny } from 'react-icons/md';
import { MdChurch } from 'react-icons/md';
import { MdLocalFireDepartment } from 'react-icons/md';
import { MdOutlineTravelExplore } from 'react-icons/md';
import { MdOutlineSettings } from 'react-icons/md';

import logo from '../../../assets/icons/Operation-5S-logo.png';
import menuArrow from '../../../assets/icons/arrow-side-down.svg';
import { MdNotificationsActive } from 'react-icons/md';

export default function Sidebar({ isSideBarOpen, toggleDrawer }) {
  const [isSubMenuOpen, setIsSubMenuOpen] = useState({
    id: null,
    isOpen: false,
  });

  const navLinks = [
    {
      id: 1,
      name: 'Dashboard',
      path: '/dashboard',
      icon: <RxDashboard className="w-[24px] h-[24px]" />,
      hasChildren: false,
      role: [
        'SuperAdmin',
        'NewConvertAdmin',
        'DTIAdmin',
        'MinistryAdmin',
        'User',
      ],
    },
    {
      id: 9,
      name: 'Souls',
      path: '/souls',
      icon: <MdOutlineTravelExplore className="w-[24px] h-[24px]" />,
      hasChildren: false,
      role: [
        'SuperAdmin',
        'NewConvertAdmin',
        'DTIAdmin',
        'MinistryAdmin',
        'User',
      ],
    },
    {
      id: 4,
      name: 'Workers',
      path: '/workers',
      icon: <IoIosPeople className="w-[24px] h-[24px]" />,
      hasChildren: false,
      role: ['SuperAdmin'],
    },
    {
      id: 2,
      name: 'Admins',
      path: '/admins',
      icon: <MdAdminPanelSettings className="w-[24px] h-[24px]" />,
      hasChildren: false,
      role: ['SuperAdmin'],
    },
    {
      id: 5,
      name: 'New Believers',
      path: '/newconvert',
      icon: <MdSunny className="w-[24px] h-[24px]" />,
      hasChildren: false,
      role: ['SuperAdmin', 'NewConvertAdmin'],
    },
    {
      id: 3,
      name: 'DTI',
      path: '/dti',
      icon: <MdChurch className="w-[24px] h-[24px]" />,
      hasChildren: false,
      role: ['SuperAdmin', 'DTIAdmin'],
    },
    {
      id: 6,
      name: 'Ministry',
      path: '/ministry',
      icon: <MdLocalFireDepartment className="w-[24px] h-[24px]" />,
      hasChildren: false,
      role: ['SuperAdmin', 'MinistryAdmin'],
    },
    {
      id: 7,
      name: 'Reminder',
      path: '/reminder',
      icon: <MdNotificationsActive className="w-[24px] h-[24px]" />,
      hasChildren: false,
      role: ['SuperAdmin', 'NewConvertAdmin', 'MinistryAdmin', 'DTIAdmin'],
    },
    {
      id: 8,
      name: 'Profile',
      path: '/profile',
      icon: <MdOutlineSettings className="w-[24px] h-[24px]" />,
      hasChildren: false,
      onlySuperAdmin: false,
      role: [
        'SuperAdmin',
        'NewConvertAdmin',
        'MinistryAdmin',
        'DTIAdmin',
        'User',
      ],
    },
  ];

  const handleClick = (e, list, type) => {
    if (type === 'close-all') {
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

  //Todo dynamically render the navigation paths/route based on the current logged in user/admin role
  const currentLoggedAdmin = JSON.parse(sessionStorage.getItem('role'));
  const currentAdmin = currentLoggedAdmin.includes('SuperAdmin');

  const filteredNavLinks = navLinks.filter((item) =>
    item.role.some((r) => currentLoggedAdmin.includes(r))
  );

  return (
    <>
      <div
        className={`w-full h-[65px] flex items-center pr-3 max-w-xs ${
          isSideBarOpen ? 'pl-6' : 'pl-3'
        }`}
      >
        <img src={logo} alt="tphol logo" loading="lazy" className="w-[100%]" />
      </div>
      <div className="w-full mb-6 mt-4">
        <div className="rounded-tl-lg flex flex-col h-full">
          {filteredNavLinks.map((list) => {
            if (!list?.children) {
              return (
                <NavLink
                  key={list?.id}
                  to={list?.path}
                  onClick={(e) => {
                    toggleDrawer && toggleDrawer();
                    handleClick(e, list, 'close-all');
                  }}
                  className={({ isActive }) =>
                    isActive
                      ? `flex gap-4 ${
                          isSideBarOpen
                            ? 'xl:pl-8 lg:pl-6 md:pl-4 pl-2'
                            : 'pl-4'
                        } items-center text-sm text-[#38404b] bg-white font-semibold md:h-[56px] h-[48px] rounded-tl-[20px] rounded-bl-[20px]`
                      : `flex gap-4 ${
                          isSideBarOpen
                            ? 'xl:pl-8 lg:pl-6 md:pl-4 pl-2'
                            : 'pl-4'
                        } items-center text-sm text-white md:h-[56px] h-[48px] hover:bg-white/75  duration-300 ease hover:text-[#38404b] font-semibold hover:rounded-tl-[20px] hover:rounded-bl-[20px]
                        `
                  }
                >
                  {!currentAdmin ? (
                    <>
                      {list?.icon}
                      {isSideBarOpen ? list?.name : null}
                    </>
                  ) : (
                    <>
                      {list?.icon}
                      {isSideBarOpen ? list?.name : null}
                    </>
                  )}
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
                              ? 'xl:pl-8 lg:pl-6 md:pl-4 pl-2'
                              : 'pl-4'
                          } items-center justify-between text-sm text-[#38404b] bg-[#f5f5f5] font-semibold md:h-[56px] h-[48px] rounded-tl-[20px] rounded-bl-[20px]`
                        : `flex gap-4 ${
                            isSideBarOpen
                              ? 'xl:pl-8 lg:pl-6 md:pl-4 pl-2'
                              : 'pl-4'
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
                                      ? 'xl:pl-16 lg:pl-6 md:pl-4 pl-2'
                                      : 'pl-4'
                                  } items-center mt-2 text-sm text-[#38404b] bg-[#FFFFFF14] font-semibold md:h-[56px] h-[48px] rounded-tl-[20px] rounded-bl-[20px]`
                                : `flex gap-4 mt-2 ${
                                    isSideBarOpen
                                      ? 'xl:pl-16 lg:pl-6 md:pl-4 pl-2'
                                      : 'pl-4'
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
