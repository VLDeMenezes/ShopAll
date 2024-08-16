/* eslint-disable @next/next/no-img-element */
"use client";
//importamos inreface y libreria
import IProduct from "@/interfaces/Porduct.interface";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Card: React.FC<IProduct> = ({ id, name, description, price, image }) => {
  const [imgSrc, setImgSrc] = useState(image);

  //manejamos el error de la imagen al cargar
  const handleError = () => {
    setImgSrc("/genericProduct.webp");
  };

  return (
    <div className=" max-w-sm  bg-white border border-gray-200 rounded-lg shadow dark:bg-blackColor dark:border-gray-700 m-5  hover:bg-primaryColor hover:text-basicColor dark:hover:bg-secondaryColor hover:scale-105 ">
      <Link
        href={"/products/" + id}
        className="h-full flex flex-col justify-evenly items-center"
      >
        <Image
          className="p-5 rounded-t-lg "
          src={imgSrc}
          alt={"Imagen del Producto " + name + " - " + description}
          onError={handleError}
          width={300}
          height={300}
        />
        <div className="px-5 pb-5 text-center">
          <h5 className="text-4xl font-semibold tracking-tighter p-2">
            {name}
          </h5>

          <div className="flex flex-col items-center">
            <span className="text-sm">{description}</span>
            <span className="text-3xl font-bold  dark:text-white m-5">
              $ {price}
            </span>
            <span>Show detail</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
