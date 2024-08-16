"use client";
//importamos las interfaces y librerias
import {
  AuthContextProps,
  AuthProviderProps,
} from "@/interfaces/Auth.interface";
import { UserSessionProps } from "@/interfaces/User.interface";
import { createContext, useContext, useState, useEffect } from "react";

//creamos el contexto seteando el valor por defecto y la funcion
const AuthContext = createContext<AuthContextProps>({
  dataUser: null,
  counter: 0,
  setCounter: () => {},
  variableCounter: () => {},
  setDataUser: () => {},
  isLoginOpen: false,
  isRegisterOpen: false,
  openLogin: () => {},
  closeLogin: () => {},
  openRegister: () => {},
  closeRegister: () => {},
  isDropdownOpen: false,
  toggleDropdown: () => {},
});

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  //seteamos los estados del usuario y de la apertura o cierre de los modales
  const [dataUser, setDataUser] = useState<UserSessionProps | null>(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [counter, setCounter] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  //seteamos las funciones para la apertura y cierre de los modales
  const openLogin = () => setIsLoginOpen(true);
  const closeLogin = () => setIsLoginOpen(false);
  const openRegister = () => setIsRegisterOpen(true);
  const closeRegister = () => setIsRegisterOpen(false);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const variableCounter = (type: string) => {
    if (type === "increment") {
      setCounter(counter + 1);
    } else if (type === "decrement") {
      setCounter(counter - 1);
    }
  };
  //seteamos los datos de usuario en el localstorage
  useEffect(() => {
    if (dataUser) {
      localStorage.setItem("userSession", JSON.stringify(dataUser));
      localStorage.setItem("token", dataUser.token);
    }
  }, [dataUser]);

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const data = localStorage.getItem("userSession");
      const counter = localStorage.getItem("counter");
      if (data) {
        setDataUser(JSON.parse(data));
      }
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        dataUser,
        counter,
        setCounter,
        variableCounter,
        setDataUser,
        isLoginOpen,
        isRegisterOpen,
        openLogin,
        closeLogin,
        openRegister,
        closeRegister,
        isDropdownOpen,
        toggleDropdown,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
