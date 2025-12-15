import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toogleDialogBox } from "../Slice/ResumeSlice";
import Button_Loader from "../UI/Button_Loader";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { creatResume } from "../Api/resumeApi";
import toast from "react-hot-toast";

// Icons
import { LuX, LuFileText, LuPlus } from "react-icons/lu";

const ResumeDailogBox = () => {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  
  // Professional color palette
  const color = ["#2563eb", "#ef4444", "#ec4899", "#8b5cf6", "#10b981", "#f59e0b"];

  // ! MUTATION FN
  const createResumeMutation = useMutation({
    mutationFn: creatResume,
    onSuccess: (data) => {
      if (data?.success) {
        toast.success(data?.message);
        dispatch(toogleDialogBox());
        queryClient.invalidateQueries({ queryKey: ["allResume"] });
        queryClient.invalidateQueries({ queryKey: ["profileData"] });
      }
    },
  });

  // ! HANDLE CREATE RESUME
  const handleCreatResume = (e) => {
    if(e) e.preventDefault(); // Prevent form reload if wrapped in form
    
    if (!input.trim()) return;

    const randomIndex = Math.floor(Math.random() * color.length);
    const randomColor = color[randomIndex];

    createResumeMutation.mutate({ title: input, color: randomColor });
  };

  return (
    // 1. Overlay with Blur
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm transition-all duration-300">
      
      {/* 2. Modal Container */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all scale-100 mx-4">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <LuFileText className="text-blue-600" />
            Create New Resume
          </h2>
          <button 
            onClick={() => dispatch(toogleDialogBox())}
            className="p-1 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
          >
            <LuX className="text-xl" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-sm text-gray-500 mb-5">
            Give your resume a name to get started. You can change this later.
          </p>

          <div className="flex flex-col gap-4">
            
            {/* Input Field */}
            <div className="group">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">
                    Resume Title / Job Role
                </label>
                <div className="relative flex items-center">
                    <div className="absolute left-3 text-gray-400 group-focus-within:text-blue-600 transition-colors">
                        <LuFileText />
                    </div>
                    <input
                        type="text"
                        value={input}
                        autoFocus
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleCreatResume()}
                        placeholder="e.g. Full Stack Developer"
                        className="w-full pl-10 pr-4 py-3 text-sm text-gray-900 bg-white border border-gray-300 rounded-xl outline-none transition-all duration-200 
                                 placeholder:text-gray-400 
                                 hover:border-gray-400 
                                 focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10"
                    />
                </div>
            </div>

            {/* Action Button */}
            <button
                type="button"
                onClick={handleCreatResume}
                disabled={!input.trim() || createResumeMutation.isPending}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium shadow-lg shadow-blue-600/20 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed disabled:active:scale-100 mt-2"
            >
                {createResumeMutation.isPending ? (
                    <Button_Loader text={"creating..."}/>
                ) : (
                    <div className="cursor-pointer fc gap-2">
                        <LuPlus className="text-lg" />
                        Create Resume
                    </div>
                )}
            </button>

          </div>
        </div>
        
      </div>
    </div>
  );
};

export default ResumeDailogBox;