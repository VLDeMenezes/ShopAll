"use client";
//importamos helpers y componentes
import PATHROUTHES from "@/helpers/PagesRoutes.helper";
import CartComponent from "@/app/user/cart/Cart";
import Bttn from "@/components/Bttn";
//importamos librerias
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";

const Cart: React.FC = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // Este código solo se ejecutará en el cliente
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storedCart);
  }, []);
  return (
    <section className=" w-2/3 mx-auto flex flex-col">
      <div className=" basicView min-h-[80vh] p-6 items-center gap-2">
        <div className="flex justify-between w-full">
          <h2 className="font-bold ">Your Cart:</h2>
        </div>
        {cart.length >= 1 ? (
          <CartComponent />
        ) : (
          <Bttn
            href={PATHROUTHES.PRODUCTS}
            text="There is not Product yet, wana add some?"
            Icon="home"
          ></Bttn>
        )}
      </div>
      <ToastContainer />
    </section>
  );
};

export default Cart;
