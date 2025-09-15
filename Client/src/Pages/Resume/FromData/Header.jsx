import React from "react";
import { useParams } from "react-router-dom";
import FromHeaders from "../../../Common/FromHeaders";

const Header = () => {
  const { id, section } = useParams();

  return (
    <div className="border-t-5 border-t-blue overflow-hidden rounded-lg p-3 pb-10 bss bg-white">
      {/* Header of the from */}
      <FromHeaders
        title={"Personal Details"}
        des={"Get Started With The Personal Information"}
      />

      {/* from  */}
      <form className="w-full mt-3 flex flex-col gap-5">
        {/* name email */}
        <div className="flex w-full gap-3">
          {/* name and email */}
          <div className="flex flex-col text-[1rem] font-medium w-full">
            <p>Full Name</p>
            <input
              type="text"
              name="name"
              required
              placeholder="@Akash Biswas"
              className="outline-0 border-gray-300 py-1 px-2 rounded-sm border bs"
            />
          </div>

          <div className="flex flex-col text-[1rem] font-medium w-full">
            <p>Email</p>
            <input
              type="email"
              name="email"
              placeholder="@akash123@gmail.com"
              className="outline-0 border-gray-300 py-1 px-2 rounded-sm border bs"
            />
          </div>
        </div>

        {/* Job Title */}
        <div className="flex flex-col text-[1rem] font-medium w-full">
          <p>Job Title</p>
          <input
            type="text"
            name="title"
            required
            placeholder="@Software Developer"
            className="outline-0 border-gray-300 py-1 px-2 rounded-sm border bs"
          />
        </div>

          {/* number and gmail */}
        <div className="flex w-full gap-3">
          <div className="flex flex-col text-[1rem] font-medium w-full">
            <p>Phone</p>
            <input
              type="number"
              name="number"
              required
              placeholder="@8101602709"
              className="outline-0 border-gray-300 py-1 px-2 rounded-sm border bs"
            />
          </div>

          <div className="flex flex-col text-[1rem] font-medium w-full">
            <p>Github</p>
            <input
              type="link"
              name="github"
              placeholder="@Dev-akash77"
              className="outline-0 border-gray-300 py-1 px-2 rounded-sm border bs"
            />
          </div>
        </div>

          {/* portfolio and linkedin */}
        <div className="flex w-full gap-3">
          <div className="flex flex-col text-[1rem] font-medium w-full">
            <p>Portfolio</p>
            <input
              type="link"
              name="portfolio"
              required
              placeholder="@link"
              className="outline-0 border-gray-300 py-1 px-2 rounded-sm border bs"
            />
          </div>

          <div className="flex flex-col text-[1rem] font-medium w-full">
            <p>Linkedin</p>
            <input
              type="link"
              name="linkedin"
              placeholder="@Akash-Biswas"
              className="outline-0 border-gray-300 py-1 px-2 rounded-sm border bs"
            />
          </div>
        </div>

        <div className="flex items-end justify-end"><button className="bg-blue w-[6rem] h-[2.5rem] text-white cc rounded-md cursor-pointer">Save</button></div>
      </form>
    </div>
  );
};

export default Header;
