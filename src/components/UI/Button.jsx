import React from "react";
import { Link } from "react-router-dom";

const Button = (props) => {
  return (
    <Link
      className={`flex flex-col text-xl transition-colors hover:bg-textColor outline-none items-center justify-center rounded-lg ${props.className} bg-buttonColor`}
      to={props.to}
    >
      {props.children}
    </Link>
  );
};

export default Button;
