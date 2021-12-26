import React from "react";
import { BrowserRouter as Link } from "react-router-dom";

const Header = () => {
  const token = sessionStorage.getItem("token");
  return (
    <header>
      <div className="w-full h-16 filter drop-shadow-xl bg-boxColor flex items-center md:justify-around text-textColor">
        <div className="w-1/6 flex items-center justify-center ">
          <img
            alt="logo-header"
            className="w-14 h-14"
            src="https://firebasestorage.googleapis.com/v0/b/randevum-5d873.appspot.com/o/logo-hakan.png?alt=media&token=5a4a56b9-9243-4fb2-8d49-d04ce69f94e4"
          />
        </div>
        <div className="hidden sm:text-xs md:text-sm lg:text-md xl:text-base w-2/4 h-full md:flex flex-row font-Montserrat text-primary-bir items-center text-center justify-center font-semibold md:gap-10 lg:gap-20">
          <Link to="/">
            <h1>Anasayfa</h1>
          </Link>
          <Link to="/nasil-calisir">
            <h1>Nasıl Çalışır?</h1>
          </Link>
          <Link to="/businesses">
            <h1>İşletmeler</h1>
          </Link>
          <Link to="/create">
            <h1>Oluştur</h1>
          </Link>
        </div>
        {token ? (
          <div className="hidden md:flex w-2/12 lg:w-1/6 h-full font-Montserrat text-sm lg:text-base items-center lg:justify-start font-bold">
            <Link to="/dashboard" className="flex flex-row items-center gap-2">
              <img
                alt="dashboard"
                className="w-5 h-5 mb-1"
                src="https://firebasestorage.googleapis.com/v0/b/randevum-5d873.appspot.com/o/user.png?alt=media&token=ecf39dbd-d5f3-43ee-9426-5885b757d857"
              />
              <h1 className="text-primary-bir">Hesabım</h1>
            </Link>
          </div>
        ) : (
          <div className="hidden md:flex md:w-3/12 lg:w-1/6 h-full font-Montserrat text-sm items-center sm:justify-center lg:justify-start font-bold flex-row sm:gap-2 md:gap-3 lg:gap-4">
            <Link to="/login" className="lg:py-1 text-primary-bir">
              Giriş Yap
            </Link>
            <Link to="/register">
              <div className="w-20 sm:px-2 md:px-2 md:w-auto py-2 flex items-center justify-center lg:px-4 lg:py-2 rounded-full bg-borderAndOtherRed text-textColor text-primary-iki">
                <h1>Kayıt Ol</h1>
              </div>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
