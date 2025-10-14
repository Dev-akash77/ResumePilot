import React from "react";
import FromHeaders from "../../../Common/FromHeaders";
import { LuBrain } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { educationChange } from "../../../Slice/ResumeSlice";

const Education = () => {
  const resume = useSelector((state) => state.resume);
  const dispatch = useDispatch();

  // ! HANDLE RESUME EDUCATION FROM DATA CHANGE
  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(educationChange({ name, value }));
  };

  return (
    <div className="border-t-5 border-t-blue overflow-hidden rounded-lg p-3 pb-10 bss bg-white">
      {/* Header of the from */}
      <FromHeaders title={"Education"} des={"Add Your Education Details"} />

      {/* from  */}
      <form className="w-full mt-3 flex flex-col gap-5">
        {/* UNIVERSITY NAME */}
        <div className="flex flex-col text-[1rem] font-medium w-full">
          <p>University & Board Name</p>
          <input
            type="text"
            name="college"
            value={resume.education.college}
            onChange={handleChange}
            placeholder="Kalna Polytechnic, WBSCTE"
            required
            className="outline-0 border-gray-300 py-1 px-2 rounded-sm border placeholder:text-gray-300 placeholder:font-normal"
          />
        </div>

        {/* Degree NAME */}
        <div className="flex flex-col text-[1rem] font-medium w-full">
          <p>Degree</p>
          <input
            type="text"
            name="degree"
            value={resume.education.degree}
            onChange={handleChange}
            placeholder="Btech in Computer Science"
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
              value={resume.education.start}
              onChange={handleChange}
              required
              className="outline-0 border-gray-300 py-1 px-2 rounded-sm border text-gray-500 cursor-pointer"
            />
          </div>

          <div className="flex flex-col text-[1rem] font-medium w-full">
            <p>End Date</p>
            <input
              type="date"
              name="end"
              value={resume.education.end}
              onChange={handleChange}
              required
              className="outline-0 border-gray-300 py-1 px-2 rounded-sm border text-gray-500 cursor-pointer"
            />
          </div>
        </div>

        {/*CGPA & LOCATION */}
        <div className="flex w-full gap-3">
          <div className="flex flex-col text-[1rem] font-medium w-full">
            <p>CGPA</p>
            <input
              type="number"
              name="cgpa"
              value={resume.education.cgpa}
              onChange={handleChange}
              required
              placeholder="8.0"
              className="outline-0 border-gray-300 py-1 px-2 rounded-sm border placeholder:text-gray-300 placeholder:font-normal"
            />
          </div>

          <div className="flex flex-col text-[1rem] font-medium w-full">
            <p>Location</p>
            <input
              type="text"
              name="location"
              value={resume.education.location}
              onChange={handleChange}
              placeholder="West Bengal, India"
              className="outline-0 border-gray-300 py-1 px-2 rounded-sm border placeholder:text-gray-300 placeholder:font-normal"
            />
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

export default Education;
