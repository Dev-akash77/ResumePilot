import React from "react";
import { FiFileText, FiHome } from "react-icons/fi";
import { LuBadgeInfo } from "react-icons/lu";
import { useGetProfile } from "../Hook/useProfile";
import { NavLink } from "react-router-dom";
import { MdAlignHorizontalLeft } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";

const Sidebar = () => {
  const { data: profileData } = useGetProfile();

  const { avatar, name } = profileData?.data || {};

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

  const navLinkClass = ({ isActive }) => {
    return `w-full rounded-sm ${
      isActive
        ? "bg-gradient-to-r from-[#5577f4] to-[#8a46ec] text-white"
        : "text-black"
    } flex py-2 px-3 items-center gap-2 cursor-pointer text-md`;
  };

  return (
    <div className="w-[15%] bg-background border-r border-gray-200 h-full cc overflow-hidden relative">
      <div className="px-5 h-full w-full">
        <div className="pt-5 cc">
          {avatar ? (
            <img
              src={avatar}
              alt={`${name}'s avatar`}
              className="w-full h-full overflow-hidden"
            />
          ) : (
            <div className="w-[3.3rem] h-[3.3rem] overflow-hidden bg-blue cc text-2xl text-white rounded-full">
              {name?.split("")[0]}
              {name?.split(" ")[1].split("")[0]}
            </div>
          )}
          <p className="w-full text-center mt-1 text-lg">{name}</p>

          <div className="flex flex-col mt-7 gap-3 w-full">
            {menuItems.map((cur, id) => {
              return (
                <NavLink
                  key={id}
                  end={cur.to === "/dashboard"}
                  to={cur.to}
                  className={navLinkClass}
                >
                  {cur.icon}
                  {cur.name}
                </NavLink>
              );
            })}
          </div>
        </div>
      </div>

      <div className="absolute bottom-15 fcb  h-[5rem] w-full border-t-2 border-t-gray-200 gap-2 px-5">
        <NavLink to={"/profile"} className="fc gap-2">
          {avatar ? (
            <img
              src={avatar}
              alt={`${name}'s avatar`}
              className="w-[2rem] h-[2rem] overflow-hidden"
            />
          ) : (
            <div className="w-[2rem] h-[2rem] overflow-hidden bg-blue cc text-[1rem] text-white rounded-full">
              {name?.split("")[0]}
              {name?.split(" ")[1].split("")[0]}
            </div>
          )}
          <div className="text-[.8rem] font-semibold">{name}</div>
        </NavLink>
        <IoIosLogOut className="text-2xl cursor-pointer hover:text-black duration-75 text-gray-400"/>
      </div>
    </div>
  );
};

export default Sidebar;
