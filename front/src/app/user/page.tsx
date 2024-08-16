/* eslint-disable @next/next/no-async-client-component */
/* eslint-disable @next/next/no-img-element */
"use client";
//importamos componentes, hook y el contexto

import useOrders from "@/helpers/UseOrders.helper";
import { useAuth } from "@/context/Auth.Context";
import Image from "next/image";
import Order from "./Order";

const UserDashboard: React.FC = () => {
  const { dataUser } = useAuth();
  //seteamos las ordenes y el loading
  const { orders, loading } = useOrders();

  return (
    <section className=" w-2/3 mx-auto ">
      <div className=" p-4 basicView">
        <Image
          src="/user.webp"
          alt="Imagen de Usuario"
          className="mx-auto"
          width={200}
          height={200}
          loading="lazy"
        />
        <h2 className="text-black font-bold text-lg m-5">
          Welcome {dataUser ? dataUser?.user?.name : "Usuario"}
        </h2>
        <div className="p-2 m-2 border border-t-zinc-800 ">
          <h3 className="text-black font-bold text-2xl">Your data</h3>
          <span className="text-black font-medium">Addres:</span>
          <p>{dataUser ? dataUser?.user?.address : "Direccion Desconocida"}</p>
          <span className="text-black">Email:</span>
          <p>{dataUser ? dataUser?.user?.email : "Email Desconocido"}</p>
          <span className="text-black">Phone:</span>
          <p>{dataUser ? dataUser?.user?.phone : "Telefono Desconocido"}</p>
        </div>
        <div className="p-2 m-2 border border-t-zinc-800 ">
          <h3 className="text-black font-bold">History of orders:</h3>
          {loading && <p className="m-2 text-lg">Loading...</p>}
          <div className="flex flex-wrap mx-auto justify-center gap-5 ">
            {orders.length >= 1 ? (
              orders.map((order) => <Order key={order.id} {...order} />)
            ) : (
              <p className=" m-2 font-bold">You have any order</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserDashboard;
