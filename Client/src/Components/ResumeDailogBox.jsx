import React from "react";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { toogleDialogBox } from "../Slice/ResumeSlice";
import Button_Loader from "../UI/Button_Loader";
import { mutationOptions, useMutation, useQueryClient } from "@tanstack/react-query";
import { creatResume } from "../Api/resumeApi";
import toast from "react-hot-toast";

const ResumeDailogBox = () => {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const color = ["#2563eb", "#ef4444", "#ff0082", "#8b5cf6", "#00a32d"];
   const queryClient = useQueryClient();

  //   ! MUTION FN
  const createResumeMutation = useMutation({
    mutationFn: creatResume,
    onSuccess: (data) => {
      if (data?.success) {
        toast.success(data?.message);
        dispatch(toogleDialogBox());
         queryClient.invalidateQueries({ queryKey: ["allResume"] });
      }
    },
  });

  // ! HANDLE CREATE RESUME
  const handleCreatResume = () => {
    const randomIndex = Math.floor(Math.random() * color.length);
    const randomColor = color[randomIndex];

    createResumeMutation.mutate({ title: input, color: randomColor });

  };

  return (
    <div className="fixed w-screen h-screen cc bg-[rgba(0,0,0,.5)] top-0 r-0">
      <div className="w-[30%] h-[10rem] bg-white rounded-md p-5 ">
        <div className="flex items-center justify-end">
          <RxCross2
            className="text-2xl cursor-pointer"
            onClick={() => {
              dispatch(toogleDialogBox());
            }}
          />
        </div>
        <h2 className="text-xl font-medium">Create Job Title</h2>
        <div className="flex items-center justify-between gap-2 mt-5">
          <input
            type="text"
            name="title"
            onChange={(e) => {
              setInput(e.target.value);
            }}
            value={input}
            placeholder="Software Developer"
            className="border-2 border-gray-400 outline-0 rounded-md px-2 py-2 placeholder:text-gray-300 w-[70%]"
          />
          <button
            type="button"
            className="w-[30%] h-[2.5rem] rounded-md text-white bg-blue cursor-pointer"
            onClick={handleCreatResume}
          >
            {createResumeMutation.isPending ? (
              <Button_Loader />
            ) : (
              " Creat Resume"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResumeDailogBox;
