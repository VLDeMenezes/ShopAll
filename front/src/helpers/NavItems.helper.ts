import PATHROUTHES from "./PagesRoutes.helper";
//lista de items publicas
export const NavItems = [
  {
    name: "Home",
    path: PATHROUTHES.HOME,
  },
  {
    name: "Products",
    path: PATHROUTHES.PRODUCTS,
  },
];
//lista de items AUTH-ROUTER
export const NavItemsLogin = [
  ...NavItems,
  {
    name: "My Account",
    path: PATHROUTHES.USER,
  },
  {
    name: "My Cart",
    path: PATHROUTHES.CART,
    class: "bg-red",
  },
  
];
