import React, { useState } from "react";
import FromHeaders from "../../../Common/FromHeaders";
import {
  Editor,
  Toolbar,
  EditorProvider,
  BtnBulletList,
} from "react-simple-wysiwyg";

const Projects = () => {
  const [htmlHFrom, setHtmlFrom] = useState("<ul><li></li></ul>");

  const [projectsPoint, setProjectsPoint] = useState([]);

  console.log(projectsPoint);

  // ! EXTRACTS POINT FROM LI LIST
  const extractPoints = (html) =>
    (html.match(/<li>(.*?)<\/li>/g) || [])
      .map((li) => li.replace(/<\/?li>/g, "").trim())
      .filter((text) => text !== "");

  // ! HANDLE CHANGE FROM DATA
  const handlefromChange = (e) => {
    setHtmlFrom(e.target.value);
    if (e.target.value === "" || e.target.value === "<div><br></div>") {
      setHtmlFrom("<ul><li>&nbsp;</li></ul>");
    } else {
      setHtmlFrom(e.target.value);
    }

    const points = extractPoints(e.target.value);

    setProjectsPoint(points);
  };
  return (
    <div className="border-t-5 border-t-blue overflow-hidden rounded-lg p-3 pb-10 bss bg-white">
      {/* Header of the from */}
      <FromHeaders
        title={"Add Your Projects"}
        des={"Highlight Your Top Projects That Reflect Your Skills"}
      />

      {/* from  */}
      <form className="w-full mt-3 flex flex-col gap-5">
        {/*  ALL FROM DATA RELATED Project */}
        {/* phase 1 */}
        <p>#1</p>
        <div className="border-2 border-gray-300 p-3 rounded-md flex flex-col gap-2">
          {/* PROJECT NAME AND PROJECT ABOUT */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex flex-col text-[1rem] font-medium w-full">
              <p>Project Name</p>
              <input
                type="text"
                name="name"
                placeholder="ResumePilot"
                required
                className="outline-0 border-gray-300 py-1 px-2 rounded-sm border placeholder:text-gray-300 placeholder:font-normal"
              />
            </div>
            <div className="flex flex-col text-[1rem] font-medium w-full">
              <p>Project About</p>
              <input
                type="text"
                name="about"
                placeholder="AI-Driven Resume Builder"
                required
                className="outline-0 border-gray-300 py-1 px-2 rounded-sm border placeholder:text-gray-300 placeholder:font-normal"
              />
            </div>
          </div>
          {/* TECHSTACK */}
          <div className="flex flex-col text-[1rem] font-medium w-full">
            <p>Tech Stack</p>
            <input
              type="text"
              name="techStack"
              placeholder=" MERN, Redux, LangChain, Google Gemini LLM, Docker, Redis"
              required
              className="outline-0 border-gray-300 py-1 px-2 rounded-sm border placeholder:text-gray-300 placeholder:font-normal"
            />
          </div>
          {/*START DATE AND END DATE */}
          <div className="flex w-full gap-3">
            <div className="flex flex-col text-[1rem] font-medium w-full">
              <p>Start Date</p>
              <input
                type="date"
                name="start"
                required
                className="outline-0 border-gray-300 py-1 px-2 rounded-sm border text-gray-500 cursor-pointer"
              />
            </div>

            <div className="flex flex-col text-[1rem] font-medium w-full">
              <p>End Date</p>
              <input
                type="date"
                name="end"
                required
                className="outline-0 border-gray-300 py-1 px-2 rounded-sm border text-gray-500 cursor-pointer"
              />
            </div>
          </div>
          {/* PROJECT LINK AND GITHUB LINK */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex flex-col text-[1rem] font-medium w-full">
              <p>Live Link</p>
              <input
                type="url"
                name="live"
                placeholder="https://resume-pilot...."
                required
                className="outline-0 border-gray-300 py-1 px-2 rounded-sm border placeholder:text-gray-300 placeholder:font-normal"
              />
            </div>
            <div className="flex flex-col text-[1rem] font-medium w-full">
              <p>Github Link</p>
              <input
                type="url"
                name="github"
                placeholder="https://github.com/Dev-akash77."
                required
                className="outline-0 border-gray-300 py-1 px-2 rounded-sm border placeholder:text-gray-300 placeholder:font-normal"
              />
            </div>
          </div>
          {/* BULLET EDITOR */}
          <div>
            <p className="text-[1rem] font-medium">
              Add Points For Projects{" "}
              <span className="text-gray-300 ml-5">MAX - 3</span>
            </p>
            <div className="[&_.rsw-editor_ul]:list-disc [&_.rsw-editor_ol]:list-decimal [&_.rsw-editor_ul]:ml-6 [&_.rsw-editor_ol]:ml-6 rounded-md border border-gray-200">
              <EditorProvider>
                {/* Toolbar optional; invisible */}
                <Toolbar className="hidden">
                  <BtnBulletList />
                </Toolbar>

                <Editor value={htmlHFrom} onChange={handlefromChange} />
              </EditorProvider>
            </div>
          </div>
        </div>

        {/* phase 2  */}
        <p>#2</p>
        <div className="border-2 border-gray-300 p-3 rounded-md flex flex-col gap-2">
          {/* PROJECT NAME AND PROJECT ABOUT */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex flex-col text-[1rem] font-medium w-full">
              <p>Project Name</p>
              <input
                type="text"
                name="name"
                placeholder="ResumePilot"
                required
                className="outline-0 border-gray-300 py-1 px-2 rounded-sm border placeholder:text-gray-300 placeholder:font-normal"
              />
            </div>
            <div className="flex flex-col text-[1rem] font-medium w-full">
              <p>Project About</p>
              <input
                type="text"
                name="about"
                placeholder="AI-Driven Resume Builder"
                required
                className="outline-0 border-gray-300 py-1 px-2 rounded-sm border placeholder:text-gray-300 placeholder:font-normal"
              />
            </div>
          </div>
          {/* TECHSTACK */}
          <div className="flex flex-col text-[1rem] font-medium w-full">
            <p>Tech Stack</p>
            <input
              type="text"
              name="techStack"
              placeholder=" MERN, Redux, LangChain, Google Gemini LLM, Docker, Redis"
              required
              className="outline-0 border-gray-300 py-1 px-2 rounded-sm border placeholder:text-gray-300 placeholder:font-normal"
            />
          </div>
          {/*START DATE AND END DATE */}
          <div className="flex w-full gap-3">
            <div className="flex flex-col text-[1rem] font-medium w-full">
              <p>Start Date</p>
              <input
                type="date"
                name="start"
                required
                className="outline-0 border-gray-300 py-1 px-2 rounded-sm border text-gray-500 cursor-pointer"
              />
            </div>

            <div className="flex flex-col text-[1rem] font-medium w-full">
              <p>End Date</p>
              <input
                type="date"
                name="end"
                required
                className="outline-0 border-gray-300 py-1 px-2 rounded-sm border text-gray-500 cursor-pointer"
              />
            </div>
          </div>
          {/* PROJECT LINK AND GITHUB LINK */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex flex-col text-[1rem] font-medium w-full">
              <p>Live Link</p>
              <input
                type="url"
                name="live"
                placeholder="https://resume-pilot...."
                required
                className="outline-0 border-gray-300 py-1 px-2 rounded-sm border placeholder:text-gray-300 placeholder:font-normal"
              />
            </div>
            <div className="flex flex-col text-[1rem] font-medium w-full">
              <p>Github Link</p>
              <input
                type="url"
                name="github"
                placeholder="https://github.com/Dev-akash77."
                required
                className="outline-0 border-gray-300 py-1 px-2 rounded-sm border placeholder:text-gray-300 placeholder:font-normal"
              />
            </div>
          </div>
          {/* BULLET EDITOR */}
          <div>
            <p className="text-[1rem] font-medium">
              Add Points For Projects{" "}
              <span className="text-gray-300 ml-5">MAX - 3</span>
            </p>
            <div className="[&_.rsw-editor_ul]:list-disc [&_.rsw-editor_ol]:list-decimal [&_.rsw-editor_ul]:ml-6 [&_.rsw-editor_ol]:ml-6 rounded-md border border-gray-200">
              <EditorProvider>
                {/* Toolbar optional; invisible */}
                <Toolbar className="hidden">
                  <BtnBulletList />
                </Toolbar>

                <Editor value={htmlHFrom} onChange={handlefromChange} />
              </EditorProvider>
            </div>
          </div>
        </div>

        <div className="flex items-end justify-end">
          <button className="bg-blue w-[6rem] h-[2.5rem] text-white cc rounded-md cursor-pointer">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default Projects;
