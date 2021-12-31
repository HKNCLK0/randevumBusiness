import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const date = new Date();
  return (
    <footer className="flex flex-col w-full font-Montserrat gap-2 items-center">
      <Link
        to="/dashboard/support"
        className="font-semibold opacity-60 text-textColor"
      >
        Destek
      </Link>
      <h1 className="font-semibold opacity-60 text-sm text-textColor">
        Randevum Business © {date.getFullYear()} || All Right Reserved
      </h1>
    </footer>
  );
};

export default Footer;
