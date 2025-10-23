import React, { useEffect, useState } from "react";
import { CiSquarePlus } from "react-icons/ci";
import ResumeCard from "../../Common/ResumeCard";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLoginStatus } from "./../../Hook/useLoginStatus";
import { useDispatch } from "react-redux";
import { isAuthenticate, LogoutAuth } from "../../Slice/AuthSlice";
import { toogleDialogBox } from "../../Slice/ResumeSlice";
import { useAllResume } from "../../Hook/ResumeHooks";

const Dashboard = () => {
  const isLogin = useSelector((state) => {
    return state.auth.isAuthenticated;
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data: loginData, isLoading, isError } = useLoginStatus();
  useEffect(() => {
    if (isLoading) return;

    if (loginData?.success) {
      dispatch(isAuthenticate());
    } else {
      dispatch(LogoutAuth());
    }
    if (isError) {
      dispatch(LogoutAuth());
    }
  }, [loginData]);

  useEffect(() => {
    if (isLoading) return;

    if (!isLogin) {
      navigate("/auth");
    }
  }, [isLogin, isError]);

  // ! Get All Resume
  const {data:allResume} = useAllResume();

  return (
    <div className="w-full h-full z-40 cc pb-18">
      <div className="py-4 h-full w-[95%] overflow-y-auto">
        <h2 className="text-3xl font-semibold">My resume</h2>
        <h3 className="text-lg capitalize text-gray-500">
          Start creating AI resume for your next job role
        </h3>
        <div className="grid grid-cols-6 gap-7 mt-8">
          <div
            className="h-[15rem] bg-gray-200 cc hover:scale-[1.02] duration-150 rounded-md cursor-pointer"
            onClick={()=>{dispatch(toogleDialogBox())}}
          >
            <CiSquarePlus className="text-3xl" />
          </div>

          {allResume?.data.map((cur, id) => {
            return <ResumeCard color={cur.color} role={cur.title} key={id} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
