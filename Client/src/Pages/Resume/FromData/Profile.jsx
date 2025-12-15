import React, { useEffect } from "react";
import FromHeaders from "../../../Common/FromHeaders";
import { LuBrain, LuSave, LuSparkles } from "react-icons/lu"; // Added Sparkles for UX
import { useDispatch, useSelector } from "react-redux";
import {
  setNextSection,
  summaryChange,
} from "../../../Slice/ResumeSlice";
import { useParams } from "react-router-dom";
import { usePerticularResume } from "../../../Hook/ResumeHooks";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatResumeSummary } from "../../../Api/resumeApi";
import toast from "react-hot-toast";
import Button_Loader from "../../../UI/Button_Loader";

const Profile = () => {
  const { id } = useParams();
  const resume = useSelector((state) => state.resume);
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  // ! ON CHANGE SUMMARY DATA FUNCTION
  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(summaryChange({ name, value }));
  };

  // ! GET SUMMARY DATA FOM DATABASE AND SET IN REDUX STATE
  const { data: summaryDataRead } = usePerticularResume(id);

  // ! CHECK NEXT SECTION
  useEffect(() => {
    if (summaryDataRead?.data.summary) {
      dispatch(setNextSection(false));
    } else {
      dispatch(setNextSection(true));
    }
  }, [summaryDataRead?.data.summary, dispatch]);

  // ! SET SUMMARY MUTATION
  const resumeSummaryMutation = useMutation({
    mutationFn: updatResumeSummary,
    onSuccess: (data) => {
      if (data?.success) {
        toast.success(data?.message);
        queryClient.removeQueries({ queryKey: ["perticularResume"] });
        dispatch(setNextSection(false));
      }
    },
    onError: () => {
      dispatch(setNextSection(true));
    },
  });

  // ! AFTER SAVING
  const handleClickSave = (e) => {
    e.preventDefault();
    resumeSummaryMutation.mutate({ id, summary: resume.summary });
  };

  return (
    <div className="w-full bg-white rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-100 overflow-hidden">
      
      {/* Top Decor Line */}
      <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 to-purple-500"></div>

      <div className="p-8">
        {/* Header of the form */}
        <div className="mb-8">
            <FromHeaders 
                title={"Professional Summary"} 
                des={"Write a short summary of your career to catch recruiter's attention."} 
            />
        </div>

        {/* Form Container */}
        <form className="w-full flex flex-col gap-6">
          
          {/* ! Toolbar: Label + AI Button */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <label className="text-slate-700 font-semibold text-sm tracking-wide uppercase">
                Your Summary
            </label>
            
            <button 
                type="button" // Prevent form submit
                className="group relative inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-purple-700 bg-purple-50 border border-purple-100 rounded-lg hover:bg-purple-100 hover:border-purple-200 transition-all duration-300 shadow-sm hover:shadow-md active:scale-95"
            >
              <LuSparkles className="text-purple-500 group-hover:animate-pulse" />
              <span>Generate with AI</span>
              {/* Optional: AI Badge */}
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-purple-500"></span>
              </span>
            </button>
          </div>

          {/* PROFILE FORM DATA - Textarea */}
          <div className="relative group">
            <textarea
              name="summary"
              value={resume.summary || ""}
              onChange={handleChange}
              placeholder="Ex: Passionate Software Engineer with 3 years of experience in React and Node.js..."
              className="w-full p-4 text-slate-700 leading-relaxed bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all duration-300 resize-y min-h-[180px] hover:border-slate-300 placeholder:text-slate-400 text-base"
            ></textarea>
            
            {/* Visual Helper text inside bottom right */}
            <div className="absolute bottom-3 right-3 text-xs text-slate-400 pointer-events-none bg-white px-1">
                {resume.summary ? resume.summary.length : 0} characters
            </div>
          </div>

          {/* Action Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-2">
            <p className="text-xs text-slate-400 hidden sm:block">
                Tip: Keep it between 2-4 sentences.
            </p>

            <button
              onClick={handleClickSave}
              disabled={resumeSummaryMutation.isPending}
              className="inline-flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 text-white min-w-[140px] px-6 py-3 rounded-xl font-medium shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30 transition-all duration-300 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {resumeSummaryMutation.isPending ? (
                <Button_Loader text={"saving..."}/>
              ) : (
                <>
                    <span>Save Summary</span>
                </>
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Profile;