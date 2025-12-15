import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  headerOnChange,
  setNextSection,
} from "../../../Slice/ResumeSlice";
import { usePerticularResume } from "../../../Hook/ResumeHooks";
import { updateResumeHeader } from "../../../Api/resumeApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Button_Loader from "./../../../UI/Button_Loader";

// --- Minimalist Vector Icons (Stroke Style) ---
const UserIcon = () => <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
const MailIcon = () => <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>;
const PhoneIcon = () => <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>;
const GithubIcon = () => <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>;
const GlobeIcon = () => <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>;
const LinkedinIcon = () => <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>;

const Header = () => {
  const { id } = useParams();
  const resume = useSelector((state) => state.resume);
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const { data: headerDataRead } = usePerticularResume(id);

  const {
    name = "",
    email = "",
    number = "",
    portfolio = "",
    github = "",
    linkedin = "",
  } = headerDataRead?.data || {};

  useEffect(() => {
    const allFilled = [name, email, number, github, linkedin, portfolio].every(Boolean);
    dispatch(setNextSection(!allFilled));
  }, [name, email, number, github, linkedin, portfolio, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(headerOnChange({ name, value }));
  };

  const resumeHeaderMutation = useMutation({
    mutationFn: updateResumeHeader,
    onSuccess: (data) => {
      if (data?.success) {
        toast.success(data?.message);
        queryClient.removeQueries({ queryKey: ["perticularResume"] });
        dispatch(setNextSection(false));
      } else {
        dispatch(setNextSection(true));
      }
    },
    onError: () => {
      dispatch(setNextSection(true));
    },
  });

  const handleSaveHeader = (e) => {
    e.preventDefault();
    resumeHeaderMutation.mutate({ ...resume.header, id });
  };

  return (
    <div className="w-full mx-auto bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      
      {/* 1. Clean Minimal Header */}
      <div className="px-8 py-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Personal Details</h2>
          <p className="text-sm text-gray-500 mt-1">
            This info appears at the top of your resume. Keep it accurate.
          </p>
        </div>
        {/* Step Indicator Badge */}
        <div className="px-3 py-1 min-w-max bg-blue-50 text-blue-700 text-xs font-semibold rounded-full border border-blue-100">
          Section 1 of 6
        </div>
      </div>

      {/* 2. Spacious Form Layout */}
      <form className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          
          {/* Group 1: Identity */}
          <div className="md:col-span-2">
             <CleanInput 
                label="Full Name" 
                name="name" 
                value={resume.header?.name} 
                onChange={handleChange} 
                placeholder="e.g. Akash Biswas"
                icon={UserIcon}
                required
             />
          </div>

          <CleanInput 
            label="Email Address" 
            name="email" 
            type="email"
            value={resume.header?.email} 
            onChange={handleChange} 
            placeholder="akash@example.com"
            icon={MailIcon}
            required
          />

          <CleanInput 
            label="Phone Number" 
            name="number" 
            type="number"
            value={resume.header?.number} 
            onChange={handleChange} 
            placeholder="+91 8101602709"
            icon={PhoneIcon}
            required
          />

          {/* Divider for Visual Separation */}
          <div className="md:col-span-2 py-2">
            <div className="h-px bg-gray-100 w-full"></div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mt-4 mb-2">Social Links</p>
          </div>

          <CleanInput 
            label="Portfolio / Website" 
            name="portfolio" 
            value={resume.header?.portfolio} 
            onChange={handleChange} 
            placeholder="www.yourportfolio.com"
            icon={GlobeIcon}
            required
          />

          <CleanInput 
            label="Github Profile" 
            name="github" 
            value={resume.header?.github} 
            onChange={handleChange} 
            placeholder="github.com/username"
            icon={GithubIcon}
          />

          <CleanInput 
            label="LinkedIn Profile" 
            name="linkedin" 
            value={resume.header?.linkedin} 
            onChange={handleChange} 
            placeholder="linkedin.com/in/username"
            icon={LinkedinIcon}
          />
        </div>

        {/* 3. Action Area */}
        <div className="mt-10 flex justify-end items-center border-t border-gray-100 pt-6">
          <button
            onClick={handleSaveHeader}
            disabled={resumeHeaderMutation.isPending}
            className="relative inline-flex items-center justify-center px-8 py-2.5 text-sm font-medium text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {resumeHeaderMutation.isPending ? (
              <div className="flex items-center gap-2">
                <Button_Loader text={"saving...."} />
              </div>
            ) : (
              "Save Changes"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

// --- Reusable Clean Input Component ---
const CleanInput = ({ label, name, type = "text", value, placeholder, onChange, icon: Icon, required }) => {
  return (
    <div className="flex flex-col gap-1.5 group">
      <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
        {label}
        {required && <span className="text-red-500 text-xs">*</span>}
      </label>
      
      <div className="relative flex items-center">
        {/* Icon */}
        <div className="absolute left-3 text-gray-400 group-focus-within:text-blue-600 transition-colors duration-200">
          <Icon />
        </div>
        
        {/* Input */}
        <input
          type={type}
          name={name}
          value={value || ""}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className="w-full pl-10 pr-4 py-2.5 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg outline-none transition-all duration-200 
                     placeholder:text-gray-400 
                     hover:border-gray-400 
                     focus:border-blue-600 focus:ring-1 focus:ring-blue-600 shadow-sm"
        />
      </div>
    </div>
  );
};

export default Header;