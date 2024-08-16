/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
//importamos helpers
import { genNotifyError, genNotifyInfo } from "@/helpers/Notify.helper";
import { addProductToCart, fetchProductByID } from "@/helpers/Products.helper";
//importamos librerias
import { ToastContainer } from "react-toastify";
import { useAuth } from "@/context/Auth.Context";
//importamos libreria swipper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import useProductId from "@/hooks/useProdcutId.hook";
import Image from "next/image";

const ProductID = ({
  params: { productId },
}: {
  params: { productId: string };
}) => {
  const { dataUser, openLogin, variableCounter } = useAuth();
  //usamos hook para obtener los datos del producto
  const { product, imagenes, router } = useProductId(productId);
  //chequeamos la existencia o no del item en el carro, lo agregamos y redirigimos
  const handleAddCart = (e: any) => {
    //comprobamos que el usuario este logueado
    if (!dataUser?.token) {
      genNotifyInfo("Necesitas loguearte antes");
      openLogin();
    } else if (product) {
      try {
        //agregamos el item al carrito
        const producto = addProductToCart(product, productId, router);

        if (producto === undefined) {
          variableCounter("increment");
        }
      } catch (error: any) {
        genNotifyError(error.message);
      }
    }
  };

  return (
    <main>
      {product ? (
        <main className="flex flex-col items-center">
          <article className="w-full max-w-lg border  rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-5 flex flex-col items-center  p-4">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="w-full ">
              <Swiper
                pagination={{ clickable: true }}
                navigation={true}
                modules={[Pagination, Navigation]}
                className="mySwiper"
              >
                {imagenes.map((image, index) => (
                  <SwiperSlide
                    key={index}
                    className=" items-center justify-center min-h-dvh swiper-slide-flex"
                  >
                    <Image
                      src={image}
                      alt={`${product.name} image ${index + 1}`}
                      className="w-full mx-auto"
                      width={300}
                      height={200}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <h3 className="text-sm p-2">{product.description}</h3>
            <h4 className="text-3xl font-bold">${product.price}</h4>
            <button
              id={product.id.toString()}
              onClick={handleAddCart}
              className="text-white bg-primaryColor hover:bg-successColor focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  dark:focus:ring-blue-800 m-4"
            >
              Add to cart
            </button>
          </article>
        </main>
      ) : (
        <div className="w-full flex flex-col items-center">
          <p className="text-3xl font-bold max-w-sm bg-white border border-gray-200 rounded-lg shadow p-5 m-5 text-black">
            Cargando el producto!
          </p>
        </div>
      )}

      <ToastContainer />
    </main>
  );
};

export default ProductID;
