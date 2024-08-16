import IProduct from "./Porduct.interface";

export default interface IOrder {
  id: number;
  status: string;
  date: Date;
  products: IProduct[];
}
