import { useQuery } from "@tanstack/react-query";
import { getAllResume } from "../Api/resumeApi";

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
