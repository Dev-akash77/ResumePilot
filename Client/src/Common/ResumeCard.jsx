import React, { useState, useRef, useEffect } from "react";
import resumeImg from "../assets/Images/resumedemo.png";
import { useNavigate } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  LuFileText,
  LuClock,
  LuPencil,
  LuCopy,
  LuEye,
  LuTrash2,
  LuCheck,
} from "react-icons/lu";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteResume } from "../Api/resumeApi";
import toast from "react-hot-toast";

const ResumeCard = ({ data }) => {
  const navigate = useNavigate();
  const { color, title: role, _id } = data;
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const menuRef = useRef(null);
  const queryClient = useQueryClient();
  useEffect(() => {
    const handleOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  const handleCopyId = async () => {
    try {
      await navigator.clipboard.writeText(_id);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  // ! RESUME DELETEMUTATION
  const DeleteMutation = useMutation({
    mutationFn: deleteResume,
    onSuccess: (data) => {
      if (data?.success) {
        toast.success(data?.message);
            queryClient.invalidateQueries({ queryKey: ["userResume"] });
      }
    },
  });
  // ! Resume Delete
  const onDelete = (id) => {
    DeleteMutation.mutate(id);
  };

  const handleMenuAction = (e, action) => {
    e.stopPropagation();
    setMenuOpen(false);
    if (action === "copy") handleCopyId();
    if (action === "preview") navigate(`/resume/${_id}/preview`);
    if (action === "delete") onDelete?.(_id);
  };

  return (
    <div
      onClick={() => navigate(`/resume/${_id}`)}
      className="group relative flex flex-col h-[16rem] w-full bg-white rounded-2xl border border-gray-200 shadow-[0_2px_10px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-visible"
    >
      {/* 1. Preview Section */}
      <div className="relative flex-grow bg-gray-50/50 flex items-end justify-center overflow-hidden border-b border-gray-100 group-hover:bg-blue-50/10 transition-colors rounded-t-2xl">
        <div className="absolute inset-0 opacity-[0.4] bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="relative w-36 h-full bg-white shadow-lg transform translate-y-4 group-hover:translate-y-2 group-hover:scale-105 transition-transform duration-300 rounded-t-md border border-gray-200/60 overflow-hidden">
          <img
            src={resumeImg}
            alt="Resume Preview"
            className="w-full h-full object-cover object-top opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent"></div>
        </div>
        <div className="absolute inset-0 bg-white/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 backdrop-blur-[2px] flex items-center justify-center z-10">
          <span className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-full text-xs font-semibold shadow-xl transform translate-y-2 group-hover:translate-y-0 transition-transform duration-200">
            <LuPencil size={12} />
            Edit Resume
          </span>
        </div>
      </div>

      {/* 2. Details Section */}
      <div className="p-4 bg-white rounded-b-2xl relative z-20">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 overflow-hidden w-full">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm"
              style={{ backgroundColor: `${color}15`, color: color }}
            >
              <LuFileText size={20} />
            </div>
            <div className="flex flex-col min-w-0">
              <h3
                className="font-bold text-gray-800 text-sm truncate capitalize leading-tight"
                title={role}
              >
                {role}
              </h3>
              <p className="text-[10px] text-gray-400 mt-1 flex items-center gap-1 font-medium">
                <LuClock size={10} />
                Last edited recently
              </p>
            </div>
          </div>

          {/* Menu Button + Dropdown */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setMenuOpen((prev) => !prev);
              }}
              className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                menuOpen
                  ? "bg-blue-50 text-blue-500"
                  : "text-gray-400 hover:text-gray-700 hover:bg-gray-100"
              }`}
            >
              <BsThreeDotsVertical size={18} />
            </button>

            {menuOpen && (
              <div className="absolute bottom-9 right-0 w-40 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden">
                {/* Copy ID */}
                <button
                  onClick={(e) => handleMenuAction(e, "copy")}
                  className="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  {copied ? (
                    <LuCheck size={14} className="text-green-500" />
                  ) : (
                    <LuCopy size={14} className="text-indigo-500" />
                  )}
                  {copied ? "Copied!" : "Copy ID"}
                </button>

                <div className="h-px bg-gray-100 mx-2" />

                {/* Preview */}
                <button
                  onClick={(e) => handleMenuAction(e, "preview")}
                  className="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <LuEye size={14} className="text-sky-500" />
                  Preview
                </button>

                <div className="h-px bg-gray-100 mx-2" />

                {/* Delete */}

                <button
                  onClick={(e) => handleMenuAction(e, "delete")}
                  className="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
                >
                  <LuTrash2 size={14} className="text-red-500" />
                  {DeleteMutation.isPending ? "Deleting..." : "Delete"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeCard;
