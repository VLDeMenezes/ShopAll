"use client";
//importamos componentes, helpers y librerias
import Bttn from "@/components/Bttn";
import PATHROUTHES from "@/helpers/PagesRoutes.helper";
import useCounter from "@/hooks/useCounter.hook";
const NotFound: React.FC = () => {
  //redireccionamos al home luego de 2 segundos
  const { counter } = useCounter();

  return (
    <main className=" mx-auto w-2/3 my-5 ">
      <section className=" flex flex-col items-center m-auto"></section>
      <h2 className="m-5 p-20 rounded-xl text-center text-lg">
        Opss, looks like you are lost! let me redirect you to home in: {counter}
      </h2>
      <Bttn Icon="home" href={PATHROUTHES.HOME} text="Home"></Bttn>
    </main>
  );
};

export default NotFound;
