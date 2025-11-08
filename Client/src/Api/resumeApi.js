import toast from "react-hot-toast";
import { api } from "./api";

// ! GET ALL REUSME
export const getAllResume = async () => {
  try {
    const { data } = await api.get(`/resume/`);
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    console.log(error?.response?.data?.message || error.message);
  }
};

// ! Create Resume
export const creatResume = async ({ title, color }) => {
  try {
    const { data } = await api.post(`/resume/`, { title, color });
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    console.log(error?.response?.data?.message || error.message);
  }
};

// ! GET HEADER DATA
export const getPerticularResume = async (id) => {
  if (!id) return null;
  try {
    const { data } = await api.get(`/resume/${id}`);
    return data || {};
  } catch (error) {
    toast.error(error?.response?.data?.message);
    console.log(error?.response?.data?.message || error.message);
  }
};

// ! UPDATE HEADER DATA
export const updateResumeHeader = async (fromData) => {
  try {
    const { data } = await api.post(`/resume/header`, fromData);
    return data || {};
  } catch (error) {
    toast.error(error?.response?.data?.message);
    console.log(error?.response?.data?.message || error.message);
  }
};

// ! UPDATE SUMMARY DATA
export const updatResumeSummary = async (fromData) => {
  try {
    const {data} = await api.post(`/resume/summary`,fromData);
    return data || {};
  } catch (error) {
    toast.error(error?.response?.data?.message);
    console.log(error?.response?.data?.message || error.message);
  }
};

// ! UPDATE EDUCATION DATA
export const updateResumeEducation = async (fromData) => {
  try {
    const {data} = await api.post(`/resume/education`,fromData);
    return data || {};
  } catch (error) {
    toast.error(error?.response?.data?.message);
    console.log(error?.response?.data?.message || error.message);
  }
};
