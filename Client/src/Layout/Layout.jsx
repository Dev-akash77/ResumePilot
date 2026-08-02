import React, { useState } from "react";
import logo from "../assets/Images/favicon.svg";
import { Outlet, useNavigate } from "react-router-dom";
import { FaBarsStaggered, FaFireFlameSimple } from "react-icons/fa6";
import Sidebar from "./Sidebar";
import { useGetProfile } from "../hook/useProfile";
import { useSelector } from "react-redux";
import ResumeDailogBox from "../Components/ResumeDailogBox";
import { RxCross1 } from "react-icons/rx";

const Layout = () => {
  const navigate = useNavigate();
  const { data: profileData } = useGetProfile();
  // ! OPEN RESUME BOX
  const resume = useSelector((state) => state.resume);

  // ! site bar logic true or false
  const [openMenue, setOpenMenue] = useState(false);

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

          <div className="md:flex items-center gap-2 text-xl font-medium hidden">
            <FaFireFlameSimple className="text-blue text-2xl" />
            {profileData?.data.cradit}
          </div>

          <div
            className="flex items-center text-xl font-medium md:hidden"
            onClick={() => setOpenMenue(!openMenue)}
          >
            {!openMenue ? <FaBarsStaggered /> : <RxCross1 />}
          </div>
        </div>
      </header>

      <div className="flex max-w-screen h-full items-center md:static relative">
        <Sidebar menue={openMenue} setMenue={setOpenMenue}/>
        <div
          className={`md:w-full max-w-screen bg-backgroundGray h-screen ${openMenue ? "overflow-hidden opacity-[.2]" : "overflow-y-auto oapcity-[100]"}`}
        >
          {<Outlet  />}
        </div>
      </div>
      {resume.openDialog && <ResumeDailogBox />}
    </div>
  );
};

export default Layout;
