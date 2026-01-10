import toast from "react-hot-toast";
import { api } from "./api";

// ! ADD PAYMENT DATA
export const paymentData = async (amount) => {
  try {
    const {data} = await api.post(`/payment/payment`,amount);
    return data
  } catch (error) {
    toast.error(error?.response?.data?.message);
    console.log(error?.response?.data?.message || error.message);
  }
};


// ! VERIFY PAYMENT DATA

export const verifyPaymentData = async (paymentData) => {
  try {
    const {data} = await api.post(`/payment/payment/verify`,paymentData);
    return data
  } catch (error) {
    toast.error(error?.response?.data?.message);
    console.log(error?.response?.data?.message || error.message);
  }
};
