import React, { useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MainResume from "../../components/MainResume";
import { useDispatch } from "react-redux";
import {
  seHeaderData,
  setEducationData,
  setExperienceData,
  setProjectsData,
  setSkillsData,
  setSummaryData,
} from "../../Slice/ResumeSlice";
import { usePerticularResume } from "../../hook/ResumeHooks";
import useDownloadResume from "../../hook/useDownloadResume";
import { MdFileDownload } from "react-icons/md";

const Preview = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ref = useRef(null);

  const { data: resumeData } = usePerticularResume(id);

  const { downloadPDF } = useDownloadResume(ref);

  useEffect(() => {
    if (resumeData?.data) {
      const {
        name = "",
        email = "",
        number = "",
        portfolio = "",
        github = "",
        linkedin = "",
        summary = "",
      } = resumeData.data;

      dispatch(
        seHeaderData({ name, email, number, portfolio, github, linkedin })
      );

      dispatch(setSummaryData(summary));

      if (resumeData.data.education?.[0]) {
        dispatch(setEducationData(resumeData.data.education[0]));
      }

      if (resumeData.data.skills) {
        dispatch(setSkillsData(resumeData.data.skills));
      }

      if (resumeData.data.experience) {
        dispatch(setExperienceData(resumeData.data.experience));
      }

      if (resumeData.data.projects?.[0]) {
        dispatch(setProjectsData(resumeData.data.projects));
      }
    }
  }, [resumeData, dispatch]);

  return (
    <div className="w-screen min-h-screen flex flex-col items-center py-10 gap-5">
      
      {/* Top Actions */}
      <div className="w-[90%] flex justify-between items-center">
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-200 px-5 py-2 rounded-md"
        >
          Back
        </button>

        <button
          onClick={downloadPDF}
          className="bg-blue text-white px-6 py-2 rounded-md flex items-center gap-2"
        >
          Download <MdFileDownload />
        </button>
      </div>

      {/* Resume Preview */}
      <div className="w-[90%] flex justify-center">
        <MainResume ref={ref} />
      </div>
    </div>
  );
};

export default Preview;
