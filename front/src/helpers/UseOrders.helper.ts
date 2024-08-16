//importamos libreria, helpers e interface
import { useEffect, useState } from "react";
import { fetchOrders } from "@/helpers/Order.helper";
import { genNotifyError } from "./Notify.helper";
import IOrder from "@/interfaces/Order.interface";

//creamos un hook para setear ordenes y un loading
const useOrders = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  //obtenemos las ordenes de la base de datos
  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await fetchOrders();
        setOrders(response);
      } catch (error: any) {
        genNotifyError(error.message);
      } finally {
        setLoading(false);
      }
    };
    getOrders();
  }, []);

  return { orders, loading };
};

export default useOrders;
