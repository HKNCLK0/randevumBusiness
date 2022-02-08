import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/UI/Button";

import { useCookies } from "react-cookie";
import { userPlan } from "../components/Data";
import axios from "axios";
import { API_URL } from "../config";

//TODO:Tüm token ile girilen yerlere API'dan doğrulama yapılacak
//TODO:Masa Ayarları Sayfası İşletmelere Göre Düzenlenebilir Olacak
const Dashboard = () => {
  const navigate = useNavigate();

  const [cookie, setCookies, removeCookie] = useCookies(["token"]);

  const token = cookie.token;

  const [data, setData] = useState([]);

  useEffect(() => {
    if (!token) {
      navigate("/");
    } else if (!userPlan) {
      navigate("/plan");
    } else {
      axios.get(`${API_URL}/panel`).then((res) => setData(res.data));
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
        <div className="w-11/12 h-full gap-4 grid grid-cols-3 grid-rows-3 bg-boxColor p-4 rounded-xl">
          {data.map((buton) => (
            <Button to={buton.panelURL}>
              <h1 className="text-boxColor font-bold">{buton.panelTitle}</h1>
            </Button>
          ))}

          {/*<div className="grid grid-cols-3 grid-rows-1 gap-4">

            <Button to="/dashboard/subscription">
              <h1 className="text-boxColor font-bold">Abonelik</h1>
            </Button>
            <Button to="/dashboard/comments">
              <h1 className="text-boxColor font-bold">Değerlendirmeler</h1>
            </Button>
          </div>
          <div className="grid grid-cols-3 grid-rows-1 gap-4">
            <Button to="/dashboard/meets">
              <h1 className="text-boxColor font-bold">Randevular</h1>
            </Button>
            <Button to="/dashboard/photo-gallery">
              <h1 className="text-boxColor font-bold">Resim Galerisi</h1>
            </Button>
            <Button to="/dashboard/table-settings">
              <h1 className="text-boxColor font-bold">Masa Ayarları</h1>
            </Button>
          </div>
          <div className="grid grid-cols-2 grid-rows-1 gap-4">
            <Button to="/dashboard/date-time-settings">
              <h1 className="text-boxColor font-bold">
                Randevu Tarih / Saat Ayarları
              </h1>
            </Button>
            <Button to="/dashboard/support">
              <h1 className="text-boxColor font-bold">Destek</h1>
            </Button>
  </div>*/}
        </div>
      </main>
    </>
  );
};

export default Dashboard;
