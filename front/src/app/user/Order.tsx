//importamos interface y componente
import IOrder from "@/interfaces/Order.interface";
import OrdenItem from "./OrdenItem";

const Order: React.FC<IOrder> = ({ id, status, date, products }) => {
  // Formateamos la fecha DD/MM/AAAA
  const formatter = new Intl.DateTimeFormat("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  let buyedDate = formatter.format(new Date(date));
  return (
    <div className=" hover:bg-white border  rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-5 flex flex-col items-center bg-primaryColor dark:hover:bg-zinc-800  hover:scale-105 p-2">
      <h2 className="text-xl">Order Nº {id}</h2>
      <h4>Status of the order: {status}</h4>
      <h4>Date of the order: {buyedDate}</h4>
      <h4>Product buyed:</h4>
      {products.map((product) => (
        <OrdenItem key={product.id} {...product} />
      ))}
    </div>
  );
};

export default Order;
