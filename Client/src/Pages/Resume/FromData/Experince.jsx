import React, { useState } from "react";
import FromHeaders from "../../../Common/FromHeaders";
import {
  Editor,
  Toolbar,
  EditorProvider,
  BtnBulletList,
} from "react-simple-wysiwyg";

const Experince = () => {
  const [htmlHFrom, setHtmlFrom] = useState("<ul><li></li></ul>");

  const [experiences, setExperiences] = useState([]);

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

    setExperiences(points);
  };

  return (
    <div className="border-t-5 border-t-blue overflow-hidden rounded-lg p-3 pb-10 bss bg-white">
      {/* Header of the from */}
      <FromHeaders
        title={"Professional Experience"}
        des={"Add Your Previous Job Experience"}
      />

      {/* from  */}
      <form className="w-full mt-3 flex flex-col gap-5">
        {/*  ALL FROM DATA RELATED EDUCATION */}

        <div className="border-2 border-gray-300 p-3 rounded-md flex flex-col gap-2">
          {/* JOB TITLE AND JOB ROLE */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex flex-col text-[1rem] font-medium w-full">
              <p>Job Title</p>
              <input
                type="text"
                name="title"
                placeholder="Freelance Project"
                required
                className="outline-0 border-gray-300 py-1 px-2 rounded-sm border placeholder:text-gray-300 placeholder:font-normal"
              />
            </div>
            <div className="flex flex-col text-[1rem] font-medium w-full">
              <p>Job Position</p>
              <input
                type="text"
                name="role"
                placeholder="Devops Engineer"
                required
                className="outline-0 border-gray-300 py-1 px-2 rounded-sm border placeholder:text-gray-300 placeholder:font-normal"
              />
            </div>
          </div>
          {/* LOCATION */}
          <div className="flex flex-col text-[1rem] font-medium w-full">
            <p>Location</p>
            <input
              type="text"
              name="location"
              placeholder="Westbengal, India"
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
          {/* BULLET EDITOR */}
          <div>
            <p className="text-[1rem] font-medium">Add Points For Experince <span className="text-gray-300 ml-5">MAX - 5</span></p>
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

export default Experince;
