import React, { useState, useEffect } from "react";
import FromHeaders from "../../../Common/FromHeaders";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  setNextSection,
  technicalSkillAdd,
  technicalSkillRemove,
  toolsSkillAdd,
  toolsSkillRemove,
} from "../../../Slice/ResumeSlice";
import { usePerticularResume } from "../../../Hook/ResumeHooks";
import { updateResumeSkill } from "../../../Api/resumeApi";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Button_Loader from "../../../UI/Button_Loader";

// Icons
import { LuCpu, LuWrench, LuPlus, LuX, LuSave } from "react-icons/lu";

const Skill = () => {
  const { id } = useParams();
  const [input, setInput] = useState("");
  const [inputTools, setInputTools] = useState("");
  
  const resume = useSelector((state) => state.resume);
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  // --- Handlers ---

  const handleDeletSkill = (id) => {
    dispatch(technicalSkillRemove({ id }));
  };

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (input.trim() !== "") {
      dispatch(technicalSkillAdd({ technical: input }));
      setInput("");
    }
  };

  const handleDeletTools = (id) => {
    dispatch(toolsSkillRemove({ id }));
  };

  const handleAddTools = (e) => {
    e.preventDefault();
    if (inputTools.trim() !== "") {
      dispatch(toolsSkillAdd({ tools: inputTools }));
      setInputTools("");
    }
  };

  // --- Data Fetching & Validation ---

  const apiSkills = usePerticularResume(id)?.data?.data?.skills;
  const skillDataRead = apiSkills ?? { technical: [], tools: [] };
  const { technical, tools } = skillDataRead;

  useEffect(() => {
    const allFilled = technical.length > 0 && tools.length > 0;
    dispatch(setNextSection(!allFilled));
  }, [technical, tools, dispatch]);

  const resumeSkillMutation = useMutation({
    mutationFn: updateResumeSkill,
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

  const handleSaveSkills = (e) => {
    e.preventDefault();
    resumeSkillMutation.mutate({ ...resume.skills, id });
  };

  return (
    <div className="w-full mx-auto bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      
      {/* 1. Header */}
      <div className="px-8 py-6 border-b border-gray-100">
        <FromHeaders
          title={"Skills"}
          des={"Highlight your top professional technical skills and tools."}
        />
      </div>

      {/* 2. Form Content */}
      <form className="p-8 flex flex-col gap-8">
        
        {/* --- Section 1: Technical Skills --- */}
        <SkillGroup 
          title="Technical Skills"
          icon={LuCpu}
          skills={resume.skills?.technical}
          inputValue={input}
          setInputValue={setInput}
          onAdd={handleAddSkill}
          onRemove={handleDeletSkill}
          placeholder="e.g. React, Node.js, Python, Java..."
        />

        {/* Divider */}
        <div className="h-px bg-gray-100 w-full" />

        {/* --- Section 2: Tools --- */}
        <SkillGroup 
          title="Tools & Platforms"
          icon={LuWrench}
          skills={resume.skills?.tools}
          inputValue={inputTools}
          setInputValue={setInputTools}
          onAdd={handleAddTools}
          onRemove={handleDeletTools}
          placeholder="e.g. Git, Docker, AWS, Figma..."
        />

        {/* 3. Footer Action */}
        <div className="flex justify-end pt-2">
          <button
            onClick={handleSaveSkills}
            disabled={resumeSkillMutation.isPending}
            className="relative inline-flex items-center justify-center px-8 py-2.5 text-sm font-medium text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {resumeSkillMutation.isPending ? (
              <div className="flex items-center gap-2">
                <Button_Loader text={"saving..."}/>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span>Save Skills</span>
              </div>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

// --- Reusable Component for Skill Sections ---
const SkillGroup = ({ title, icon: Icon, skills, inputValue, setInputValue, onAdd, onRemove, placeholder }) => {
  return (
    <div className="flex flex-col gap-3">
      {/* Label */}
      <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
        <div className="p-1.5 rounded-md bg-blue-50 text-blue-600">
             <Icon className="w-4 h-4" />
        </div>
        {title}
      </label>

      {/* Tags Display Container */}
      <div className="min-h-[50px] p-4 rounded-lg border border-gray-200 bg-gray-50/50 flex flex-wrap gap-2 transition-all hover:border-gray-300 hover:bg-gray-50">
        {(!skills || skills.length === 0) ? (
          <span className="text-sm text-gray-400 italic">No skills added yet. Type below to add.</span>
        ) : (
          skills.map((skill, index) => (
            <div
              key={index}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-white text-gray-700 border border-gray-200 shadow-sm group transition-all hover:border-blue-300 hover:text-blue-600"
            >
              <span className="capitalize">{skill}</span>
              <button
                type="button"
                onClick={() => onRemove(index)}
                className="p-0.5 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
              >
                <LuX className="w-3 h-3" />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Input Area */}
      <div className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
              if(e.key === 'Enter') {
                  e.preventDefault(); 
                  onAdd(e);
              }
          }}
          placeholder={placeholder}
          className="flex-grow px-4 py-2.5 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg outline-none transition-all duration-200 
                     placeholder:text-gray-400 
                     hover:border-gray-400 
                     focus:border-blue-600 focus:ring-1 focus:ring-blue-600 shadow-sm"
        />
        <button
          type="button"
          onClick={onAdd}
          disabled={!inputValue.trim()}
          className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 hover:border-blue-300 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95"
        >
          <LuPlus className="w-4 h-4 mr-1.5" />
          Add
        </button>
      </div>
    </div>
  );
};

export default Skill;