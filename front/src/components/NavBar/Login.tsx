"use client";

//importamos helpers
import { fetchLogin } from "@/helpers/Login.helper";
import PATHROUTHES from "@/helpers/PagesRoutes.helper";
import { validateLogin } from "@/helpers/Validations.helper";

//importamos interface
import {
  FromsProps,
  IUserLogin,
  LoginErrors,
} from "@/interfaces/User.interface";

//importamos librerias
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/Auth.Context";
import { genNotifyWarning } from "@/helpers/Notify.helper";

const Login: React.FC<FromsProps> = ({ onCloseLog }) => {
  //configuramos router y traemos funcion para setear al usuario
  const router = useRouter();
  const { setDataUser } = useAuth();
  //configruamos el estado de los inputs
  const [userData, setUserData] = useState<IUserLogin>({
    email: "",
    password: "",
  });
  //configuramos el estado de los errores
  const [errors, setErrors] = useState<LoginErrors>({});
  const [intentos, setIntentos] = useState(10);

  //manejamos cualquier cambio en los input
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setUserData({ ...userData, [event.target.name]: event.target.value });
  }
  //validamos errores
  useEffect(() => {
    setErrors(validateLogin(userData));
  }, [userData]);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    //prevenimos recarga
    e.preventDefault();
    if (intentos === 0) {
      genNotifyWarning(
        "Se agotaron los intentos, intenta recargando la pagina"
      );
      return;
    }
    setIntentos(intentos - 1);
    const response = await fetchLogin(userData);

    if (response) {
      //seteamos los datos del usuario
      setIntentos(10);
      setDataUser(response);
      //cerramos el modal y redireccionamos a los productos
      const timer = setTimeout(() => {
        onCloseLog();
        router.push(PATHROUTHES.PRODUCTS);
      }, 4500);
      return () => clearTimeout(timer);
    }
  };

  return (
    <section className="bg-primaryColor dark:bg-secondaryColor m-10 p-5 rounded ">
      <form
        className="max-w-md mx-auto min-w-[300px] flex flex-col"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold text-center">Ingresar</h2>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="email"
            name="email"
            id="email"
            value={userData.email}
            onChange={handleChange}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:focus:border-blue-500 focus:outline-none  focus:border-blue-500 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="email"
            className="peer-focus:font-medium absolute text-sm text-white dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email
          </label>
          {errors.email && (
            <p className="text-red-500  text-sm">{errors.email}</p>
          )}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            name="password"
            id="password"
            value={userData.password}
            onChange={handleChange}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:focus:border-blue-500 focus:outline-none  focus:border-blue-500 peer"
            placeholder=" "
            required
            minLength={6}
          />
          <label
            htmlFor="password"
            className="peer-focus:font-medium absolute text-sm text-white dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Password
          </label>
          {errors.password && (
            <p className="text-red-500  text-sm">{errors.password}</p>
          )}
        </div>
        {intentos < 10 && (
          <p className="text-red-500  text-sm p-2">
            Intentos restantes: {intentos}
          </p>
        )}

        <button
          type="submit"
          className="m-auto text-white bg-blackColor dark:bg-primaryColor hover:bg-successColor dark:hover:bg-successColor focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:focus:ring-blue-800"
        >
          Login
        </button>
      </form>
    </section>
  );
};

export default Login;
