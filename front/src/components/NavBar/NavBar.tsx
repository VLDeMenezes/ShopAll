//importamos librerias
import React from "react";
import ClientSideToggle from "./ClientSideToogle";
import { ToastContainer } from "react-toastify";
import Link from "next/link";
import PATHROUTHES from "@/helpers/PagesRoutes.helper";

const NavBar: React.FC = () => {
  return (
    <nav className="basicTheme sticky top-0 z-10">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <span className="material-icons text-3xl logo text-basicColor">
          local_shipping
        </span>
        <Link
          href={PATHROUTHES.HOME}
          className="self-center text-2xl font-semibold hov"
        >
          ShopAll
        </Link>

        <ClientSideToggle />
      </div>
      <ToastContainer />
    </nav>
  );
};

export default NavBar;
