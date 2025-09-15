import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import logo from "../../assets/Images/favicon.svg";
import { MdDashboard } from "react-icons/md";
import MainResume from "../../Components/MainResume";
import { useDispatch, useSelector } from "react-redux";
import { useLoginStatus } from "../../Hook/useLoginStatus";
import { isAuthenticate, LogoutAuth } from "../../Slice/AuthSlice";
import { IoHomeOutline } from "react-icons/io5";
import { GrLinkNext } from "react-icons/gr";
import { IoMdArrowBack } from "react-icons/io";

const Resume = () => {
  const navigate = useNavigate();

  const isLogin = useSelector((state) => {
    return state.auth.isAuthenticated;
  });
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
      navigate("/auth");
    }
  }, [isLogin, isError]);

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

      {/* main resume lay out */}
      <div className="cc py-10">
        <div className="w-[87%] flex justify gap-5">
          {/* left side from data */}
          <div className="w-[45%]">
            <div className="fcb mb-7">
              <button className="w-[3rem] h-[2.5rem] cc bg-blue text-white rounded-md">
                <IoHomeOutline className="text-xl" />
              </button>
              <div className="fc gap-5">
                <button className="cc bg-blue text-white rounded-md cursor-pointer w-[4rem] h-[2.5rem]">
                  <IoMdArrowBack className="text-xl" />
                </button>
                <button className="w-[7rem] h-[2.5rem] bg-blue text-white rounded-md text-md fc gap-2 cursor-pointer">
                  Next
                  <GrLinkNext />
                </button>
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
