import { useAuth } from "@/context/Auth.Context";
import { logOut } from "@/helpers/Login.helper";
import { NavItemsLogin } from "@/helpers/NavItems.helper";
import PATHROUTHES from "@/helpers/PagesRoutes.helper";
import Link from "next/link";
import { useRouter } from "next/navigation";

const LoginNavBar: React.FC = () => {
  const { counter } = useAuth();
  const router = useRouter();
  const handleLogOut = () => {
    logOut();
    //redireccionamos al home
    router.push(PATHROUTHES.HOME);
    //recargamos la pagina
    const timer = setTimeout(() => {
      window.location.reload();
    }, 2000);
    return () => clearTimeout(timer);
  };
  return (
    <>
      {NavItemsLogin.map((item, index) => (
        <Link
          key={index}
          href={item.path}
          className="block py-2 px-3 dark:hover:text-blue-700 hover:text-black mx-auto "
        >
          <div className="flex">
            {item.name}
            {item.name === "My Cart" && (
              <p className="mx-1 text-orange-600 dark:text-red-600 text-base">
                {counter > 0 ? counter : null}
              </p>
            )}
          </div>
        </Link>
      ))}
      <button
        onClick={handleLogOut}
        className="block py-2 px-3 dark:hover:text-blue-700 hover:text-black"
      >
        Sign Out
      </button>
    </>
  );
};

export default LoginNavBar;
