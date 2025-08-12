import { useQuery } from "@tanstack/react-query";
import { getProfileData } from "../Api/profileApi";

export const useGetProfile = () => {
  return useQuery({
    queryKey: ["profileData"],
    queryFn: getProfileData,
    refetchOnMount:true,
    refetchOnWindowFocus:true
  });
};
