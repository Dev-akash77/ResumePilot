import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import FromHeaders from "../../../Common/FromHeaders";
import { useDispatch, useSelector } from "react-redux";
import {
  headerOnChange,
  seHeaderData,
  setNextSection,
} from "../../../Slice/ResumeSlice";
import { usePerticularResume } from "../../../Hook/ResumeHooks";
import { updateResumeHeader } from "../../../Api/resumeApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Button_Loader from "./../../../UI/Button_Loader";

const Header = () => {
  const { id, section } = useParams();
  const resume = useSelector((state) => state.resume);
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  // ! GET HEADER DATA FOM DATABASE AND SET IN REDUX STATE
  const { data: headerDataRead, isLoading, isError } = usePerticularResume(id);

  //! Safely extract fields with defaults
  const {
    name = "",
    email = "",
    number = "",
    portfolio = "",
    github = "",
    linkedin = "",
  } = headerDataRead?.data || {};

  useEffect(() => {
    if (headerDataRead?.data) {
      dispatch(
        seHeaderData({ name, email, number, portfolio, github, linkedin })
      );
    }
  }, [headerDataRead, dispatch]);

  // ! Onchange Multipart Form Data
  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(headerOnChange({ name, value }));
  };

  const resumeHeaderMutation = useMutation({
    mutationFn: updateResumeHeader,
    onSuccess: (data) => {
      if (data?.success) {
        toast.success(data?.message);
        queryClient.removeQueries({ queryKey: ["perticularResume"] });
        dispatch(setNextSection(false));
      }
    },
  });

  // ! HANDLE SAVE HEADER DATA
  const handleSaveHeader = (e) => {
    e.preventDefault();

    dispatch(setNextSection(true));

    resumeHeaderMutation.mutate({...resume.header,id}, {
      onSettled: () => {
        dispatch(setNextSection(false));
      },
    });
  };


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
              onChange={handleChange}
              value={resume.header?.name}
              required
              placeholder="@Akash Biswas"
              className="outline-0 border-gray-500 py-1 px-2 rounded-sm border placeholder:text-gray-300"
            />
          </div>

          <div className="flex flex-col text-[1rem] font-medium w-full">
            <p>Email</p>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              value={resume.header?.email}
              placeholder="@akash123@gmail.com"
              className="outline-0 border-gray-500 py-1 px-2 rounded-sm border placeholder:text-gray-300"
            />
          </div>
        </div>

        {/* number and gmail */}
        <div className="flex w-full gap-3">
          <div className="flex flex-col text-[1rem] font-medium w-full">
            <p>Phone</p>
            <input
              type="number"
              name="number"
              onChange={handleChange}
              value={resume.header?.number}
              required
              placeholder="@8101602709"
              className="outline-0 border-gray-500 py-1 px-2 rounded-sm border placeholder:text-gray-300 placeholder:font-normal"
            />
          </div>

          <div className="flex flex-col text-[1rem] font-medium w-full">
            <p>Github</p>
            <input
              type="link"
              name="github"
              onChange={handleChange}
              value={resume.header?.github}
              placeholder="@Dev-akash77"
              className="outline-0 border-gray-500 py-1 px-2 rounded-sm border placeholder:text-gray-300 placeholder:font-normal"
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
              onChange={handleChange}
              value={resume.header?.portfolio}
              required
              placeholder="@Link"
              className="outline-0 border-gray-500 py-1 px-2 rounded-sm border placeholder:text-gray-300 placeholder:font-normal"
            />
          </div>

          <div className="flex flex-col text-[1rem] font-medium w-full">
            <p>Linkedin</p>
            <input
              type="link"
              name="linkedin"
              onChange={handleChange}
              value={resume.header?.linkedin}
              placeholder="@Link"
              className="outline-0 border-gray-500 py-1 px-2 rounded-sm border placeholder:text-gray-300 placeholder:font-normal"
            />
          </div>
        </div>

        <div className="flex items-end justify-end" onClick={handleSaveHeader}>
          <button className="bg-blue w-[8rem] h-[2.5rem] text-white cc rounded-md cursor-pointer">
            {resumeHeaderMutation.isPending ? <Button_Loader /> : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Header;
