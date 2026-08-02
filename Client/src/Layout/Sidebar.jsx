import React from "react";
import { FiFileText, FiHome } from "react-icons/fi";
import { LuBadgeInfo } from "react-icons/lu";
import { useGetProfile } from "../hook/useProfile";
import { NavLink } from "react-router-dom";
import { MdAlignHorizontalLeft } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";
import { isAction } from "@reduxjs/toolkit";

const Sidebar = ({ menue,setMenue }) => {
  
  const { data: profileData } = useGetProfile();

  const { avatar, name } = profileData?.data || {};

  // Safe initials generator
  const initials = name
    ? name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "";

  const menuItems = [
    { name: "Dashboard", icon: <FiHome />, to: "/dashboard" },
    {
      name: "All Resume",
      icon: <MdAlignHorizontalLeft />,
      to: "all_resume",
    },
    { name: "Review Resume", icon: <FiFileText />, to: "review" },
    { name: "About", icon: <LuBadgeInfo className="text-xl" />, to: "about" },
  ];

  const navLinkClass = ({ isActive }) =>
    `w-full rounded-sm ${
      isActive
        ? "bg-gradient-to-r from-[#5577f4] to-[#8a46ec] text-white"
        : "text-black"
    } flex py-2 px-3 items-center gap-2 cursor-pointer text-md`;

  return (
    <div className={`md:w-[15%] bg-background border-r border-gray-200 h-full felx flex-col justify-between items-center overflow-hidden  shadow z-300 md:static absolute ${menue?'left-0':'-left-100'} duration-200`}>
      <div className="px-5 h-full w-full">
        <div className="pt-5 cc">
          {/* Avatar */}
          {avatar ? (
            <img
              src={avatar}
              alt={`${name}'s avatar`}
              className="w-[3.3rem] h-[3.3rem] rounded-full object-cover"
            />
          ) : (
            <div className="w-[3.3rem] h-[3.3rem] bg-blue cc text-2xl text-white rounded-full">
              {initials}
            </div>
          )}

          <p className="w-full text-center mt-1 text-lg">{name || "User"}</p>

          {/* Menu */}
          <div className="flex flex-col mt-7 gap-3 w-full">
            {menuItems.map((cur, id) => (
              <NavLink
                key={id}
                end={cur.to === "/dashboard"}
                to={cur.to}
                className={navLinkClass}
                onClick={()=>{
                  setMenue(false);
                }}
              >
                {cur.icon}
                {cur.name}
              </NavLink>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Profile */}
      <div className="flex justify-between items-center h-[5rem] w-fit gap-2 border-t border-gray-200 px-5 ">
        <NavLink to={"/profile"} className="flex items-center gap-2">
          {avatar ? (
            <img
              src={avatar}
              alt={`${name}'s avatar`}
              className="w-[2rem] h-[2rem] rounded-full object-cover"
            />
          ) : (
            <div className="w-[2rem] h-[2rem] bg-blue cc text-[1rem] text-white rounded-full">
              {initials}
            </div>
          )}

          <div className="text-[.8rem] font-semibold">{name || "User"}</div>
        </NavLink>

        <IoIosLogOut className="text-2xl cursor-pointer hover:text-black duration-75 text-gray-400" />
      </div>
    </div>
  );
};

export default Sidebar;
