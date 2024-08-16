//importamos interfaces y helpers

import IProduct from "@/interfaces/Porduct.interface";
import { fetchProducts } from "@/helpers/Products.helper";
import { genNotifyError } from "@/helpers/Notify.helper";
import Cards from "./Cards";

const Products: React.FC = async () => {
  let products: IProduct[] | undefined = [];
  try {
    //obtenemos productos
    products = await fetchProducts();
  } catch (error) {
    genNotifyError(
      "Estamos teniendo problemas para mostrarte los productos, intete luego nuevamente"
    );
  }
  return (
    <main>
      <Cards products={products} />
    </main>
  );
};

export default Products;
