import React from "react";

const MainContainer = (props) => {
  return (
    <main
      className={`${props.className} py-16 font-Montserrat flex flex-col gap-16 items-center`}
    >
      <h1 className="text-textColor font-bold">{props.title}</h1>
      {props.children}
    </main>
  );
};

export default MainContainer;
