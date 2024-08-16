/* eslint-disable @next/next/no-img-element */
//importamos interface
import IProduct from "@/interfaces/Porduct.interface";
import Image from "next/image";

const OrdenItem: React.FC<IProduct> = (productos) => {
  const { name, image, price } = productos;
  return (
    <div className="flex flex-auto rounded p-2 m-2 gap-2 items-center justify-between border border-dashed">
      <Image
        src={image}
        alt={"Imagen del producto: " + name}
        width={160}
        height={160}
      />
      <h3>{name}</h3>
      <h3>${price}</h3>
    </div>
  );
};

export default OrdenItem;
