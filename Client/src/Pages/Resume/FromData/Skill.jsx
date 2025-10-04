import React, { useState } from "react";
import FromHeaders from "../../../Common/FromHeaders";
import { RxCross2 } from "react-icons/rx";

const Skill = () => {
  const [skills, setSkills] = useState([]);
  const [input, setInput] = useState("");

  //   ! delete skill
  const handleDeletSkill = (id) => {
    setSkills((prev) => prev.filter((_, i) => i !== id));
  };

  //   ! Add skill
  const handleAddSkill = (e) => {
    e.preventDefault();
    if (input.trim() !== "") {
      setSkills((prev) => [...prev, input.trim()]);
      setInput(""); 
    }
  };

  const [tools, setTools] = useState([]);
  const [inputTools, setInputTools] = useState("");


  //   ! delete skill
  const handleDeletTools = (id) => {
    setTools((prev) => prev.filter((_, i) => i !== id));
  };

  //   ! Add skill
  const handleAddTools = (e) => {
    e.preventDefault();
    if (inputTools.trim() !== "") {
      setTools((prev) => [...prev, inputTools.trim()]);
      setInputTools(""); 
    }
  };

  return (
    <div className="border-t-5 border-t-blue overflow-hidden rounded-lg p-3 pb-10 bss bg-white">
      {/* Header of the form */}
      <FromHeaders
        title={"Skills"}
        des={"Add Your Top Professional Key Skills"}
      />

      {/* form */}
      <form className="w-full mt-3 flex flex-col gap-5">
        {/* Add Technical Skills */}
        <div className="flex flex-col gap-2">
          <h2 className="font-medium text-xl flex items-center text-gray-700">
            Technical
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-7 gap-x-2 gap-y-3">
            {skills.map((cur, id) => {
              return (
                <div
                  key={id}
                  className="rounded-md capitalize text-gray-700 bg-gray-200 py-[.2rem] gap-2 px-2 text-[.7rem] text-center flex w-max items-center justify-center"
                >
                  {cur}{" "}
                  <RxCross2
                    className="cursor-pointer"
                    onClick={() => {
                      handleDeletSkill(id);
                    }}
                  />
                </div>
              );
            })}
          </div>

          <div className="fcb gap-4">
            <input
              type="text"
              required
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="React, Node, C++, Python, Java, Javacript, Etc.."
              className="outline-0 border-gray-300 py-1 px-2 rounded-sm border placeholder:text-gray-300 placeholder:font-normal w-full"
            />
            <button className="py-2 px-5 rounded-md cursor-pointer bg-blue cc text-white" onClick={handleAddSkill}>
              Add
            </button>
          </div>
        </div>

        {/* Add Tools */}
        <div className="flex flex-col gap-2">
          <h2 className="font-medium text-xl flex items-center text-gray-700">
            Tools
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-7 gap-x-2 gap-y-3">
            {tools.map((cur, id) => {
              return (
                <div
                  key={id}
                  className="rounded-md capitalize text-gray-700 bg-gray-200 py-[.2rem] gap-2 px-2 text-[.7rem] text-center flex w-max items-center justify-center"
                >
                  {cur}{" "}
                  <RxCross2
                    className="cursor-pointer"
                    onClick={() => {
                      handleDeletTools(id);
                    }}
                  />
                </div>
              );
            })}
          </div>

          <div className="fcb gap-4">
            <input
              type="text"
              required
              value={inputTools}
              onChange={(e) => setInputTools(e.target.value)}
              placeholder="React, Node, C++, Python, Java, Javacript, Etc.."
              className="outline-0 border-gray-300 py-1 px-2 rounded-sm border placeholder:text-gray-300 placeholder:font-normal w-full"
            />
            <button className="py-2 px-5 rounded-md cursor-pointer bg-blue cc text-white" onClick={handleAddTools}>
              Add
            </button>
          </div>
        </div>

        <div className="flex items-end justify-end">
          <button
            type="button"
            className="bg-blue w-[6rem] h-[2.5rem] text-white cc rounded-md cursor-pointer"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default Skill;
