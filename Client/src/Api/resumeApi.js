import toast from "react-hot-toast";
import { api } from "./api";





// ! GET ALL REUSME
export const getAllResume = async () => {
  try {
    const {data} = await api.get(`/resume/`);
    return data
  } catch (error) {
    toast.error(error?.response?.data?.message);
    console.log(error?.response?.data?.message || error.message);
  }
};




// ! Create Resume
export const creatResume = async ({title,color}) => {
  try {
    const {data} = await api.post(`/resume/`,{title,color});
    return data
  } catch (error) {
    toast.error(error?.response?.data?.message);
    console.log(error?.response?.data?.message || error.message);
  }
};