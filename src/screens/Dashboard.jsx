import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/UI/Button";

//TODO:Tüm token ile girilen yerlere API'dan doğrulama yapılacak
const Dashboard = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, []);
  const handleLogout = () => {
    sessionStorage.removeItem("token");
    window.location.reload();
  };
  return (
    <>
      <main className="flex flex-col h-[100vh] items-center py-12 gap-6 font-Montserrat">
        <div className="flex gap-16">
          <h1 className="text-textColor text-2xl font-bold">Yönetim Paneli</h1>
          <button onClick={() => handleLogout()} className="bg-red-400">
            Çıkış Yap
          </button>
        </div>
        <div className="w-11/12 h-full gap-4 grid grid-cols-1 grid-rows-3 bg-boxColor p-4 rounded-xl">
          <div className="grid grid-cols-3 grid-rows-1 gap-4">
            <Button className="col-span-2" to="/dashboard/business-settings">
              <h1 className="text-boxColor font-bold">İşletme Ayarları</h1>
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
            <Button to="">
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
          </div>
        </div>
      </main>
    </>
  );
};

export default Dashboard;
