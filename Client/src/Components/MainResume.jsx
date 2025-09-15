import React from "react";

const MainResume = () => {
  return (
    <div className="bs w-[8.5in] h-[11in] pt-10 pb-5 cc relative">
      <div className="w-[92%] h-full">
        {/* resume header section */}
        <header>
          <h1 className="text-[1.6rem] font-bold fc gap-2">
            Akash <span className="text-gray-500 font-normal">Biswas</span>
          </h1>
          {/* link */}
          <div className="fc gap-2 text-[.88rem] capitalize">
            <p>+91-8101602709 |</p>
            <p>akashrahul2006@gmail.com |</p>
            <p>github |</p>
            <p>portfolio |</p>
            <p>linkedin.com/in/akashbiswas</p>
          </div>
        </header>

        {/* PROFILE */}
        <div className="mt-2">
          <h2 className="text-[1.2rem] text-[#7f7f7f] font-semibold uppercase">
            PROFILE
          </h2>
          <p className="text-[.85rem]">
            Self-taught Full Stack Developer crafting SaaS platforms with
            real-time systems, AI-driven workflows, and microservices
            architecture, leveraging Docker and advanced AI integration. Proven
            ability to deliver production-ready products that scale.
          </p>
        </div>

        {/* EDUCATION */}
        <div className="mt-3 flex flex-col text-[.85rem] ">
          <h2 className="text-[1.2rem] text-[#7f7f7f] font-semibold uppercase">
            EDUCATION
          </h2>
          {/* college name */}
          <div className="fcb">
            <p>Kalna Polytechnic, WBSCTE </p>
            <p className="italic">West Bengal, India</p>
          </div>
          {/* trade and course */}
          <div className="fcb">
            <p>
              <span className="font-semibold">Diploma</span> in Electronics and
              communication Engineering
            </p>
            <p className="italic">2023 – 2026</p>
          </div>

          <p>
            <span className="font-semibold">CGPA</span> 7.5
          </p>
        </div>

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
          <h2 className="text-[1.2rem] text-[#7f7f7f] font-semibold uppercase">
            PROJECTS
          </h2>

          {/* PROJECT NAME */}
          <div className="fcb">
            <p className="font-semibold">Qubiko – AI-Powered Chat Assistant</p>
            <p>02/2025 – 05/2025</p>
          </div>
          <ul className="list-disc ml-6">
            <li>
              Developed a real-time AI chat assistant capable of handling
              structured and professional conversations efficiently.
            </li>
            <li>
              Enhanced user engagement and response accuracy by implementing
              structured prompts and multi-tools.
            </li>
            <li>
              Improved response speed by 3x and increased user satisfaction
              through seamless real-time updates.
            </li>
            <li>
              <span className="font-bold">Tech Stack:</span> MERN, WebSocket,
              LangChain, Google Gemini LLM, Cloudinary
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MainResume;
