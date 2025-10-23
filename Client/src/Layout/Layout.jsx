import React from "react";
import logo from "../assets/Images/favicon.svg";
import { Outlet, useNavigate } from "react-router-dom";
import { FaFireFlameSimple } from "react-icons/fa6";
import Sidebar from "./Sidebar";
import { useGetProfile } from "./../Hook/useProfile";
import { useSelector } from "react-redux";
import ResumeDailogBox from "../Components/ResumeDailogBox";

const Layout = () => {
  const navigate = useNavigate();
  const { data: profileData } = useGetProfile();
  // ! OPEN RESUME BOX
  const resume = useSelector((state) => state.resume);
  return (
    <div className="h-screen overflow-hidden bg-backgroundGray">
      <header className="cc h-[4rem] w-full bg-background border-b border-gray-200">
        <div className="dcontainer fcb">
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

          <div className="fc gap-2 text-xl font-medium">
            <FaFireFlameSimple className="text-blue text-2xl" />{" "}
            {profileData?.data.cradit}
          </div>
        </div>
      </header>

      <div className="flex w-screen h-full items-center">
        <Sidebar />
        <div className="w-full bg-backgroundGray h-screen">{<Outlet />}</div>
      </div>
      {resume.openDialog && <ResumeDailogBox />}
    </div>
  );
};

export default Layout;
