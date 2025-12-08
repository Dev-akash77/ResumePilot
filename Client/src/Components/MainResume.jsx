import React from "react";
import { useSelector } from "react-redux";

const MainResume = ({ref}) => {
  const resume = useSelector((state) => state.resume);

  const formatExperienceDuration = (start, end) => {
    if (!start && !end) return "";

    const format = (date) =>
      new Date(date).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      });

    if (start && end) return `${format(start)} – ${format(end)}`;
    if (start && !end) return `${format(start)} – Present`;
    if (!start && end) return `${format(end)}`;

    return "";
  };

  const fullName = resume.header.name?.trim() || "";
  const [firstName, lastName] = fullName.split(" ");

  // ! HEADER SECTION OF RESUMEPILOT
  const { email, number, portfolio, linkedin, github } = resume?.header;

  // ! SUMMARY | PROFILE SECTION OF RESUMEPILOT
  const { summary } = resume;

  // ! SUMMARY | PROFILE SECTION OF RESUMEPILOT
  const { college, start, end, cgpa, location, degree } = resume?.education;

  // ! Check if any education field has a non-empty value
  const hasEducation = college || start || end || cgpa || location || degree;

  // ! SKILLS SECTION OF RESUMPILOT // TECHNICAL & TOLLS \\
  const { skills } = resume;

  // ! EXPERIENCE SECTION OF RESUMEPILOT
  const {
    title,
    role,
    start: startExperience,
    end: endExperience,
    location: locationExperience,
    points,
  } = resume?.experince;

  // ! Check if any education field has a non-empty value
  const hasExperience =
    title ||
    role ||
    startExperience ||
    endExperience ||
    locationExperience ||
    points.length > 0;

  // ! Check if any projects field has a non-empty value

  const isProjectEmpty = (proj) => {
    const { name, start, end, points, techStack, live, github } = proj;

    return (
      !name &&
      !start &&
      !end &&
      (!points || points.length === 1) &&
      (!techStack || techStack.length === 0) &&
      !live &&
      !github
    );
  };

  const validProjects = resume?.projects?.some((proj) => !isProjectEmpty(proj));

  return (
    <div className="bs w-[8.27in] h-[11.69in] pt-[20px] cc relative print-area" ref={ref}>
      <div className="w-[93%] h-full">
        {/* resume header section */}
        <header>
          <h1 className="text-[1.6rem] font-bold fc gap-2">
            {firstName}{" "}
            <span className="text-gray-500 font-normal">{lastName}</span>
          </h1>
          {/* link */}
          <div className="fc gap-2 text-[.88rem]">
            {number && <p>+91-{number} |</p>}
            {email && <a href={`mailto:${email}`}>{email} |</a>}
            {github && (
              <a href={`https://github.com/${github}`} target="_blank">
                Github |
              </a>
            )}
            {portfolio && (
              <a href={portfolio} target="_blank">
                {" "}
                Portfolio |
              </a>
            )}
            {linkedin && (
              <a className="lowercase" href={linkedin} target="_blank">
                linkedin.com/in/{firstName + lastName}
              </a>
            )}
          </div>
        </header>

        {/* PROFILE */}
        {summary && (
          <div className="mt-2">
            <h2 className="text-[1.2rem] text-[#7f7f7f] font-semibold uppercase">
              PROFILE
            </h2>
            <p className="text-[.85rem]">
              {/* Self-taught Full Stack Developer crafting SaaS platforms with
              real-time systems, AI-driven workflows, and microservices
              architecture, leveraging Docker and advanced AI integration.
              Proven ability to deliver production-ready products that scale. */}
              {summary}
            </p>
          </div>
        )}

        {/* EDUCATION */}
        {hasEducation && (
          <div className="mt-3 flex flex-col text-[.85rem] ">
            <h2 className="text-[1.2rem] text-[#7f7f7f] font-semibold uppercase">
              EDUCATION
            </h2>
            {/* college name */}
            <div className="fcb">
              {/* <p>Kalna Polytechnic, WBSCTE </p> */}
              <p>{college} </p>
              <p className="italic">{location}</p>
            </div>
            {/* trade and course */}
            <div className="fcb">
              <p>
                <span className="font-semibold">{degree.split(" ")[0]}</span>{" "}
                {degree.split(" ").slice(1).join(" ")}
              </p>
              <p className="italic">
                {new Date(start).getFullYear()} – {new Date(end).getFullYear()}
              </p>
            </div>

            <p>
              <span className="font-semibold mr-1">CGPA</span>
              {cgpa}
            </p>
          </div>
        )}

        {/* SKILLS */}
        {(skills.technical.length !== 0 || skills.tools.length !== 0) && (
          <div className="mt-3 flex flex-col text-[.85rem]">
            <h2 className="text-[1.2rem] text-[#7f7f7f] font-semibold uppercase">
              SKILLS
            </h2>

            {/* Technical Skills */}
            {skills.technical.length > 0 && (
              <p className="capitalize">
                <span className="font-semibold">Technical: </span>
                {skills.technical.join(", ")}
              </p>
            )}

            {/* Tools */}
            {skills.tools.length > 0 && (
              <p className="capitalize">
                <span className="font-semibold">Tools: </span>
                {skills.tools.join(", ")}
              </p>
            )}
          </div>
        )}

        {/* EXPERIENCE */}
        {hasExperience && (
          <div className="mt-3 flex flex-col text-[.85rem] ">
            <h2 className="text-[1.2rem] text-[#7f7f7f] font-semibold uppercase">
              EXPERIENCE
            </h2>
            {/* Experience Name */}
            <div className="fcb">
              <p>{title}</p>
              <p className="italic">{locationExperience}</p>
            </div>
            {/* Experience IN Tech */}
            <div className="fcb">
              <p className="font-semibold">{role}</p>

              {(startExperience || endExperience) && (
                <p>
                  {formatExperienceDuration(startExperience, endExperience)}
                </p>
              )}
            </div>
            <ul className="list-disc ml-6">
              {points.map((cur, id) => {
                return <li key={id}>{cur}</li>;
              })}
            </ul>
          </div>
        )}

        {/* PROJECTS */}
        {validProjects && (
          <div className="mt-3 flex flex-col text-[.85rem] ">
            <h2 className="text-[1.2rem] text-[#7f7f7f] font-semibold uppercase">
              PROJECTS
            </h2>

            <div className="flex flex-col gap-3">
              {resume.projects.map((proj, id) => (
                <div key={id}>
                  {/* Project Name & Duration */}
                  <div className="fcb">
                    <div className="flex gap-2 items-center">
                      <p className="font-semibold">{proj.name}</p>
                      <p className="text-2xl font-light">-</p>
                      <p className="font-semibold">{proj.about}</p>
                    </div>
                    {(proj.start || proj.end) && (
                      <p>{formatExperienceDuration(proj.start, proj.end)}</p>
                    )}
                  </div>

                  {/* Points & Tech Stack */}
                  <ul className="list-disc ml-6">
                    {proj.points?.map((point, idx) => (
                      <li key={idx}>{point}</li>
                    ))}

                    {proj.techStack?.length > 0 && (
                      <li>
                        <span className="font-bold">Tech Stack:</span>{" "}
                        {proj.techStack}
                      </li>
                    )}

                    {(proj.live || proj.github) && (
                      <li>
                        <div className="flex">
                          <span className="font-bold">Live & Github:</span>
                          <p className="flex items-center gap-1 text-blue-700 ml-1">
                            {proj.live && (
                              <u>
                                <a href={proj.live} target="_blank">
                                  Live Demo
                                </a>
                              </u>
                            )}
                            {proj.live && proj.github && <span>|</span>}
                            {proj.github && (
                              <u>
                                <a href={proj.github} target="_blank">
                                  Github
                                </a>
                              </u>
                            )}
                          </p>
                        </div>
                      </li>
                    )}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainResume;
