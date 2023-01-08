import { toast } from "react-toastify";

export const AlertError = (text: string) => toast.error(text);
export const SuccessAlert = (text: string) => toast.success(text);
export const InfoAlert = (text: string) => toast.info(text);
export const WarnAlert = (text: string) => toast.warn(text);
