//importamos helpers e interface
import { IUserLogin } from "@/interfaces/User.interface";
import {
  genNotifyError,
  genNotifySuccess,
  genNotifyWarning,
} from "./Notify.helper";
//importamos la URL del .env
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
//funcion para loguear
export const fetchLogin = async (userData: IUserLogin) => {
  try {
    const response = await fetch(`${apiUrl}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const data = await response.json();

    //si existe un token seteamos cookies para AUTH-ROUTES
    if (data.token) {
      setCookie("authToken", data.token, 7);
      genNotifySuccess("Iniciaste sesion");
      return data;
    } else {
      genNotifyWarning("Credenciales incorrectas");
      return;
    }
  } catch (error: any) {
    genNotifyError(error.message);
  }
};

//funcion para cerrar sesion
export const logOut = () => {
  //borramos cookies y localstorage
  deleteCookie("authToken");
  genNotifySuccess("Sesión Cerrada");
  localStorage.removeItem("userSession");
  localStorage.removeItem("token");
  localStorage.clear();
};

//funcion para setear cookies
export const setCookie = (name: string, value: string, days: number) => {
  //creamos la expiracion
  let expires = "";
  if (days) {
    //obtenemos la fecha y la convertimos la expiracion a milisegundos
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    //convertimos la expiracion a string
    expires = "; expires=" + date.toUTCString();
  }
  //seteamos la cookie con path para todos los dominios
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
};

//funcion para borrar la cookie fijando fecha vieja
export const deleteCookie = (name: string) => {
  document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
};
