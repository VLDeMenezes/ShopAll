//importamos helper y libreria NEXT
import PATHROUTHES from "@/helpers/PagesRoutes.helper";
import { NextResponse, NextRequest } from "next/server";
import { NextMiddleware } from "next/server";

export const middleware: NextMiddleware = async (request) => {
  //obtenemos el path
  const { pathname } = request.nextUrl;
  //chequeamos si está autenticado
  const isAuthenticated = checkUserAuthentication(request);
  // Redirigimos a la página del home si el usuario no está autenticado
  if (
    pathname.startsWith(PATHROUTHES.USER || PATHROUTHES.CART) &&
    !isAuthenticated
  ) {
    const url = new URL(PATHROUTHES.HOME, request.url);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
};

//funcion para chequear si el usuario esta autenticado mediante cookies
function checkUserAuthentication(request: NextRequest) {
  const authToken = request.cookies.get("authToken");
  return !!authToken;
}
