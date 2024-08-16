"use client";

import { useAuth } from "@/context/Auth.Context";
import PATHROUTHES from "@/helpers/PagesRoutes.helper";
import useCounter from "@/hooks/useCounter.hook";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const Boton = () => {
  const { openLogin, dataUser } = useAuth();
  const router = useRouter();
  // console.log("test", dataUser);
  const usuario = window.localStorage.getItem("userSession");
  useEffect(() => {
    if (!usuario) {
      router.push(PATHROUTHES.HOME);
      openLogin();
    }
  }, [usuario, openLogin, router]);

  return <div>BOTON</div>;
};

export default Boton;
