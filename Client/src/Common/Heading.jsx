import React from "react";

function Heading({ text }) {
  return (
    <h2 className="font-semibold md:text-[2.6rem] text-[2rem] text-grayBlack text-center">
      {text}
    </h2>
  );
}

export default Heading;
