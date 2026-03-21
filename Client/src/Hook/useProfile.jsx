import { useQuery } from "@tanstack/react-query";
import { getProfileData, getResumeData } from "../Api/profileApi";

export const useGetProfile = () => {
  return useQuery({
    queryKey: ["profileData"],
    queryFn: getProfileData,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
};

export const getUserAllResume = () => {
  return useQuery({
    queryKey:["userResume"],
    queryFn: getResumeData,
    refetchOnMount:true,
    refetchOnWindowFocus:true
  });
};
