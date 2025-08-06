import React from "react";
import Heading from "../../Common/Heading";
import SubHeading from "../../Common/SubHeading";
import { FEATURES } from "./../../Data/data";
import * as FaIcons from "react-icons/fa";

const Features = () => {
  return (
    <>
      <div className="cc w-screen">
        <div className="container mt-5 ">
          {/*  heading  */}
          <div className="cc">
            <Heading text={"Powerful Features"} />
            <div className="md:w-[45%] ">
              <SubHeading
                text={
                  "Leverage next-gen automation, intelligent design systems, and dynamic enhancement modules all in one place."
                }
              />
            </div>
          </div>

          {/* features */}
          <div className="cc mt-[2rem] ">
            <div className="grid md:grid-cols-3 grid-cols-1 gap-10 place-content-center md:w-[85%] mb-10">
              {FEATURES.map((cur, id) => {
                const IconComponent = FaIcons[cur.icon] || FaIcons.FaRegSmile;

                return (
                  <div
                    key={id}
                    className="p-8 bs rounded-md flex flex-col gap-3 bg-[#fdfdfe]"
                  >
                    <div
                      className={`cc w-[3.2rem] h-[3.2rem] rounded-lg`}
                      style={{ background: cur.color }}
                    >
                      <IconComponent className="text-2xl text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mt-2">
                      {cur.heading}
                    </h3>
                    <p className="text-gray-600">{cur.subHeading}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Features;


