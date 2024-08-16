"use client";
//importamos helpers
import { NavItems } from "@/helpers/NavItems.helper";
//importamos librerias
import { useAuth } from "@/context/Auth.Context";
//importamos componentes
import Link from "next/link";
import Modal from "./ModalLog";
import Login from "./Login";
import Register from "./Register";
import ThemeToggleButton from "@/components/NavBar/ThemeToggleBttn";
import LoginNavBar from "./LoginNavBar";
import Image from "next/image";
import PATHROUTHES from "@/helpers/PagesRoutes.helper";
import { usePathname } from "next/navigation";

const ClientSideToggle: React.FC = () => {
  //seteamos estados de apertura y cierre de los modales y navBar
  const pathname = usePathname();
  //traemos info del usuario y configuramos router
  const {
    dataUser,
    isDropdownOpen,
    toggleDropdown,
    isLoginOpen,
    isRegisterOpen,
    openLogin,
    closeLogin,
    openRegister,
    closeRegister,
  } = useAuth();

  return (
    <>
      <button
        data-collapse-toggle="navbar-default"
        type="button"
        className=" items-center p-2 w-10 h-10 justify-center  md:hidden dark:hover:bg-secondary1 hov "
        area-expanded="false"
        aria-controls="navbar-default"
        aria-expanded={isDropdownOpen}
        onClick={toggleDropdown}
      >
        <span className="sr-only">Open main menu</span>
        <Image src="/menu.svg" alt="Menu NavBar" width={20} height={20} />
      </button>

      <div
        className={`${
          isDropdownOpen ? "block" : "hidden"
        } w-full md:block md:w-auto`}
        id="navbar-default"
      >
        <ul className=" flex flex-col p-4 mt-4 border rounded-lg md:flex-row md:mt-0 md:border-0 text-center">
          {dataUser ? (
            <>
              <LoginNavBar />
              <Link href={PATHROUTHES.BOTON} />
            </>
          ) : (
            <>
              {NavItems.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.path}
                    className={`block py-2 px-3 hov ${
                      pathname === item.path
                        ? `text-primaryColor font-semibold`
                        : ``
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}

              <button onClick={openLogin} className="block py-2 px-3 hov">
                Login
              </button>
            </>
          )}

          <ThemeToggleButton />
        </ul>
      </div>
      <Modal isOpen={isLoginOpen} onClose={closeLogin}>
        <Login onCloseLog={closeLogin} />
        <button
          onClick={openRegister}
          className="rounded p-2 bg-blackColor dark:bg-primaryColor hover:text-primaryColor dark:hover:text-white"
        >
          With out account? Sign In
        </button>
      </Modal>

      <Modal isOpen={isRegisterOpen} onClose={closeRegister}>
        <Register onCloseReg={closeRegister} onCloseLog={closeLogin} />
      </Modal>
    </>
  );
};

export default ClientSideToggle;
