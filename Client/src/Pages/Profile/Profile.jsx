import React, { useEffect } from "react";
import { useLoginStatus } from "../../Hook/useLoginStatus";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logoutApi } from "../../Api/api";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { isAuthenticate, LogoutAuth, openOtp } from "../../Slice/AuthSlice";
import Button_Loader from "../../UI/Button_Loader";
import logo from "../../assets/Images/favicon.svg";
import {
  MdDashboard,
  MdDateRange,
  MdEmail,
  MdOutlineVerified,
} from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { GoUnverified } from "react-icons/go";
import { RiPencilFill } from "react-icons/ri";
import { IoMdKey } from "react-icons/io";
import { IoPower } from "react-icons/io5";
import { MdOutlineSecurity } from "react-icons/md";
import { useGetProfile } from "./../../Hook/useProfile";
import Otp from "../../Components/Otp";
import Main_Loader from "../../UI/Main_Loader";

const Profile = () => {
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.auth.isAuthenticated);
  const isOpenOtp = useSelector((state) => state.auth.openOtpBox);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const logoutMutation = useMutation({
    mutationFn: logoutApi,
    onSuccess: (data) => {
      if (data?.success) {
        toast.success(data?.message);
        dispatch(LogoutAuth());
        queryClient.removeQueries({ queryKey: ["loginStatus"] });
        navigate("/");
      }
    },
  });

  const { data, isLoading, isError } = useLoginStatus();

  useEffect(() => {
    if (isLoading) return;

    if (data?.success) {
      dispatch(isAuthenticate());
    } else {
      dispatch(LogoutAuth());
    }
    if (isError) {
      dispatch(LogoutAuth());
    }
  }, [data]);

  useEffect(() => {
    if (isLoading) return;

    if (!isLogin) {
      navigate("/");
    }
  }, [isLogin, isError]);

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  // ! get user profile data
  const { data: profileData, isLoading: loadingProfile } = useGetProfile();

  if (loadingProfile) {
    return <div className="h-screen w-screen cc"> <Main_Loader /></div>;
  }

  const {
    name,
    email,
    avatar,
    cradit,
    isVerified,
    resume,
    lastActivity,
    createdAt,
  } = profileData?.data || {};

  const dateObj = new Date(createdAt);
  const formattedDateJoined = `${
    dateObj.getMonth() + 1
  }/${dateObj.getDate()}/${dateObj.getFullYear()}`;

  function timeSince(date) {
    if (!date) return "No data";

    const seconds = Math.floor((new Date() - new Date(date)) / 1000);

    if (seconds < 5) return "just now";
    if (seconds < 60) return `${seconds} seconds ago`;

    const intervals = {
      year: 31536000,
      month: 2592000,
      day: 86400, 
      hour: 3600,
      minute: 60,
    };

    for (const [unit, value] of Object.entries(intervals)) {
      const interval = Math.floor(seconds / value);
      if (interval >= 1) {
        return `${interval} ${unit}${interval > 1 ? "s" : ""} ago`;
      }
    }

    return "just now";
  }

  const handleVerifyEmail = () => {
    dispatch(openOtp());
  };

  return (
    <div className="h-screen w-screen bg-gray-50 cc">
      <header className="cc h-[5rem] w-full ">
        <div className="container fcb">
          <div
            className="w-max fc gap-1 cursor-pointer"
            onClick={() => {
              navigate("/");
            }}
          >
            <img src={logo} alt="logo" />
            <h2 className="md:text-[1.7rem] text-[1.4rem] text-blue font-semibold">
              ResumePilot
            </h2>
          </div>

          <button
            className="bg-blue text-white rounded-md md:px-10 px-3 py-3 cursor-pointer fc gap-2"
            onClick={() => {
              navigate("/dashboard");
            }}
          >
            Dashboard <MdDashboard className="text-xl text-gray-100" />
          </button>
        </div>
      </header>

      <div className="container flex flex-col items-center py-5">
        <div className="w-[75%] py-2 bg-green-50 rounded-md mt-10 border border-green-600 flex items-center text-green-600 px-3 gap-1 capitalize">
          <FaCheckCircle /> you are login
        </div>

        <div className=" w-[75%] h-[20rem] mt-5 rounded-lg bs overflow-hidden bg-white">
          <div className="h-[43%] w-full bg-blue flex items-center p-5 gap-3">
            <div
              className={`w-[6rem] h-[6rem] ${
                !avatar && "border-3 border-blue-100"
              } rounded-full  overflow-hidden`}
            >
              {avatar ? (
                <img
                  src={avatar}
                  alt={`${name}'s avatar`}
                  className="w-full h-full overflow-hidden"
                />
              ) : (
                <div className="w-full h-full overflow-hidden bg-[rgba(255,255,255,.5)] cc text-4xl text-white">
                  {name?.split("")[0]}
                </div>
              )}
            </div>
            <div className="text-gray-100 flex flex-col items-start gap-1">
              <p className="text-xl">{name}</p>
              <div className="fc gap-1 text-sm">
                <MdEmail className="mt-1" /> {email}
              </div>
              <div className="fc gap-1 text-sm">
                <MdDateRange className="text-md" /> Member science{" "}
                {formattedDateJoined}
              </div>
            </div>
          </div>

          <div className="h-[32%] w-full bg-gray-50 fcb px-7 gap-3">
            <div className="cc gap-2">
              <p className="text-black text-xl">{resume?.length}</p>
              <p className="text-gray-400 text-lg">RESUME CREATED</p>
            </div>
            <div className="cc gap-2">
              <p className="text-black text-xl">{cradit}</p>
              <p className="text-gray-400 text-lg">TOTAL CRADIT</p>
            </div>
            <div className="cc gap-2">
              <p className="text-black text-md capitalize">
                {timeSince(lastActivity)}
              </p>
              <p className="text-gray-400 text-lg"> LAST ACTIVE</p>
            </div>
          </div>

          <div className="h-[24%] w-full flex items-center gap-2 px-5 text-black">
            Email Verification:{" "}
            {isVerified ? (
              <div className="px-5 text-green-500 py-1 rounded-full bg-green-50 text-sm fc gap-1">
                <MdOutlineVerified /> Verified
              </div>
            ) : (
              <div className="px-5 text-red-500 py-1 rounded-full bg-red-50 text-sm fc gap-1">
                <GoUnverified /> UnVerified
              </div>
            )}
          </div>
        </div>

        <div className=" w-[75%] mt-5 fc gap-5">
          <button className="fc gap-1 text-white bg-blue w-[12rem] h-[2.5rem] cursor-pointer rounded-md">
            <RiPencilFill />
            Edit Profile
          </button>
          <button
            className="fc gap-1 text-white bg-blue w-[12rem] h-[2.5rem] cursor-pointer rounded-md"
            onClick={handleVerifyEmail}
          >
            <MdOutlineSecurity />
            {"Verify Email"}
          </button>
          <button className="fc gap-1 text-white bg-blue w-[12rem] h-[2.5rem] cursor-pointer rounded-md">
            <IoMdKey className="text-lg" />
            Set Password
          </button>
          <button className="fc gap-1 text-white bg-blue w-[12rem] h-[2.5rem] cursor-pointer rounded-md">
            {isLoading ? (
              <Button_Loader />
            ) : (
              <div className="fc gap-1" onClick={handleLogout}>
                <IoPower />
                Logout
              </div>
            )}
          </button>
        </div>
      </div>

      {isOpenOtp && <Otp />}
    </div>
  );
};

export default Profile;
