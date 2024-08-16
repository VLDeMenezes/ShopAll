//importamos helpers
import { fetchProducts } from "@/helpers/Products.helper";
import items from "@/helpers/DescriptionPage.helper";
//importamos componentes
import Ulist from "@/components/Ulist";
import HeroImage from "@/components/Hero";
import { genNotifyError } from "@/helpers/Notify.helper";
//importamos interface
import IProduct from "@/interfaces/Porduct.interface";
import Contact from "@/components/Contact";

export default async function Home() {
  //cargamos los productos
  let products: IProduct[] = [];
  try {
    const productosFetched = await fetchProducts();
    if (productosFetched) {
      products = productosFetched.slice(0, 3);
    }
  } catch (error: any) {
    genNotifyError(`Error al cargar los productos: ${error.message}`);
  }
  return (
    <main className=" flex flex-col my-10">
      <div className="flex-1 text-center">
        <section className="m-auto max-w-5xl py-12  font-bold flex flex-col items-center">
          <h1 className="text-3xl m-1">ShopAll</h1>
          At ShopAll you will find all the technological products you need. From
          cell phones to computers and Apple products, These are some of the
          best-selling products in our store:
          <ul className="list-none p-5 w-full text-white flex flex-col ">
            {items.map((item) => (
              <Ulist key={item.id} {...item} />
            ))}
          </ul>
        </section>
        <section>
          <h2 className="font-bold text-lg">Our featured Products</h2>
          <span className="material-icons blue arrow block text-9xl m-2 ">
            keyboard_double_arrow_down
          </span>
          {products.map((product) => (
            <HeroImage key={product.id} {...product} />
          ))}
        </section>
        <section>
          <Contact />
          <h3>Where to find us:</h3>
          <iframe
            className="p-5 m-auto max-w-[480px]"
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1578.3669579656566!2d-55.89175580995892!3d-27.365900786649146!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses!2sar!4v1721995025413!5m2!1ses!2sar"
            height="450"
            width={"100%"}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </section>
      </div>
    </main>
  );
}
