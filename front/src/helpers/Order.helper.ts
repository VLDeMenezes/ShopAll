//importamos helpers e interface
import { genNotifyError, genNotifySuccess } from "./Notify.helper";
import IOrder from "@/interfaces/Order.interface";
//importamos la URL del .env
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
//funcion para obtener las ordenes
export const fetchOrders = async () => {
  try {
    const res = await fetch(`${apiUrl}/users/orders`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("token")}`,
      },
    });
    const orders: IOrder[] = await res.json();
    return orders;
  } catch (error: any) {
    throw new Error("Failed to fetch orders");
  }
};
//funcion para crear una nueva orden
export const createNewOrder = async (products: number[], token: string) => {
  try {
    const res = await fetch(`${apiUrl}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      //enviamos la lista de productos y el token por body
      body: JSON.stringify({ products, token }),
    });
    if (res.ok) {
      const orders = res.json;
      genNotifySuccess("Orden Creada");
      return orders;
    }
  } catch (error: any) {
    genNotifyError(error.message);
  }
};
