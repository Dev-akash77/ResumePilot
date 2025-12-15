import React from "react";
import resumeImg from "../assets/Images/resumedemo.png";
import { useNavigate } from "react-router-dom";

// Fixed: Switched back to BsThreeDotsVertical for the menu to prevent errors
import { BsThreeDotsVertical } from "react-icons/bs";
import { LuFileText, LuClock, LuPencil } from "react-icons/lu";

const ResumeCard = ({ data }) => {
  const navigate = useNavigate();
  const { color, title: role, _id } = data;

  return (
    <div
      onClick={() => navigate(`/resume/${_id}`)}
      className="group relative flex flex-col h-[16rem] w-full bg-white rounded-2xl border border-gray-200 shadow-[0_2px_10px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden"
    >
      
      {/* 1. Preview Section (Top) */}
      <div className="relative flex-grow bg-gray-50/50 flex items-end justify-center overflow-hidden border-b border-gray-100 group-hover:bg-blue-50/10 transition-colors">
        
        {/* Subtle Grid Pattern Background */}
        <div className="absolute inset-0 opacity-[0.4] bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>

        {/* The Resume Paper Preview */}
        <div className="relative w-36 h-full bg-white shadow-lg transform translate-y-4 group-hover:translate-y-2 group-hover:scale-105 transition-transform duration-300 rounded-t-md border border-gray-200/60 overflow-hidden">
             {/* Image with slight fade at bottom */}
             <img 
                src={resumeImg} 
                alt="Resume Preview" 
                className="w-full h-full object-cover object-top opacity-90" 
             />
             <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent"></div>
        </div>

        {/* Hover Overlay: "Edit" Action */}
        <div className="absolute inset-0 bg-white/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 backdrop-blur-[2px] flex items-center justify-center z-10">
            <span className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-full text-xs font-semibold shadow-xl transform translate-y-2 group-hover:translate-y-0 transition-transform duration-200">
                <LuPencil size={12} />
                Edit Resume
            </span>
        </div>
      </div>

      {/* 2. Details Section (Bottom) */}
      <div className="p-4 bg-white relative z-20">
        <div className="flex items-start justify-between gap-3">
          
          <div className="flex items-center gap-3 overflow-hidden w-full">
            {/* Dynamic Color Icon Badge */}
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm transition-colors"
              style={{ backgroundColor: `${color}15`, color: color }} // 15% Opacity BG
            >
              <LuFileText size={20} />
            </div>

            {/* Text Info */}
            <div className="flex flex-col min-w-0">
              <h3 className="font-bold text-gray-800 text-sm truncate capitalize leading-tight" title={role}>
                {role}
              </h3>
              <p className="text-[10px] text-gray-400 mt-1 flex items-center gap-1 font-medium">
                <LuClock size={10} />
                Last edited recently
              </p>
            </div>
          </div>

          {/* Context Menu Button */}
          <button
            onClick={(e) => {
              e.stopPropagation(); // Stop card click
              // Add menu logic here
            }}
            className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all"
          >
            <BsThreeDotsVertical size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResumeCard;