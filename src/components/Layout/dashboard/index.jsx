import React, { useState } from "react";
import { Outlet } from "react-router-dom";

import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";

import Siderbar from "./Siderbar";
import Header from "./Header";
import ModalPopup from "../../ModalPopup";
import LogoutConfirm from "./component/logoutConfirm";

export default function DashboardLayout() {
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  const [logoutConfirmation, setLogoutConfirmation] = useState(false);
  const [openMobileSidebar, setOpenMobileSidebar] = useState(false);

  const toggleDrawer = () => {
    setOpenMobileSidebar((prevState) => !prevState);
  };

  return (
    <div className="flex w-full">
      <aside
        className={`${
          isSideBarOpen ? "xl:w-[18%]" : "xl:w-[3%] transition-all"
        } lg:block hidden sticky top-0 h-screen bg-[#38404b] z-50 overflow-auto`}
      >
        <Siderbar isSideBarOpen={isSideBarOpen} />
      </aside>
      <section
        className={`${
          isSideBarOpen ? "xl:w-[82%]" : "xl:w-[97%]"
        } w-full h-full transition-none`}
      >
        <header className="sticky top-0 border-none shadow h-[65px] z-50 bg-[#38404b] xl:px-6 lg:px-4 md:px-2 px-2">
          <Header
            setIsSideBarOpen={setIsSideBarOpen}
            isSideBarOpen={isSideBarOpen}
            setLogoutConfirmation={setLogoutConfirmation}
            toggleDrawer={toggleDrawer}
          />
        </header>
        <article className="p-[1.5%] h-full">
          <Outlet />
        </article>
      </section>
      <ModalPopup isOpen={logoutConfirmation}>
        <LogoutConfirm setLogoutConfirmation={setLogoutConfirmation} />
      </ModalPopup>
      <Drawer open={openMobileSidebar} onClose={toggleDrawer} direction="left">
        <div className="bg-[#38404b] h-screen text-indigo-500 w-[250px] overflow-auto">
          <Siderbar isSideBarOpen={isSideBarOpen} toggleDrawer={toggleDrawer} />
        </div>
      </Drawer>
    </div>
  );
}
