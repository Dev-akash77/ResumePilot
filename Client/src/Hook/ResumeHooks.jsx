import { useQuery } from "@tanstack/react-query";
import { getAllResume, getPerticularResume } from "../Api/resumeApi";

// ! GET ALL RESUME
export const useAllResume = () => {
  return useQuery({
    queryKey: ["allResume"],
    queryFn: getAllResume,
    // staleTime: 0,
    // retry: false,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
};

// ! GET PERTICULLAR RESUME
export const usePerticularResume = (id) => {
  return useQuery({
    queryKey: ["perticularResume",id],
    enabled: !!id,
    queryFn: () => getPerticularResume(id),
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
};
