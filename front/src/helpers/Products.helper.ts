//importamos interface y helpers
import IProduct from "@/interfaces/Porduct.interface";
import {
  genNotifyError,
  genNotifyInfo,
  genNotifySuccess,
} from "./Notify.helper";
import PATHROUTHES from "./PagesRoutes.helper";
//obtenemos la URL del .env
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
//funcion para obtener los productos
export const fetchProducts = async () => {
  try {
    const res = await fetch(`${apiUrl}/products`, {
      method: "GET",
      cache: "no-cache",
    });
    const products: IProduct[] = await res.json();
    return products;
  } catch (error: any) {
    genNotifyError(
      `Estamos teniendo problemas para mostrarte los prodcutos, intenta luego. ${error.message}`
    );
  }
};
//funcion para obtener un solo producto por ID
export const fetchProductByID = async (id: string) => {
  const products = await fetchProducts();
  if (products) {
    const product = products.find(
      (product: IProduct) => product.id.toString() === id
    );
    if (!product) throw new Error("Parece que este producto ya no existe");
    return product;
  } else throw new Error("Parece que estamos teniendo problemas");
};
//funcion para añadir un producto al carrito
export const addProductToCart = (
  product: IProduct,
  productId: string,
  router: any
) => {
  //obtenemos del localstorage el carrito
  let cart = JSON.parse(localStorage.getItem("cart") || "[]");
  const productExists = cart.some(
    (producto: IProduct | undefined) => producto?.id === product?.id
  );
  //chequeamos si ya existe el producto en el carrito
  if (productExists) {
    genNotifyInfo(
      "El producto ya existe en el carrito, te llevamos a terminar la compra"
    );
    const timer = setTimeout(() => {
      router.push(PATHROUTHES.CART);
      clearTimeout(timer);
    }, 2000);
    return false;
  } else {
    //en caso de que no exista lo agregamos, lo guardamos al localstorage y redireccionamos
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    genNotifySuccess("Agregado al carrito, vamos a llevarte a verlo");
    setTimeout(() => {
      router.push(PATHROUTHES.CART);
    }, 2000);
  }
};
