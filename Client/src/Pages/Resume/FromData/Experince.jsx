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
  // MUST use Redux 'experience' (latest user edits) — not server data
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
    <div className="border-t-5 border-t-blue overflow-hidden rounded-lg p-3 pb-10 bss bg-white">
      <FromHeaders
        title={"Professional Experience"}
        des={"Add Your Previous Job Experience"}
      />

      <form className="w-full mt-3 flex flex-col gap-5" onSubmit={handleSaveExperience}>
        <div className="border-2 border-gray-300 p-3 rounded-md flex flex-col gap-2">
          {/* TITLE + ROLE */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex flex-col text-[1rem] font-medium w-full">
              <p>Job Title</p>
              <input
                type="text"
                name="title"
                placeholder="Freelance Project"
                value={experience.title}
                onChange={handelExperienceChanged}
                className="outline-0 border-gray-300 py-1 px-2 rounded-sm border"
              />
            </div>

            <div className="flex flex-col text-[1rem] font-medium w-full">
              <p>Job Position</p>
              <input
                type="text"
                name="role"
                placeholder="DevOps Engineer"
                value={experience.role}
                onChange={handelExperienceChanged}
                className="outline-0 border-gray-300 py-1 px-2 rounded-sm border"
              />
            </div>
          </div>

          {/* LOCATION */}
          <div className="flex flex-col text-[1rem] font-medium w-full">
            <p>Location</p>
            <input
              type="text"
              name="location"
              placeholder="West Bengal, India"
              value={experience.location}
              onChange={handelExperienceChanged}
              className="outline-0 border-gray-300 py-1 px-2 rounded-sm border"
            />
          </div>

          {/* DATES */}
          <div className="flex w-full gap-3">
            <div className="flex flex-col text-[1rem] font-medium w-full">
              <p>Start Date</p>
              <input
                type="date"
                name="start"
                value={formatDate(experience.start)}
                onChange={handelExperienceChanged}
                className="outline-0 border-gray-300 py-1 px-2 rounded-sm border"
              />
            </div>

            <div className="flex flex-col text-[1rem] font-medium w-full">
              <p>End Date</p>
              <input
                type="date"
                name="end"
                value={formatDate(experience.end)}
                onChange={handelExperienceChanged}
                className="outline-0 border-gray-300 py-1 px-2 rounded-sm border"
              />
            </div>
          </div>

          {/* BULLET EDITOR */}
          <div>
            <p className="text-[1rem] font-medium">
              Add Points For Experience{" "}
              <span className="text-gray-300 ml-5">MAX - 5</span>
            </p>

            <div className="[&_.rsw-editor_ul]:list-disc [&_.rsw-editor_ul]:ml-6 rounded-md border border-gray-200">
              <EditorProvider>
                <Toolbar className="hidden">
                  <BtnBulletList />
                </Toolbar>

                <Editor value={htmlHFrom} onChange={handlefromChange} />
              </EditorProvider>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue w-[10rem] h-[2.5rem] text-white cc rounded-md cursor-pointer"
            disabled={resumeExperiencenMutation.isPending}
          >
            {resumeExperiencenMutation.isPending ? <Button_Loader /> : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Experince;
