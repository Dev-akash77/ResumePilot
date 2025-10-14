import React from "react";
import { useSelector } from "react-redux";

const MainResume = () => {
  const resume = useSelector((state) => state.resume);

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

  return (
    <div className="bs w-[8.7in] h-[11in] pt-10 pb-5 cc relative">
      <div className="w-[92%] h-full">
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
        <div className="mt-3 flex flex-col text-[.85rem] ">
          <h2 className="text-[1.2rem] text-[#7f7f7f] font-semibold uppercase">
            SKILLS
          </h2>
          {/* technical skills */}
          <p>
            <span className="font-semibold">Technical:</span> React.js,
            JavaScript, HTML, Tailwind, Node.js, Express.js, WebSocket,
            LangChain, MongoDB, AI Integration
          </p>
          {/* Tools */}
          <p>
            <span className="font-semibold">Tools:</span>Git, GitHub, Docker,
            Render, Vercel, Cloudinary, Postman, Redis, RabbitMQ
          </p>
        </div>

        {/* EXPERIENCE */}
        <div className="mt-3 flex flex-col text-[.85rem] ">
          <h2 className="text-[1.2rem] text-[#7f7f7f] font-semibold uppercase">
            EXPERIENCE
          </h2>
          {/* Experience Name */}
          <div className="fcb">
            <p>Freelance Project – Painting E-Commerce Application</p>
            <p className="italic">Remote (India)</p>
          </div>
          {/* Experience IN Tech */}
          <div className="fcb">
            <p className="font-semibold">Frontend Developer</p>
            <p>Aug 2024 – Sep 2024</p>
          </div>
          <ul className="list-disc ml-6">
            <li>
              Developed a responsive and interactive UI using React and Tailwind
              CSS, ensuring seamless experience devices.
            </li>
            <li>
              Integrated REST APIs for authentication, product management, and
              cart features, improving data flow efficiency.
            </li>
            <li>
              Built reusable, modular components, reducing development time for
              future enhancements by 30%.
            </li>
            <li>
              Optimized rendering and implemented best practices for performance
              and maintainability
            </li>
            <li>
              Improved page load speed by 25% through optimized rendering and
              code-splitting.
            </li>
          </ul>
        </div>

        {/* PROJECTS */}
        <div className="mt-3 flex flex-col text-[.85rem] ">
          {/* All Projects */}

          <h2 className="text-[1.2rem] text-[#7f7f7f] font-semibold uppercase">
            PROJECTS
          </h2>

          {/* PROJECT NAME */}
          <div className="flex flex-col gap-3">
            {[1, 2, 3].map((cur, id) => {
              return (
                <div key={id}>
                  <div className="fcb">
                    <p className="font-semibold">
                      Qubiko – AI-Powered Chat Assistant
                    </p>
                    <p>02/2025 – 05/2025</p>
                  </div>
                  <ul className="list-disc ml-6">
                    <li>
                      Developed a real-time AI chat assistant capable of
                      handling structured and professional conversations
                      efficiently.
                    </li>
                    <li>
                      Enhanced user engagement and response accuracy by
                      implementing structured prompts and multi-tools.
                    </li>
                    <li>
                      Improved response speed by 3x and increased user
                      satisfaction through seamless real-time updates.
                    </li>
                    <li>
                      <span className="font-bold">Tech Stack:</span> MERN,
                      WebSocket, LangChain, Google Gemini LLM, Cloudinary
                    </li>
                    <li>
                      <div className="flex">
                        <span className="font-bold">Live & Github:</span>
                        <p className="flex items-center gap-1 text-blue-700 ml-1">
                          <u>
                            <a href="">Live Demo</a>
                          </u>
                          |
                          <u>
                            <a href="">Github</a>
                          </u>
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainResume;
