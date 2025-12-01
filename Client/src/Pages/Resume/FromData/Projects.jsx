import React, { useState } from "react";
import FromHeaders from "../../../Common/FromHeaders";
import {
  Editor,
  Toolbar,
  EditorProvider,
  BtnBulletList,
} from "react-simple-wysiwyg";
import { useDispatch, useSelector } from "react-redux";
import {
  addedProjects,
  removeProjects,
  updateProjectPoints,
  updateProject,
} from "../../../Slice/ResumeSlice";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { updateResumeProjects } from "../../../Api/resumeApi";
import Button_Loader from "../../../UI/Button_Loader";

const Projects = () => {
  const [htmlHFrom, setHtmlFrom] = useState("<ul><li></li></ul>");
  const projects = useSelector((state) => state.resume)?.projects;
  const dispatch = useDispatch();

  const [projectsPoint, setProjectsPoint] = useState([]);

  // ! EXTRACTS POINT FROM LI LIST
  const extractPoints = (html) =>
    (html.match(/<li>(.*?)<\/li>/g) || [])
      .map((li) => li.replace(/<\/?li>/g, "").trim())
      .filter((text) => text !== "");

  // // ! HANDLE CHANGE FROM DATA
  // const handlefromChange = (e) => {
  //   setHtmlFrom(e.target.value);
  //   if (e.target.value === "" || e.target.value === "<div><br></div>") {
  //     setHtmlFrom("<ul><li>&nbsp;</li></ul>");
  //   } else {
  //     setHtmlFrom(e.target.value);
  //   }

  //   const points = extractPoints(e.target.value);

  //   setProjectsPoint(points);
  // };

  // ! ADDING NEW PROJECT

  const handleAddProject = () => {
    if (projects.length >= 3) {
      return toast.error("Maximam 3 projects");
    }
    dispatch(addedProjects());
  };


  // ! resume id
    const { id } = useParams();

    // ! SET SUMMARY MUTATION
    const resumeProjectsMutation = useMutation({
      mutationFn: updateResumeProjects,
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















  return (
    <div className="border-t-5 border-t-blue overflow-hidden rounded-lg p-3 pb-10 bss bg-white">
      {/* Header of the from */}
      <FromHeaders
        title={"Add Your Projects"}
        des={"Highlight Your Top Projects That Reflect Your Skills"}
      />

      {/* from  */}
      <form className="w-full mt-3 flex flex-col gap-5">
        {/*  ALL FROM DATA RELATED Project */}
        {/* phase 1 */}
        {projects?.map((cur, id) => {
          return (
            <div key={id}>
              <p>#{id + 1}</p>
              <div className="border-2 border-gray-300 p-3 rounded-md flex flex-col gap-2">
                {/* PROJECT NAME AND PROJECT ABOUT */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex flex-col text-[1rem] font-medium w-full">
                    <p>Project Name</p>
                    <input
                      type="text"
                      name="name"
                      placeholder="ResumePilot"
                      value={cur.name}
                      onChange={(e) =>
                        dispatch(
                          updateProject({
                            index: id,
                            key: "name",
                            value: e.target.value,
                          })
                        )
                      }
                      required
                      className="outline-0 border-gray-300 py-1 px-2 rounded-sm border placeholder:text-gray-300 placeholder:font-normal"
                    />
                  </div>
                  <div className="flex flex-col text-[1rem] font-medium w-full">
                    <p>Project About</p>
                    <input
                      type="text"
                      name="about"
                      value={cur.about}
                      onChange={(e) =>
                        dispatch(
                          updateProject({
                            index: id,
                            key: "about",
                            value: e.target.value,
                          })
                        )
                      }
                      placeholder="AI-Driven Resume Builder"
                      required
                      className="outline-0 border-gray-300 py-1 px-2 rounded-sm border placeholder:text-gray-300 placeholder:font-normal"
                    />
                  </div>
                </div>
                {/* TECHSTACK */}
                <div className="flex flex-col text-[1rem] font-medium w-full">
                  <p>Tech Stack</p>
                  <input
                    type="text"
                    name="techStack"
                    value={cur.techStack}
                    onChange={(e) =>
                      dispatch(
                        updateProject({
                          index: id,
                          key: "techStack",
                          value: e.target.value,
                        })
                      )
                    }
                    placeholder=" MERN, Redux, LangChain, Google Gemini LLM, Docker, Redis"
                    required
                    className="outline-0 border-gray-300 py-1 px-2 rounded-sm border placeholder:text-gray-300 placeholder:font-normal"
                  />
                </div>
                {/*START DATE AND END DATE */}
                <div className="flex w-full gap-3">
                  <div className="flex flex-col text-[1rem] font-medium w-full">
                    <p>Start Date</p>
                    <input
                      type="date"
                      name="start"
                      value={cur.start}
                      onChange={(e) =>
                        dispatch(
                          updateProject({
                            index: id,
                            key: "start",
                            value: e.target.value, // yyyy-mm-dd
                          })
                        )
                      }
                      required
                      className="outline-0 border-gray-300 py-1 px-2 rounded-sm border text-gray-500 cursor-pointer"
                    />
                  </div>

                  <div className="flex flex-col text-[1rem] font-medium w-full">
                    <p>End Date</p>
                    <input
                      type="date"
                      name="end"
                      value={cur.end}
                      onChange={(e) =>
                        dispatch(
                          updateProject({
                            index: id,
                            key: "end",
                            value: e.target.value, // yyyy-mm-dd
                          })
                        )
                      }
                      required
                      className="outline-0 border-gray-300 py-1 px-2 rounded-sm border text-gray-500 cursor-pointer"
                    />
                  </div>
                </div>

                {/* PROJECT LINK AND GITHUB LINK */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex flex-col text-[1rem] font-medium w-full">
                    <p>Live Link</p>
                    <input
                      type="url"
                      name="live"
                      placeholder="https://resume-pilot...."
                      value={cur.live} // bind Redux state
                      onChange={(e) =>
                        dispatch(
                          updateProject({
                            index: id,
                            key: "live",
                            value: e.target.value,
                          })
                        )
                      }
                      required
                      className="outline-0 border-gray-300 py-1 px-2 rounded-sm border placeholder:text-gray-300 placeholder:font-normal"
                    />
                  </div>
                  <div className="flex flex-col text-[1rem] font-medium w-full">
                    <p>Github Link</p>
                    <input
                      type="url"
                      name="github"
                      placeholder="https://github.com/Dev-akash77."
                      value={cur.github} // bind Redux state
                      onChange={(e) =>
                        dispatch(
                          updateProject({
                            index: id,
                            key: "github",
                            value: e.target.value,
                          })
                        )
                      }
                      required
                      className="outline-0 border-gray-300 py-1 px-2 rounded-sm border placeholder:text-gray-300 placeholder:font-normal"
                    />
                  </div>
                </div>

                {/* BULLET EDITOR */}
                <div>
                  <p className="text-[1rem] font-medium">
                    Add Points For Projects{" "}
                    <span className="text-gray-300 ml-5">MAX - 3</span>
                  </p>
                  <div className="[&_.rsw-editor_ul]:list-disc [&_.rsw-editor_ol]:list-decimal [&_.rsw-editor_ul]:ml-6 [&_.rsw-editor_ol]:ml-6 rounded-md border border-gray-200">
                    <EditorProvider>
                      <Toolbar className="hidden">
                        <BtnBulletList />
                      </Toolbar>

                      <Editor
                        value={
                          cur.points?.length
                            ? `<ul>${cur.points
                                .map((p) => `<li>${p}</li>`)
                                .join("")}</ul>`
                            : "<ul><li></li></ul>"
                        }
                        onChange={(e) => {
                          const html = e.target.value;
                          const points = (html.match(/<li>(.*?)<\/li>/g) || [])
                            .map((li) => li.replace(/<\/?li>/g, "").trim())
                            .filter((text) => text !== "");

                          dispatch(updateProjectPoints({ index: id, points }));
                        }}
                      />
                    </EditorProvider>
                  </div>
                </div>
              </div>

              {cur.count != 1 && (
                <div className="flex items-center justify-end mt-5">
                  <button
                    className=" w-[9rem] h-[2.5rem] text-red-500 cc rounded-full border border-red-text-red-500 border-dashed cursor-pointer"
                    onClick={() => {
                      dispatch(removeProjects(id));
                    }}
                  >
                    Remove Project
                  </button>
                </div>
              )}
            </div>
          );
        })}

        <div className="flex items-center justify-end">
          <button
            className=" w-[9rem] h-[2.5rem] text-blue cc rounded-full border border-blue border-dashed cursor-pointer"
            onClick={() => {
              handleAddProject();
            }}
          >
            Add Project
          </button>
        </div>

        <div className="flex items-end justify-end">
          <button className="bg-blue w-[8rem] h-[2.5rem] text-white cc rounded-md cursor-pointer" onClick={(e)=>{
            e.preventDefault();
            resumeProjectsMutation.mutate({id,projects});
            
          }}>
             {resumeProjectsMutation.isPending ? <Button_Loader /> : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Projects;
