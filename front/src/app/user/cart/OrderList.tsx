/* eslint-disable @next/next/no-img-element */
//importamos interface
import IProduct from "@/interfaces/Porduct.interface";
import Image from "next/image";

const OrdenList: React.FC<IProduct> = (productos) => {
  const { name, image, price, description } = productos;
  return (
    <>
      <div className="">
        <div className="flex flex-wrap items-center text-center ">
          <Image
            src={image}
            alt="imagen del producto"
            width={160}
            height={160}
          />
          <h3 className="font-bold mx-5">{name}</h3>
          <h3 className="  font-bold"> Actual Price ${price}</h3>
        </div>
      </div>
    </>
  );
};

export default OrdenList;
