import React from "react";
import { CiSquarePlus } from "react-icons/ci";
import ResumeCard from "../../Common/ResumeCard";

const Dashboard = () => {
  const data = [
    { color: "#2563eb", role: "Software Developer" },  
    { color: "#ef4444", role: "Data Scientist" },      
    { color: "#ff0082", role: "DevOps Engineer" },     
    { color: "#8b5cf6", role: "AI/ML Engineer" },     
    { color: "#00a32d", role: "Cloud Computing" },     
  ];
  
  return (
    <div className="w-full h-full z-40 cc pb-18">
      <div className="py-4 h-full w-[95%] overflow-y-auto">
        <h2 className="text-3xl font-semibold">My resume</h2>
        <h3 className="text-lg capitalize text-gray-500">
          Start creating AI resume for your next job role
        </h3>
        <div className="grid grid-cols-6 gap-7 mt-8">
          <div className="h-[15rem] bg-gray-200 cc hover:scale-[1.02] duration-150 rounded-md cursor-pointer">
            <CiSquarePlus className="text-3xl" />
          </div>

          {data.map((cur, id) => {
            return <ResumeCard color={cur.color} role={cur.role} key={id} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
