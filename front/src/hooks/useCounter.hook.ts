import PATHROUTHES from "@/helpers/PagesRoutes.helper";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const useCounter = () => {
  const [counter, setCounter] = useState(10);
  const router = useRouter();
  useEffect(() => {
    const timer = setTimeout(() => {
      setCounter(counter - 1);
    }, 1000);
    if (counter <= 0) {
      router.push(PATHROUTHES.HOME);
    }
    return () => clearTimeout(timer);
  }, [counter, router]);

  return { counter };
};

export default useCounter;
