import React from "react";

const Button_Loader = ({text}) => {
  return (
    <div className="fc gap-2 cursor-pointer">
      <span className="loader"></span> <p>{text?text:"Loading...."}</p>
    </div>
  );
};

export default Button_Loader;
