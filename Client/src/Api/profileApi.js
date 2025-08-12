import toast from "react-hot-toast";
import { api } from "./api";

// ! get profile data
export const getProfileData = async () => {
  try {
    const {data} = await api.get(`/profile/`);
    return data
  } catch (error) {
    toast.error(error?.response?.data?.message);
    console.log(error?.response?.data?.message || error.message);
  }
};
