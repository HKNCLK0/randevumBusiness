import React from "react";

const NotFound = () => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center text-textColor">
      <div className="w-full h-1/2 flex flex-col gap-16 items-center justify-center">
        <h1 className="font-Montserrat font-extrabold text-3xl">
          Page Not Found
        </h1>
      </div>
      <img
        alt="not-found-logo"
        className="w-36 h-36"
        src="https://firebasestorage.googleapis.com/v0/b/randevum-5d873.appspot.com/o/logo-hakan.png?alt=media&token=5a4a56b9-9243-4fb2-8d49-d04ce69f94e4"
      />
    </div>
  );
};

export default NotFound;
