//creacion de las notificaciones de toastify
import { toast } from "react-toastify";
export const genNotifySuccess = (prhase: string) => {
  if (typeof window !== "undefined") {
    toast.success(prhase, {
      position: "top-center",
      autoClose: 4000,
      closeOnClick: true,
      pauseOnHover: false,
    });
  }
};

export const genNotifyError = (prhase: string) => {
  if (typeof window !== "undefined") {
    toast.warning(prhase, {
      position: "top-center",
      autoClose: 4000,
      closeOnClick: true,
    });
  }
};

export const genNotifyInfo = (prhase: string) => {
  if (typeof window !== "undefined") {
    toast.info(prhase, {
      position: "top-right",
      autoClose: 4000,
      closeOnClick: true,
      pauseOnHover: false,
    });
  }
};

export const genNotifyWarning = (prhase: string) => {
  if (typeof window !== "undefined") {
    toast.warning(prhase, {
      position: "top-center",
      autoClose: 4000,
      closeOnClick: true,
    });
  }
};
