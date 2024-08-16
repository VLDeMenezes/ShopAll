type ButtonProps = {
  text: string;
};
const ButtonProduct: React.FC<ButtonProps> = ({ text }) => {
  return (
    <button className="   text-white bg-blue-700 hover:bg-green-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-green-500 dark:focus:ring-blue-800 m-4">
      {text}
    </button>
  );
};

export default ButtonProduct;
