import React from "react";
import FromHeaders from "../../../Common/FromHeaders";
import { LuBrain } from "react-icons/lu";

const Profile = () => {
  return (
    <div className="border-t-5 border-t-blue overflow-hidden rounded-lg p-3 pb-10 bss bg-white">
      {/* Header of the from */}
      <FromHeaders title={"Profile"} des={"Add Summary For your job title"} />

      {/* from  */}
      <form className="w-full mt-3 flex flex-col gap-5">
        {/* !generate summary via AI */}
        <div className="flex justify-between items-center">
            <p className="text-lg font-medium">Add Summary</p>
          <button className="w-[10rem] text-blue text-[.9rem] rounded-md cursor-pointer h-[2.5rem] border-2 border-blue fc gap-2">
           <LuBrain /> Generate from AI
          </button>
        </div>

            
        {/* PROFILE FROMDATA */}
        <textarea name="summary" placeholder="Add Summary" className="p-2 border-2 rounded-md outline-0 focus-0" rows={3}></textarea>


        <div className="flex items-end justify-end">
          <button className="bg-blue w-[6rem] h-[2.5rem] text-white cc rounded-md cursor-pointer">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
