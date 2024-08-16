import { genNotifyError } from "@/helpers/Notify.helper";
import { fetchProducts } from "@/helpers/Products.helper";
import IProduct from "@/interfaces/Porduct.interface";
import SimilarCard from "./SimilarCard";

const SimilarProducts: React.FC = async () => {
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
    <section className="h-[390px] bg-slate-300 overflow-hidden w-full ">
      <h3 className="text-center font-bold text-black pt-2 m-1">
        Our sellest products:
      </h3>
      <div className="flex flex-wrap gap-3 m-auto p-5 ">
        {products?.map((product) => (
          <SimilarCard
            key={product.id}
            id={product.id}
            name={product.name}
            description={product.description}
            price={product.price}
            image={product.image}
            categoryId={product.categoryId}
          />
        ))}
      </div>
    </section>
  );
};

export default SimilarProducts;
