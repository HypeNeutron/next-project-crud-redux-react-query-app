import { toast, ToastOptions } from "react-toastify";

type TPosVertical = "top" | "bottom" | "center";
type TPosHorizon = "left" | "right" | "center";
type TPosLinks = `${TPosVertical}-${TPosHorizon}`;

type TPos = Exclude<
  TPosLinks,
  "center-center" | "center-left" | "center-right"
>;

export type TStatus = "success" | "warning" | "info" | "error";

type TToast = {
  type: TStatus;
  message: string;
  pos?: TPos;
  hideProgress?: boolean;
  autoCloseTime?: number;
};

type TOpts = {
  autoClose: number;
  position: TPos;
  hideProgressBar: boolean;
  closeOnClick: boolean;
  pauseOnHover: boolean;
  draggable: boolean;
};

export default function showToast({
  type,
  message,
  hideProgress,
  autoCloseTime,
  pos,
}: TToast) {
  const opts: ToastOptions<TOpts> = {
    autoClose: autoCloseTime || 5000,
    position: pos || "top-center", //top|bottom|left|right|center
    hideProgressBar: hideProgress || false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  };

  switch (type) {
    case "success":
      toast.success(message, opts);
      break;

    case "error":
      toast.error(message, opts);
      break;

    case "warning":
      toast.warn(message, opts);
      break;

    case "info":
      toast.info(message, opts);
      break;

    default:
      toast(message, opts);
      break;
  }
}
