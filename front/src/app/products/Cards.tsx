//importamos componente y interface
import Card from "./Card";
import IProduct from "@/interfaces/Porduct.interface";

const Cards: React.FC<{ products: IProduct[] | undefined }> = ({
  products,
}) => {
  return (
    <>
      <div className="flex flex-wrap mx-auto justify-center ">
        {products &&
          products.map((product) => <Card key={product.id} {...product} />)}
      </div>
    </>
  );
};

export default Cards;
