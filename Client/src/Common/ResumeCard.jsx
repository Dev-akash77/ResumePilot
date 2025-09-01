import React from "react";
import resumeImg from "../assets/Images/resumedemo.png";
import { BsThreeDotsVertical } from "react-icons/bs";

const ResumeCard = ({ color, role }) => {
  return (
    <div
      className={`h-[18rem] rounded-lg bg-gradient-to-b from-pink-100 to-blue-100 flex flex-col justify-between overflow-hidden`}
      style={{ borderTop: `7px solid ${color}` }}
    >
      <div className="flex justify-center items-center flex-grow">
        <img src={resumeImg} alt="resume" className="w-25 h-25" />
      </div>
      <div
        className={`text-white text-center p-2 fcb`}
        style={{ backgroundColor: color }}
      >
        {role}
        <BsThreeDotsVertical className="cursor-pointer" />
      </div>
    </div>
  );
};

export default ResumeCard;
