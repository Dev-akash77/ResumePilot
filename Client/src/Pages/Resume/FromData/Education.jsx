import React, { useEffect } from "react";
import FromHeaders from "../../../Common/FromHeaders";
import { useDispatch, useSelector } from "react-redux";
import {
  educationChange,
  setNextSection,
} from "../../../Slice/ResumeSlice";
import { useParams } from "react-router-dom";
import { usePerticularResume } from "../../../Hook/ResumeHooks";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateResumeEducation } from "../../../Api/resumeApi";
import Button_Loader from "../../../UI/Button_Loader";
import toast from "react-hot-toast";

// Icons
import { LuGraduationCap, LuScroll, LuCalendar, LuMapPin, LuPercent, LuSave } from "react-icons/lu";

const Education = () => {
  const { id } = useParams();

  const resume = useSelector((state) => state.resume);
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const formatDate = (isoString) => (isoString ? isoString.split("T")[0] : "");

  // ! HANDLE RESUME EDUCATION FROM DATA CHANGE
  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(educationChange({ name, value }));
  };

  // ! GET EDUCATION DATA FOM DATABASE AND SET IN REDUX STATE
  const { data: educationDataRead } = usePerticularResume(id);
  const { college, degree, location, start, end, cgpa } =
    educationDataRead?.data?.education[0] || {};

  // ! CHECK NEXT SECTION
  useEffect(() => {
    const allFilled = [college, degree, location, start, end, cgpa].every(
      Boolean
    );
    if (allFilled) {
      dispatch(setNextSection(false));
    } else {
      dispatch(setNextSection(true));
    }
  }, [college, degree, location, start, end, cgpa, dispatch]);

  const resumeEducationMutation = useMutation({
    mutationFn: updateResumeEducation,
    onError: () => {
      dispatch(setNextSection(true));
    },
    onSuccess: (data) => {
      if (data?.success) {
        toast.success(data?.message);
        queryClient.removeQueries({ queryKey: ["perticularResume"] });
        dispatch(setNextSection(false));
      } else {
        dispatch(setNextSection(true));
      }
    },
  });

  // ! HANDLE SAVE HEADER DATA
  const handleSaveEducation = (e) => {
    e.preventDefault();
    resumeEducationMutation.mutate({ ...resume.education, id });
  };

  return (
    <div className="w-full mx-auto bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      
      {/* 1. Header Section (Badge Removed) */}
      <div className="px-8 py-6 border-b border-gray-100">
        <FromHeaders title={"Education"} des={"Add your educational background and achievements."} />
      </div>

      {/* 2. Form Section */}
      <form className="p-8 flex flex-col gap-6">
        
        {/* University & Degree - Full Width for better readability */}
        <div className="space-y-6">
          <CleanInput 
            label="University / Board Name" 
            name="college"
            value={resume.education.college}
            onChange={handleChange}
            placeholder="Kalna Polytechnic, WBSCTE"
            icon={LuGraduationCap}
            required
          />

          <CleanInput 
            label="Degree / Stream" 
            name="degree"
            value={resume.education.degree}
            onChange={handleChange}
            placeholder="Btech in Computer Science"
            icon={LuScroll}
            required
          />
        </div>

        {/* Grid for compact fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Start & End Date */}
          <CleanInput 
            label="Start Date" 
            name="start"
            type="date"
            value={formatDate(resume.education.start)}
            onChange={handleChange}
            icon={LuCalendar}
            required
          />

          <CleanInput 
            label="End Date (or Expected)" 
            name="end"
            type="date"
            value={formatDate(resume.education.end)}
            onChange={handleChange}
            icon={LuCalendar}
            required
          />

          {/* CGPA & Location */}
          <CleanInput 
            label="CGPA / Percentage" 
            name="cgpa"
            type="number"
            value={resume.education.cgpa}
            onChange={handleChange}
            placeholder="8.0"
            icon={LuPercent}
            required
          />

          <CleanInput 
            label="Location" 
            name="location"
            value={resume.education.location}
            onChange={handleChange}
            placeholder="West Bengal, India"
            icon={LuMapPin}
          />
        </div>

        {/* 3. Footer Action */}
        <div className="flex justify-end pt-6 border-t border-gray-100 mt-2">
          <button
            onClick={handleSaveEducation}
            disabled={resumeEducationMutation.isPending}
            className="relative inline-flex items-center justify-center px-8 py-2.5 text-sm font-medium text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {resumeEducationMutation.isPending ? (
              <div className="flex items-center gap-2">
                <Button_Loader text={"saving..."}/>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <LuSave className="w-4 h-4" />
                <span>Save Education</span>
              </div>
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
        <div className="absolute left-3 text-gray-400 group-focus-within:text-blue-600 transition-colors duration-200 pointer-events-none">
          <Icon className="w-4 h-4" />
        </div>
        
        {/* Input */}
        <input
          type={type}
          name={name}
          value={value || ""}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`w-full pl-10 pr-4 py-2.5 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg outline-none transition-all duration-200 
                     placeholder:text-gray-400 
                     hover:border-gray-400 
                     focus:border-blue-600 focus:ring-1 focus:ring-blue-600 shadow-sm
                     ${type === 'date' ? 'text-gray-500' : ''}`} 
        />
      </div>
    </div>
  );
};

export default Education;