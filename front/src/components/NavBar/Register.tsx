"use client";

//importacion de helpers
import { fetchLogin } from "@/helpers/Login.helper";
import { genNotifySuccess } from "@/helpers/Notify.helper";
import PATHROUTHES from "@/helpers/PagesRoutes.helper";
import { fetchRegister } from "@/helpers/Register.helper";
import { validateRegister } from "@/helpers/Validations.helper";

//imporatacion de interfaces
import {
  FromsProps,
  IUserRegister,
  RegisterErrors,
} from "@/interfaces/User.interface";

//importacion de librerias-hooks
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "@/context/Auth.Context";

const Register: React.FC<FromsProps> = ({ onCloseReg, onCloseLog }) => {
  //seteamos los valores iniciales
  const [userData, setUserData] = useState<IUserRegister>({
    name: "",
    email: "",
    address: "",
    phone: "",
    password: "",
  });
  //configuramos router y traemos funcion para setear al usuario
  const router = useRouter();
  const { setDataUser } = useAuth();
  //seteamos errores
  const [errors, setErrors] = useState<RegisterErrors>({});
  const [canSubmit, setCanSubmit] = useState(false);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [event.target.name]: event.target.value });
  };
  //validamos los datos
  useEffect(() => {
    setErrors(validateRegister(userData, setCanSubmit));
  }, [userData]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    //prevenimos recarga
    e.preventDefault();

    try {
      const responseRegister = await fetchRegister(userData);
      if (responseRegister.id) {
        genNotifySuccess(
          "Registrado Correctamente, vamos a intentar loguearte"
        );
        //intentamos loguear automaticamente
        try {
          const responseLogin = await fetchLogin({
            email: userData.email,
            password: userData.password,
          });
          if (responseLogin.token) {
            setDataUser(responseLogin);
            //cerramos el modal y redireccionamos a los productos
            const timer = setTimeout(() => {
              if (onCloseReg) {
                onCloseReg();
              }
              onCloseLog();
            }, 2500);
            router.push(PATHROUTHES.PRODUCTS);
            return () => clearTimeout(timer);
          }
        } catch (error: any) {
          throw new Error(
            "Error al intentar loguearte, intenta manualmente",
            error.message
          );
        }
      }
    } catch (error: any) {
      throw new Error("Error al intentar registrarte", error.message);
    }
  }

  return (
    <section className="bg-primaryColor dark:bg-secondaryColor m-10 p-5 rounded-md dark:text-white">
      <form className="max-w-md mx-auto flex flex-col" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold text-center">Registrarse</h2>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="email"
            name="email"
            id="email"
            value={userData.email}
            onChange={handleChange}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:focus:border-blue-500 focus:outline-none  focus:border-blue-500 peer"
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
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="password"
              name="password"
              id="password"
              value={userData.password}
              onChange={handleChange}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:focus:border-blue-500 focus:outline-none dark:text-white focus:border-blue-500 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="password"
              className="peer-focus:font-medium absolute text-sm text-white dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Password
            </label>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="password"
              name="password_confirmation"
              id="password_confirmation"
              value={userData.password_confirmation}
              onChange={handleChange}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:focus:border-blue-500 focus:outline-none dark:text-white focus:border-blue-500 peer"
              placeholder=""
              required
            />
            <label
              htmlFor="password_confirmation"
              className="peer-focus:font-medium absolute text-sm text-white dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Confirm Password
            </label>
            {errors.password_confirmation && (
              <p className="text-red-500 text-sm">
                {errors.password_confirmation}
              </p>
            )}
          </div>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="name"
            id="name"
            value={userData.name}
            onChange={handleChange}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:focus:border-blue-500 focus:outline-none dark:text-white focus:border-blue-500 peer"
            placeholder=""
            required
          />
          <label
            htmlFor="name"
            className="peer-focus:font-medium absolute text-sm text-white dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Full Name
          </label>
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="tel"
              name="phone"
              id="phone"
              value={userData.phone}
              onChange={handleChange}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:focus:border-blue-500 focus:outline-none dark:text-white focus:border-blue-500 peer"
              placeholder=""
              required
            />
            <label
              htmlFor="number"
              className="peer-focus:font-medium absolute text-sm text-white dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Phone Number
            </label>
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone}</p>
            )}
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="address"
              id="address"
              value={userData.address}
              onChange={handleChange}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:focus:border-blue-500 focus:outline-none dark:text-whites focus:border-blue-500 peer"
              placeholder=""
              required
            />
            <label
              htmlFor="address"
              className="peer-focus:font-medium absolute text-sm text-white dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Address
            </label>
            {errors.address && (
              <p className="text-red-500 text-sm">{errors.address}</p>
            )}
          </div>
        </div>
        {canSubmit ? (
          <button
            type="submit"
            className="m-auto text-white bg-blackColor dark:bg-primaryColor hover:bg-successColor dark:hover:bg-successColor focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:focus:ring-blue-800"
          >
            Sign In
          </button>
        ) : (
          <span className="text-center ">Completa todos los campos</span>
        )}
      </form>
      <ToastContainer />
    </section>
  );
};

export default Register;
