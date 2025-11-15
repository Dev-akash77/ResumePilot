import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import logo from "../../assets/Images/favicon.svg";
import { MdDashboard } from "react-icons/md";
import MainResume from "../../Components/MainResume";
import { useDispatch, useSelector } from "react-redux";
import { useLoginStatus } from "../../Hook/useLoginStatus";
import { isAuthenticate, LogoutAuth } from "../../Slice/AuthSlice";
import { IoHomeOutline } from "react-icons/io5";
import { GrLinkNext } from "react-icons/gr";
import { IoMdArrowBack } from "react-icons/io";
import { usePerticularResume } from "../../Hook/ResumeHooks";
import {
  seHeaderData,
  setEducationData,
  setSkillsData,
  setSummaryData,
} from "../../Slice/ResumeSlice";

const Resume = () => {
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();
  const [current, setCurrent] = useState(0);

  const section = [
    "",
    "profile",
    "education",
    "skill",
    "experience",
    "projects",
  ];

  const isLogin = useSelector((state) => state.auth.isAuthenticated);
  const resume = useSelector((state) => state.resume);
  const dispatch = useDispatch();

  // ! check is login or not
  const { data: loginData, isLoading, isError } = useLoginStatus();
  useEffect(() => {
    if (isLoading) return;

    if (loginData?.success) {
      dispatch(isAuthenticate());
    } else {
      dispatch(LogoutAuth());
    }
    if (isError) {
      dispatch(LogoutAuth());
    }
  }, [loginData]);

  //! Redirect if not logged in
  useEffect(() => {
    if (isLoading) return;

    if (!isLogin) {
      //! fix: pehle ulta tha
      navigate("/auth");
    }
  }, [isLogin, isError]);

  //! Sync current with URL
  useEffect(() => {
    const parts = location.pathname.split("/");
    const last = parts[parts.length - 1];
    const index = section.indexOf(last);
    setCurrent(index === -1 ? 0 : index);
  }, [location.pathname]);

  // ! ADDING DATA INTO RESUME FROM DATABAES
  const { id } = useParams();

  // ! GET HEADER DATA FOM DATABASE AND SET IN REDUX STATE
  const { data: resumeData } = usePerticularResume(id);

  //! Safely extract fields with defaults
  const {
    name = "",
    email = "",
    number = "",
    portfolio = "",
    github = "",
    linkedin = "",
    summary = "",
  } = resumeData?.data || {};

  useEffect(() => {
    if (resumeData?.data) {
      // ! Header DATA SET
      dispatch(
        seHeaderData({ name, email, number, portfolio, github, linkedin })
      );
      // ! SUMMARY DATA SET
      dispatch(setSummaryData(summary));

      if (resumeData?.data?.education[0]) {
        dispatch(setEducationData(resumeData?.data?.education[0]));
      }
      if (resumeData?.data?.skills) {
        dispatch(setSkillsData(resumeData.data.skills));
      }
    }
  }, [resumeData, dispatch]);

  return (
    <div className="w-screen">
      <header className="cc h-[5rem] w-full">
        <div className="w-[87%] fcb">
          <div
            className="w-max fc gap-1 cursor-pointer"
            onClick={() => {
              navigate("/");
            }}
          >
            <img src={logo} alt="logo" />
            <h2 className="md:text-[1.7rem] text-[1.4rem] text-blue font-semibold">
              ResumePilot
            </h2>
          </div>

          <button
            className="bg-blue text-white rounded-md md:px-10 px-3 py-3 cursor-pointer fc gap-2"
            onClick={() => {
              navigate("/dashboard");
            }}
          >
            Dashboard <MdDashboard className="text-xl text-gray-100" />
          </button>
        </div>
      </header>

      {/* main resume layout */}
      <div className="cc py-10">
        <div className="w-[87%] flex justify gap-5">
          {/* left side from data */}
          <div className="w-[45%]">
            <div className="fcb mb-7">
              <button
                className="w-[3rem] h-[2.5rem] cc bg-blue text-white rounded-md"
                onClick={() => navigate("/")}
              >
                <IoHomeOutline className="text-xl" />
              </button>

              <div className="fc gap-5">
                {current > 0 && (
                  <button
                    onClick={() => {
                      const newIndex = Math.max(current - 1, 0);
                      navigate(`/resume/${params?.id}/${section[newIndex]}`);
                      setCurrent(newIndex);
                    }}
                    className="cc bg-blue text-white rounded-md cursor-pointer w-[4rem] h-[2.5rem]"
                  >
                    <IoMdArrowBack className="text-xl" />
                  </button>
                )}
                {current < section.length - 1 && (
                  <button
                    onClick={() => {
                      const newIndex = Math.min(
                        current + 1,
                        section.length - 1
                      );
                      navigate(`/resume/${params?.id}/${section[newIndex]}`);
                      setCurrent(newIndex);
                    }}
                    className={`w-[7rem] h-[2.5rem] ${
                      resume.nextSection ? "bg-blue-100" : "bg-blue"
                    } text-white rounded-md text-md fc gap-2 cursor-pointer`}
                    disabled={resume.nextSection}
                  >
                    Next <GrLinkNext />
                  </button>
                )}
              </div>
            </div>
            <Outlet />
          </div>

          {/* main resume */}
          <MainResume />
        </div>
      </div>
    </div>
  );
};

export default Resume;
