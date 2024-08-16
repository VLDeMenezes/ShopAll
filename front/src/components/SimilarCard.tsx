/* eslint-disable @next/next/no-img-element */
import IProduct from "@/interfaces/Porduct.interface";
import Link from "next/link";
import ButtonProduct from "./BttnProduct";
import Image from "next/image";

const SimilarCard: React.FC<IProduct> = ({
  id,
  name,
  price,
  image,
  description,
}) => {
  return (
    <Link
      href={"/products/" + id}
      className="bg-slate-500 text-center rounded-sm flex flex-col justify-between items-center hover:scale-105 mx-auto"
    >
      <Image
        src={image}
        alt={"Imagen del Producto " + name + " - " + description}
        width={200}
        height={200}
        className="p-2 m-auto"
      />
      <div>
        <h3>{name}</h3>
        <h3>${price}</h3>
        <ButtonProduct text="See the product" />
      </div>
    </Link>
  );
};

export default SimilarCard;
