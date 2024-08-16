//importamos librerias, helpers e interfaces
import { genNotifyError } from "@/helpers/Notify.helper";
import PATHROUTHES from "@/helpers/PagesRoutes.helper";
import { fetchProductByID } from "@/helpers/Products.helper";
import IProduct from "@/interfaces/Porduct.interface";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
const useProductId = (productId: string) => {
  //seteamos estados internos
  const [product, setProduct] = useState<IProduct | undefined>(undefined);
  const [imagenes, setImagenes] = useState<string[]>([]);
  //seteamos librerias
  const router = useRouter();
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const product = await fetchProductByID(productId);
        setProduct(product);
        if (product.image) setImagenes([product.image, "/genericProduct.webp"]);
      } catch (error: any) {
        //si hay un error notificamos y redirigimos al home
        genNotifyError(error.message);
        const timer = setTimeout(() => {
          router.push(PATHROUTHES.HOME);
        }, 2000);
        return () => clearTimeout(timer);
      }
    };
    fetchProduct();
  }, [productId, router]);

  return { product, imagenes, router };
};
export default useProductId;
