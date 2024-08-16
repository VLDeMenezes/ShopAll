import dynamic from "next/dynamic";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar/NavBar";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/context/Auth.Context";
import { ToastContainer } from "react-toastify";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ShopAll",
  description: "E-comerce de tecnologia",
};
const SimilarProducts = dynamic(() => import("@/components/SimilarProdudcts"));
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  if (typeof window !== "undefined" && "serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then((registration) => {
          console.log("Service Worker registrado con éxito:", registration);
        })
        .catch((error) => {
          console.error("Error al registrar el Service Worker:", error);
        });
    });
  }
  return (
    <AuthProvider>
      <html lang="en">
        <head>
          <link rel="shortcut icon" href="./camion.webp" type="image/x-icon" />
        </head>
        <body id="Up" className={inter.className}>
          <NavBar />
          {children}
          <SimilarProducts />
          <Footer />
          <ToastContainer />
        </body>
      </html>
    </AuthProvider>
  );
}
