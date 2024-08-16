/* eslint-disable @next/next/no-img-element */
//imporatmos interface y libreria
import Link from "next/link";
import IProduct from "@/interfaces/Porduct.interface";
import Image from "next/image";
const HeroImage: React.FC<IProduct> = ({ id, name, image, description }) => {
  return (
    <>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
          <Image
            src={image}
            width="550"
            height="550"
            alt={"imagen del producto: " + name + " - " + description}
            className="  overflow-hidden rounded-xl object-cover sm:w-full"
          />
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              {name}
            </h2>
            <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              {description}
            </p>
            <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center">
              <Link
                href={"/products/" + id}
                className="m-auto p-2 rounded-md border border-input  px-8 text-sm font-medium shadow-sm transition-colors  hover:text-cyan-700 hover:border-cyan-700 "
                prefetch={false}
              >
                View Product
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroImage;
