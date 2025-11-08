import FromHeaders from "../../../Common/FromHeaders";
import { LuBrain } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import {
  setNextSection,
  setSummaryData,
  summaryChange,
} from "../../../Slice/ResumeSlice";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { usePerticularResume } from "../../../Hook/ResumeHooks";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatResumeSummary } from "../../../Api/resumeApi";
import toast from "react-hot-toast";
import Button_Loader from "../../../UI/Button_Loader";

const Profile = () => {
  const { id } = useParams();
  const resume = useSelector((state) => state.resume);
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  // ! ON CHANGE SUMMARY DATA FUNCTION
  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(summaryChange({ name, value }));
  };

  // ! GET SUMMARY DATA FOM DATABASE AND SET IN REDUX STATE
  const { data: summaryDataRead } = usePerticularResume(id);
  const { summary } = summaryDataRead?.data || {};

  useEffect(() => {
    if (summaryDataRead?.data) {
      dispatch(setSummaryData(summary));
    }
  }, [summaryDataRead, dispatch]);

  // ! CHECK NEXT SECTION
  useEffect(() => {
    if (summaryDataRead?.data.summary) {
      dispatch(setNextSection(false));
    } else {
      dispatch(setNextSection(true));
    }
  }, [summaryDataRead?.data.summary, dispatch]);

  // ! SET SUMMARY MUTATION
  const resumeSummaryMutation = useMutation({
    mutationFn: updatResumeSummary,
    onSuccess: (data) => {
      if (data?.success) {
        toast.success(data?.message);
        queryClient.removeQueries({ queryKey: ["perticularResume"] });
        dispatch(setNextSection(false));
      }
    },
    onError: () => {
      dispatch(setNextSection(true));
    },
  });


  // ! AFTER SAVING
  const handleClickSave = (e) => {
    e.preventDefault();
    resumeSummaryMutation.mutate({ id, summary: resume.summary });
  };

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
        <textarea
          name="summary"
          value={resume.summary || ""}
          onChange={handleChange}
          placeholder="Add Summary"
          className="p-2 border-2 rounded-md outline-0 focus-0"
          rows={3}
        ></textarea>

        <div className="flex items-end justify-end">
          <button
            className="bg-blue w-[8rem] h-[2.5rem] text-white cc rounded-md cursor-pointer"
            onClick={handleClickSave}
          >
             {resumeSummaryMutation.isPending ? <Button_Loader /> : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
