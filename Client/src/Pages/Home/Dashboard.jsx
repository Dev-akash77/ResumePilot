import React, { useEffect } from "react";
import ResumeCard from "../../Common/ResumeCard";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLoginStatus } from "./../../Hook/useLoginStatus";
import { isAuthenticate, LogoutAuth } from "../../Slice/AuthSlice";
import { toogleDialogBox } from "../../Slice/ResumeSlice";
import { useAllResume } from "../../Hook/ResumeHooks";

// Icons
import { LuPlus, LuFileX } from "react-icons/lu";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Auth State
  const isLogin = useSelector((state) => state.auth.isAuthenticated);
  const { data: loginData, isLoading: isAuthLoading, isError } = useLoginStatus();

  // Resume Data
  const { data: allResume, isLoading: isResumeLoading } = useAllResume();

  // ! Authentication Logic
  useEffect(() => {
    if (isAuthLoading) return;

    if (loginData?.success) {
      dispatch(isAuthenticate());
    } else {
      dispatch(LogoutAuth());
    }
    if (isError) {
      dispatch(LogoutAuth());
    }
  }, [loginData, isAuthLoading, isError, dispatch]);

  useEffect(() => {
    if (isAuthLoading) return;
    if (!isLogin) {
      navigate("/auth");
    }
  }, [isLogin, isAuthLoading, navigate]);

  return (
    <div className="w-full min-h-screen bg-gray-50/30 pb-20 pt-8 px-4 sm:px-8 ">
      <div className="max-w-7xl mx-auto h-full">
        
        {/* 1. Header Section */}
        <div className="flex flex-col gap-1 mb-10">
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
            My Resumes
          </h2>
          <p className="text-gray-500 text-lg">
            Manage your resumes or create a new one for your next job role.
          </p>
        </div>

        {/* 2. Grid Container */}
        {isResumeLoading || isAuthLoading ? (
          <DashboardSkeleton />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
            
            {/* "Create New" Card */}
            <div
              onClick={() => dispatch(toogleDialogBox())}
              className="group h-[16rem] rounded-2xl border-2 border-dashed border-gray-300 hover:border-blue-500 bg-white hover:bg-blue-50/50 flex flex-col items-center justify-center gap-4 cursor-pointer transition-all duration-300"
            >
              <div className="p-4 rounded-full bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 shadow-sm">
                <LuPlus size={32} />
              </div>
              <div className="text-center">
                <h3 className="font-bold text-gray-700 group-hover:text-blue-700 transition-colors">
                  Create New Resume
                </h3>
                <p className="text-xs text-gray-400 mt-1 group-hover:text-blue-400">
                  Start from scratch with AI
                </p>
              </div>
            </div>

            {/* Resume Cards Loop */}
            {allResume?.data && allResume.data.length > 0 ? (
              allResume.data.map((cur, id) => (
                <ResumeCard data={cur} key={id} />
              ))
            ) : null}

          </div>
        )}

        {/* Empty State (If no resumes and finished loading) */}
        {!isResumeLoading && allResume?.data?.length === 0 && (
          <div className="w-full flex flex-col items-center justify-center py-20 text-center">
            <div className="p-6 bg-gray-100 rounded-full mb-4">
               <LuFileX className="text-4xl text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-700">No resumes found</h3>
            <p className="text-gray-400 max-w-sm mt-2">
              You haven't created any resumes yet. Click the card above to create your first AI-powered resume!
            </p>
          </div>
        )}

      </div>
    </div>
  );
};

// --- Loading Skeleton Component ---
const DashboardSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
    {[1, 2, 3, 4].map((i) => (
      <div key={i} className="h-[16rem] rounded-2xl bg-white border border-gray-200 p-4 animate-pulse flex flex-col gap-4">
        <div className="w-full flex-grow bg-gray-100 rounded-lg"></div>
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gray-100"></div>
            <div className="flex flex-col gap-2 w-full">
                <div className="h-4 w-3/4 bg-gray-100 rounded"></div>
                <div className="h-2 w-1/2 bg-gray-100 rounded"></div>
            </div>
        </div>
      </div>
    ))}
  </div>
);

export default Dashboard;