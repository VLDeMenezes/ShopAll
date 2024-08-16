//importamos helper e interface
import { genNotifyError } from "./Notify.helper";
import { IUserRegister } from "@/interfaces/User.interface";
//obtenemos la URL del .env
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
//funcion para registrar un usuario
export const fetchRegister = async (userData: IUserRegister) => {
  try {
    const res = await fetch(`${apiUrl}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    if (res.ok) {
      return res.json();
    } else {
      genNotifyError("Error al registrarte");
    }
  } catch (error: any) {
    throw new Error("Error al registrarte", error.message);
  }
};
