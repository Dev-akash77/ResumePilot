import React, { useState, useEffect } from "react";
import FromHeaders from "../../../Common/FromHeaders";
import {
  Editor,
  Toolbar,
  EditorProvider,
  BtnBulletList,
} from "react-simple-wysiwyg";

import {
  experienceBulletChange,
  experienceChange,
  setExperienceData,
  setNextSection,
} from "../../../Slice/ResumeSlice";

import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { usePerticularResume } from "../../../Hook/ResumeHooks";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { updateResumeExperience } from "../../../Api/resumeApi";
import toast from "react-hot-toast";
import Button_Loader from "../../../UI/Button_Loader";

// Icons
import { LuBriefcase, LuBuilding, LuMapPin, LuCalendar, LuSave, LuList } from "react-icons/lu";

const Experince = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const queryClient = useQueryClient();

  const resume = useSelector((state) => state.resume);
  const experience = resume.experince || {
    title: "",
    role: "",
    start: "",
    end: "",
    location: "",
    points: [],
  };

  const [htmlHFrom, setHtmlFrom] = useState("<ul><li>&nbsp;</li></ul>");

  const { data: experienceDataRead } = usePerticularResume(id);

  //! -----------------------------
  //! Convert Array -> HTML
  //! -----------------------------
  const pointsToHTML = (pointsArray) => {
    if (!pointsArray || pointsArray.length === 0)
      return "<ul><li>&nbsp;</li></ul>";

    return `<ul>${pointsArray.map((p) => `<li>${p}</li>`).join("")}</ul>`;
  };

  // -----------------------------
  // Convert HTML -> Array
  // -----------------------------
  const extractPoints = (html) => {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = html;

    const lis = wrapper.querySelectorAll("li");
    const clean = [];

    lis.forEach((li) => {
      const text = li.textContent.trim();
      if (text && text !== "<br>" && text !== "&nbsp;") clean.push(text);
    });

    return clean.slice(0, 5); // max 5
  };

  // -----------------------------
  // Load DB -> Redux (seed once)
  // -----------------------------
  useEffect(() => {
    const db = experienceDataRead?.data?.experience;
    if (db) {
      dispatch(setExperienceData(db));
      setHtmlFrom(pointsToHTML(db.points));
    }
  }, [experienceDataRead?.data?.experience, dispatch]);

  // -----------------------------
  // WYSIWYG editor onChange
  // -----------------------------
  const handlefromChange = (e) => {
    const html = e.target.value;
    if (html === "" || html === "<div><br></div>") {
      setHtmlFrom("<ul><li>&nbsp;</li></ul>");
      dispatch(experienceBulletChange([]));
      return;
    }

    setHtmlFrom(html);

    const list = extractPoints(html);
    dispatch(experienceBulletChange(list));
  };

  // -----------------------------
  // Input onChange
  // -----------------------------
  const handelExperienceChanged = (e) => {
    const { name, value } = e.target;
    dispatch(experienceChange({ name, value }));
  };

  // Format dates helpers
  const formatDate = (iso) => (iso ? iso.split("T")[0] : "");

  // -----------------------------
  // Check next section allowed
  // -----------------------------
  useEffect(() => {
    const allFilled = [
      experience.title,
      experience.role,
      experience.start,
      experience.end,
      experience.location,
    ].every(Boolean);

    dispatch(setNextSection(!allFilled));
  }, [
    experience.title,
    experience.role,
    experience.start,
    experience.end,
    experience.location,
    dispatch,
  ]);

  // -----------------------------
  // Backend Mutation
  // -----------------------------
  const resumeExperiencenMutation = useMutation({
    mutationFn: updateResumeExperience,
    onSuccess: (data) => {
      if (data?.success) {
        toast.success(data?.message || "Experience saved");
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

  // -----------------------------
  // On Save Handler
  // -----------------------------
  const handleSaveExperience = (e) => {
    e.preventDefault();
    resumeExperiencenMutation.mutate({ ...experience, id });
  };

  return (
    <div className="w-full mx-auto bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      
      {/* 1. Header Section */}
      <div className="px-8 py-6 border-b border-gray-100">
        <FromHeaders
          title={"Professional Experience"}
          des={"Highlight your career journey and key achievements."}
        />
      </div>

      {/* 2. Form Section */}
      <form className="p-8 flex flex-col gap-6" onSubmit={handleSaveExperience}>
        
        {/* Row 1: Title & Role */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CleanInput 
                label="Job Title"
                name="title"
                value={experience.title}
                onChange={handelExperienceChanged}
                placeholder="e.g. Freelance Project"
                icon={LuBriefcase}
                required
            />
            <CleanInput 
                label="Job Position / Role"
                name="role"
                value={experience.role}
                onChange={handelExperienceChanged}
                placeholder="e.g. DevOps Engineer"
                icon={LuBuilding}
                required
            />
        </div>

        {/* Row 2: Location */}
        <CleanInput 
            label="Location"
            name="location"
            value={experience.location}
            onChange={handelExperienceChanged}
            placeholder="West Bengal, India"
            icon={LuMapPin}
            required
        />

        {/* Row 3: Dates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CleanInput 
                label="Start Date"
                name="start"
                type="date"
                value={formatDate(experience.start)}
                onChange={handelExperienceChanged}
                icon={LuCalendar}
                required
            />
            <CleanInput 
                label="End Date"
                name="end"
                type="date"
                value={formatDate(experience.end)}
                onChange={handelExperienceChanged}
                icon={LuCalendar}
                required
            />
        </div>

        {/* Row 4: Bullet Points Editor */}
        <div className="flex flex-col gap-2 group">
             <div className="flex justify-between items-end">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                    <LuList className="w-4 h-4 text-gray-400" />
                    Key Achievements
                </label>
                <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider bg-gray-50 px-2 py-0.5 rounded">
                    Max 5 Points
                </span>
             </div>

             <div className="rounded-lg border border-gray-300 overflow-hidden focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all shadow-sm bg-white min-h-[150px]">
                 {/* CSS Overrides for the Simple WYSIWYG to match theme */}
                 <div className="prose prose-sm max-w-none p-2 [&_.rsw-editor]:min-h-[140px] [&_.rsw-editor]:outline-none [&_ul]:list-disc [&_ul]:pl-5 [&_li]:text-gray-700 [&_li]:mb-1">
                    <EditorProvider>
                        <Toolbar className="hidden">
                            <BtnBulletList />
                        </Toolbar>
                        <Editor value={htmlHFrom} onChange={handlefromChange} />
                    </EditorProvider>
                 </div>
             </div>
        </div>

        {/* 3. Footer Action */}
        <div className="flex justify-end pt-6 border-t border-gray-100 mt-2">
          <button
            type="submit"
            disabled={resumeExperiencenMutation.isPending}
            className="relative inline-flex items-center justify-center px-8 py-2.5 text-sm font-medium text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {resumeExperiencenMutation.isPending ? (
              <div className="flex items-center gap-2 cursor-pointer">
                <Button_Loader text={"saving...."}/>
              </div>
            ) : (
              <div className="flex items-center gap-2 cursor-pointer">
                <span>Save Experience</span>
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

export default Experince;