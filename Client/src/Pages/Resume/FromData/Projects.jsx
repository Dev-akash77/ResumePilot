import React, { useEffect, useState } from "react";
import FromHeaders from "../../../Common/FromHeaders";
import {
  Editor,
  Toolbar,
  EditorProvider,
  BtnBulletList,
} from "react-simple-wysiwyg";
import { useDispatch, useSelector } from "react-redux";
import {
  addedProjects,
  removeProjects,
  updateProjectPoints,
  updateProject,
  setProjectsData,
  setNextSection,
} from "../../../Slice/ResumeSlice";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateResumeProjects } from "../../../Api/resumeApi";
import Button_Loader from "../../../UI/Button_Loader";
import { usePerticularResume } from "../../../Hook/ResumeHooks";

// Icons
import { 
  LuFolderGit2, 
  LuLayers, 
  LuInfo, 
  LuLink, 
  LuGithub, 
  LuCalendar, 
  LuList, 
  LuPlus, 
  LuTrash2, 
  LuSave 
} from "react-icons/lu";

const Projects = () => {
  const { id } = useParams();
  const projects = useSelector((state) => state.resume)?.projects;
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  // ! ADDING NEW PROJECT
  const handleAddProject = () => {
    if (projects.length >= 3) {
      return toast.error("Maximum 3 projects allowed");
    }
    dispatch(addedProjects());
  };

  // ! SET Projects MUTATION
  const resumeProjectsMutation = useMutation({
    mutationFn: updateResumeProjects,
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

  // Format dates helpers
  const formatDate = (iso) => (iso ? iso.split("T")[0] : "");

  return (
    <div className="w-full mx-auto bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      
      {/* 1. Header Section */}
      <div className="px-8 py-6 border-b border-gray-100">
        <FromHeaders
          title={"Add Your Projects"}
          des={"Highlight your top projects that reflect your skills."}
        />
      </div>

      {/* 2. Form Section */}
      <form className="p-8 flex flex-col gap-8">
        
        {projects?.map((cur, index) => (
          <div 
            key={index} 
            className="relative p-6 rounded-xl border border-gray-200 bg-gray-50/30 hover:bg-white hover:shadow-sm transition-all duration-300 group"
          >
            {/* Project Header & Remove Button */}
            <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-2">
              <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider flex items-center gap-2">
                 <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs">
                    {index + 1}
                 </span>
                 Project Details
              </h3>
              
              {projects.length > 1 && (
                <button
                  type="button"
                  onClick={() => dispatch(removeProjects(index))}
                  className="text-gray-400 hover:text-red-500 transition-colors p-1 rounded-md hover:bg-red-50 flex items-center gap-1 text-xs font-medium"
                >
                  <LuTrash2 className="w-4 h-4" />
                  <span>Remove</span>
                </button>
              )}
            </div>

            <div className="flex flex-col gap-6">
                
                {/* Row 1: Name & About */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <CleanInput 
                        label="Project Name"
                        value={cur.name}
                        onChange={(e) => dispatch(updateProject({ index, key: "name", value: e.target.value }))}
                        placeholder="e.g. ResumePilot"
                        icon={LuFolderGit2}
                        required
                    />
                    <CleanInput 
                        label="Project Tagline / About"
                        value={cur.about}
                        onChange={(e) => dispatch(updateProject({ index, key: "about", value: e.target.value }))}
                        placeholder="e.g. AI-Driven Resume Builder"
                        icon={LuInfo}
                        required
                    />
                </div>

                {/* Row 2: Tech Stack (Full Width) */}
                <CleanInput 
                    label="Tech Stack Used"
                    value={cur.techStack}
                    onChange={(e) => dispatch(updateProject({ index, key: "techStack", value: e.target.value }))}
                    placeholder="e.g. MERN, Redux, LangChain, Docker, Redis"
                    icon={LuLayers}
                    required
                />

                {/* Row 3: Links */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <CleanInput 
                        label="Live Demo Link"
                        type="url"
                        value={cur.live}
                        onChange={(e) => dispatch(updateProject({ index, key: "live", value: e.target.value }))}
                        placeholder="https://resume-pilot.com"
                        icon={LuLink}
                        required
                    />
                    <CleanInput 
                        label="GitHub Repository"
                        type="url"
                        value={cur.github}
                        onChange={(e) => dispatch(updateProject({ index, key: "github", value: e.target.value }))}
                        placeholder="https://github.com/username/project"
                        icon={LuGithub}
                        required
                    />
                </div>

                {/* Row 4: Dates */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <CleanInput 
                        label="Start Date"
                        type="date"
                        value={formatDate(cur.start)}
                        onChange={(e) => dispatch(updateProject({ index, key: "start", value: e.target.value }))}
                        icon={LuCalendar}
                        required
                    />
                    <CleanInput 
                        label="End Date"
                        type="date"
                        value={formatDate(cur.end)}
                        onChange={(e) => dispatch(updateProject({ index, key: "end", value: e.target.value }))}
                        icon={LuCalendar}
                        required
                    />
                </div>

                {/* Row 5: Bullet Points */}
                <div className="flex flex-col gap-2">
                     <div className="flex justify-between items-end">
                        <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                            <LuList className="w-4 h-4 text-gray-400" />
                            Key Features & Achievements
                        </label>
                        <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider bg-gray-50 px-2 py-0.5 rounded">
                            Max 3 Points
                        </span>
                     </div>

                     <div className="rounded-lg border border-gray-300 overflow-hidden focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all shadow-sm bg-white min-h-[130px]">
                         <div className="prose prose-sm max-w-none p-2 [&_.rsw-editor]:min-h-[120px] [&_.rsw-editor]:outline-none [&_ul]:list-disc [&_ul]:pl-5 [&_li]:text-gray-700 [&_li]:mb-1">
                            <EditorProvider>
                                <Toolbar className="hidden">
                                    <BtnBulletList />
                                </Toolbar>
                                <Editor
                                    value={cur.points?.length ? `<ul>${cur.points.map((p) => `<li>${p}</li>`).join("")}</ul>` : "<ul><li></li></ul>"}
                                    onChange={(e) => {
                                        const html = e.target.value;
                                        const points = (html.match(/<li>(.*?)<\/li>/g) || [])
                                            .map((li) => li.replace(/<\/?li>/g, "").trim())
                                            .filter((text) => text !== "");
                                        dispatch(updateProjectPoints({ index, points }));
                                    }}
                                />
                            </EditorProvider>
                         </div>
                     </div>
                </div>

            </div>
          </div>
        ))}

        {/* Add Project Button */}
        {projects.length < 3 && (
             <button
                type="button"
                onClick={handleAddProject}
                className="w-full py-4 border-2 border-dashed border-blue-200 rounded-xl flex flex-col items-center justify-center gap-2 text-blue-600 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 group"
            >
                <div className="p-2 bg-blue-100 rounded-full group-hover:scale-110 transition-transform">
                    <LuPlus className="w-5 h-5" />
                </div>
                <span className="font-medium text-sm">Add Another Project</span>
            </button>
        )}

        {/* 3. Footer Action */}
        <div className="flex justify-end pt-6 border-t border-gray-100 mt-2">
          <button
            onClick={(e) => {
              e.preventDefault();
              resumeProjectsMutation.mutate({ id, projects });
            }}
            disabled={resumeProjectsMutation.isPending}
            className="relative inline-flex items-center justify-center px-8 py-2.5 text-sm font-medium text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {resumeProjectsMutation.isPending ? (
              <div className="flex items-center gap-2">
                <Button_Loader text={"saving..."} />
              </div>
            ) : (
              <div className="flex items-center gap-2 cursor-pointer">
                <LuSave className="w-4 h-4" />
                <span>Save Projects</span>
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

export default Projects;