"use client";
import { useAuth } from "@/context/Auth.Context";
import {
  genNotifyError,
  genNotifyInfo,
  genNotifySuccess,
} from "@/helpers/Notify.helper";
import IProduct from "@/interfaces/Porduct.interface";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import PATHROUTHES from "@/helpers/PagesRoutes.helper";
import { createNewOrder } from "@/helpers/Order.helper";
import OrdenList from "./OrderList";

const CartComponent: React.FC = () => {
  const [cart, setCart] = useState<IProduct[]>([]);
  const [price, setPrice] = useState(0);
  //configuramos router y traemos datos del context
  const router = useRouter();
  const { dataUser, setCounter, variableCounter } = useAuth();
  useEffect(() => {
    //recuperamos datos del localstorage respectos al carrito
    const storedCart = localStorage.getItem("cart");
    //si existen los seteamos en el estado
    if (storedCart) {
      const parsedCart = JSON.parse(storedCart);
      setCart(parsedCart);
      //calculamos el precio total
      let totalPrice = 0;
      parsedCart.forEach((product: IProduct) => {
        totalPrice += product.price;
      });
      setPrice(totalPrice);
    }
  }, []);
  const handleRemove = (e: any) => {
    try {
      //filtramos el carrito para eliminar el item y seteamos nuevamente
      const newCart = cart.filter(
        (item: IProduct) => item.id !== parseInt(e.target.id)
      );
      setCart(newCart);
      localStorage.setItem("cart", JSON.stringify(newCart));
      //seteamos el nuevo precio
      let totalPrice = 0;
      newCart.forEach((product: IProduct) => {
        totalPrice += product.price;
      });
      setPrice(totalPrice);
      //seteamos el contador
      variableCounter("decrement");
      genNotifySuccess("Eliminado del carrito");
    } catch (error) {
      genNotifyError("Error al eliminar del carrito");
    }
  };

  const handleBuy = async () => {
    try {
      //creamos el array con los id de cada producto
      const productsId = cart.map((product) => product.id);
      //obtenemos el token del usuario
      const token = dataUser?.token!;
      await createNewOrder(productsId, token);
      //limpiamos los estados del carrito y precio, y la localstorage
      setCart([]);
      setPrice(0);
      localStorage.removeItem("cart");
      setCounter(0);
      //notificamos al usuario de que se ha creado la orden y redireccionamos
      genNotifyInfo("Vamos a llevarte a ver tus ordenes");
      setTimeout(() => {
        router.push(PATHROUTHES.USER);
      }, 2000);
    } catch (error: any) {
      genNotifyError(error.message);
    }
  };
  return (
    <>
      <div className=" flex flex-col w-full">
        {cart.map((cart: IProduct) => (
          <article
            key={cart.id}
            className="flex justify-around rounded p-2 m-2 border border-dashed "
          >
            <OrdenList {...cart} />{" "}
            <button
              id={cart.id.toString()}
              onClick={handleRemove}
              className="material-icons red my-2 p-2 hover:scale-125 cursor-pointer"
            >
              close
            </button>
          </article>
        ))}
        <div className=" flex justify-between">
          <span>Total of Products: {cart.length}</span>
          <span>Total Price: ${price}</span>
        </div>
      </div>
      <button
        onClick={handleBuy}
        className="w-20 rounded bg-primaryColor p-2 hover:bg-successColor"
      >
        Pay
      </button>
    </>
  );
};

export default CartComponent;
