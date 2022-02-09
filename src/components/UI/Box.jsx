import React from "react";

const Box = (props) => {
  return (
    <div
      className={`${props.className} w-3/4 gap-y-8 flex items-center justify-center flex-col rounded-xl bg-boxColor py-8`}
    >
      {props.children}
    </div>
  );
};

export default Box;
