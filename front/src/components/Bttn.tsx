import Link from "next/link";

type ButonTipe = {
  text: string;
  Icon: string;
  href: string;
};

const Bttn: React.FC<ButonTipe> = ({ text, Icon, href }) => {
  return (
    <Link
      href={href}
      className="w-48 py-2 px-3 text-darkColor rounded-lg dark:text-white  flex flex-col items-center border border-black dark:border-slate-300 cursor-pointer hover:scale-105 m-auto"
    >
      {text}
      <span className="material-icons grey py-1">{Icon}</span>
    </Link>
  );
};

export default Bttn;
