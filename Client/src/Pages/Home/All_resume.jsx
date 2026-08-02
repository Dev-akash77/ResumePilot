import React, { useEffect } from "react";
import ResumeCard from "../../common/ResumeCard";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLoginStatus } from "../../hook/useLoginStatus";
import { getUserAllResume } from "../../hook/useProfile";
import { isAuthenticate, LogoutAuth } from "../../Slice/AuthSlice";

// Icons
import { LuFileX } from "react-icons/lu";

const All_resume = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Auth check
  const {
    data: loginData,
    isLoading: isAuthLoading,
    isError,
  } = useLoginStatus();

  // All resume data
  const {
    data: allResume,
    isLoading: isResumeLoading,
  } = getUserAllResume();

  // Safe data
  const resumes = allResume?.data || [];

  // Auth + redirect
  useEffect(() => {
    if (isAuthLoading) return;

    if (loginData?.success) {
      dispatch(isAuthenticate());
    } else {
      dispatch(LogoutAuth());
      navigate("/auth");
    }

    if (isError) {
      dispatch(LogoutAuth());
      navigate("/auth");
    }
  }, [loginData, isAuthLoading, isError, dispatch, navigate]);

  return (
    <div className="w-full min-h-screen bg-gray-50/30 px-4 sm:px-8 py-10">
      <div className="max-w-7xl mx-auto ">

        {/* Header */}
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-gray-900">
            All Resumes
          </h2>
          <p className="text-gray-500 mt-1">
            Here are all your created resumes
          </p>
        </div>

        {/* Loading */}
        {isResumeLoading || isAuthLoading ? (
          <Skeleton />
        ) : resumes.length > 0 ? (

          //  ALL RESUME GRID
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
            {resumes.map((cur) => (
              <ResumeCard key={cur._id} data={cur} />
            ))}
          </div>

        ) : (

          // ❌ EMPTY STATE
          <div className="w-full flex flex-col items-center justify-center py-20 text-center">
            <div className="p-6 bg-gray-100 rounded-full mb-4">
              <LuFileX className="text-4xl text-gray-400" />
            </div>

            <h3 className="text-xl font-bold text-gray-700">
              No resumes found
            </h3>

            <p className="text-gray-400 mt-2">
              You haven’t created any resumes yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

// 🔥 Skeleton Loader
const Skeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {[1, 2, 3, 4, 5, 6].map((i) => (
      <div
        key={i}
        className="h-[16rem] rounded-2xl bg-white border border-gray-200 p-4 animate-pulse"
      >
        <div className="w-full h-full bg-gray-100 rounded-lg"></div>
      </div>
    ))}
  </div>
);

export default All_resume;