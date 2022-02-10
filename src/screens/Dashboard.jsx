import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/UI/Button";

import { useCookies } from "react-cookie";
import axios from "axios";
import { API_URL } from "../config";

//TODO:Tüm token ile girilen yerlere API'dan doğrulama yapılacak
//TODO:Masa Ayarları Sayfası İşletmelere Göre Düzenlenebilir Olacak
const Dashboard = () => {
  const navigate = useNavigate();

  const [cookie, setCookies, removeCookie] = useCookies(["token"]);

  const token = cookie.token;

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) {
      navigate("/");
    } else {
      setLoading(true);
      axios
        .get(`${API_URL}/plans/get-level`, {
          headers: {
            Authorization: "Bearer " + cookie.token,
          },
        })
        .then((res) => {
          setLoading(false);
          setData(res.data.panel);
        })
        .catch((err) =>
          err.response.data == "Subscription Not Found"
            ? navigate("/plan")
            : console.log("Abone")
        );
    }
  }, []);
  const handleLogout = () => {
    removeCookie("token");
    window.location.reload();
  };
  return (
    <>
      <main className="flex flex-col h-[100vh] items-center py-12 gap-6 font-Montserrat">
        <div className="flex relative justify-center items-center gap-16 w-full">
          <h1 className="text-textColor text-2xl font-bold">Yönetim Paneli</h1>
          <button
            onClick={() => handleLogout()}
            className="text-textColor right-16 absolute font-semibold border-2 border-borderAndOtherRed px-4 py-2 rounded-lg transition-colors duration-300 hover:text-background hover:bg-textColor hover:border-transparent"
          >
            Çıkış Yap
          </button>
        </div>

        {loading ? (
          <div className="w-11/12 h-full gap-4 grid grid-cols-3 grid-rows-3 bg-boxColor p-4 rounded-xl">
            <div className="bg-background duration-200 animate-pulse flex flex-col text-xl outline-none items-center justify-center rounded-lg " />
            <div className="bg-background duration-200 animate-pulse flex flex-col text-xl outline-none items-center justify-center rounded-lg " />
            <div className="bg-background duration-200 animate-pulse flex flex-col text-xl outline-none items-center justify-center rounded-lg " />
            <div className="bg-background duration-200 animate-pulse flex flex-col text-xl outline-none items-center justify-center rounded-lg " />
            <div className="bg-background duration-200 animate-pulse flex flex-col text-xl outline-none items-center justify-center rounded-lg " />
            <div className="bg-background duration-200 animate-pulse flex flex-col text-xl outline-none items-center justify-center rounded-lg " />
            <div className="bg-background duration-200 animate-pulse flex flex-col text-xl outline-none items-center justify-center rounded-lg " />
            <div className="bg-background duration-200 animate-pulse flex flex-col text-xl outline-none items-center justify-center rounded-lg " />
          </div>
        ) : (
          <div className="w-11/12 h-full gap-4 grid grid-cols-3 grid-rows-3 bg-boxColor p-4 rounded-xl">
            {data.map((buton, index) => (
              <Button key={index} to={buton.panelURL}>
                <h1 className="text-boxColor font-bold">{buton.panelTitle}</h1>
              </Button>
            ))}
          </div>
        )}
      </main>
    </>
  );
};

export default Dashboard;
