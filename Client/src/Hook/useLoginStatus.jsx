import { useQuery } from "@tanstack/react-query";
import { statusApi } from "../Api/api";

export const useLoginStatus = () => {
  return useQuery({
    queryKey: ["loginStatus"],
    queryFn: statusApi,
    staleTime: 0,
    retry: false,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
};
