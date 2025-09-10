import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/Images/favicon.svg"
import { MdDashboard } from "react-icons/md";
import MainResume from "../../Components/MainResume";

const Resume = () => {
    const navigate = useNavigate();

  return (
    <div className="w-screen">
      <header className="cc h-[5rem] w-full">
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

      {/* main resume lay out */}
      <div className="cc py-10">
        <div className="container flex justify gap-5">
            {/* left side from data */}
            <div className="border w-[40%] h-[35rem] cc text-4xl font-bold">Comming Soon</div>
            {/* main resume */}
            <MainResume />
        </div>
      </div>
    </div>
  );
};

export default Resume;
