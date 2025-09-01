import axios from "axios";
import toast from "react-hot-toast";

export const api = axios.create({
  baseURL: import.meta.env.VITE_BACKND_URL,
  withCredentials: true,
});

// ! for registerd api
export const registeredApi = async (data) => {
  try {
    const res = await api.post("/auth/register", data);
    return res?.data;
  } catch (error) {
    console.log(error?.response?.data?.message || error.message);
    toast.error(error?.response?.data?.message);
  }
};

// ! for login api
export const loginApi = async (data) => {
  try {
    const res = await api.post("/auth/login", data);
    return res?.data;
  } catch (error) {
    console.log(error?.response?.data?.message || error.message);
    toast.error(error?.response?.data?.message);
  }
};

// ! for logout api
export const logoutApi = async () => {
  try {
    const res = await api.post("/auth/logout");
    return res?.data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    console.log(error?.response?.data?.message || error.message);
  }
};

// ! for get status user is authenticated or not
export const statusApi = async () => {
  try {
    const res = await api.get("/auth/status");
    return res?.data;
  } catch (error) {
    console.log(error?.response?.data?.message || error.message);
  }
};

// ! send otp for verify account
export const send_otp_verify = async () => {
  try {
    const res = await api.post(`/auth/otp/send`);
    return res?.data;
  } catch (error) {
    console.log(error?.response?.data?.message || error.message);
  }
};

// ! verify account Via OTP
export const verify_account = async (otp) => {
  try {
    const res = await api.post(`/auth/otp/verify`, { otp });
    return res?.data;
  } catch (error) {
    console.log(error?.response?.data?.message || error.message);
  }
};
