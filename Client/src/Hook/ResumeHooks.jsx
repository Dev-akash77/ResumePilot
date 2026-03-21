import { useQuery } from "@tanstack/react-query";
import { getPerticularResume } from "../Api/resumeApi";


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
