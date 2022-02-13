import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Footer } from "../components";
import { Box, MainContainer } from "../components/UI";
import { API_URL } from "../config";

const BusinessSettings = () => {
  const [cookie, setCookies] = useCookies(["businessToken"]);

  const [data, setData] = useState("");

  useEffect(() => {
    axios
      .get(`${API_URL}/businesses/business`, {
        headers: {
          Authorization: "Bearer " + cookie.token,
        },
      })
      .then((res) => setData(res.data[0]))
      .catch((err) => alert(err.response));
  }, []);

  return (
    <>
      <MainContainer title="İşletme Ayarları">
        <Box>
          <h1 className="text-textColor font-semibold">
            İşletmeniz İle İlgili Ayarlar İçin Destekle İletişime Geçin
          </h1>
          <div className="w-2/12 flex flex-col items-center">
            <h1 className="text-textColor font-semibold">İşletme Adı</h1>
            <input
              disabled
              id="emailInput"
              className="cursor-not-allowed w-full h-11 border-2 rounded-lg border-transparent transition-colors duration-200 focus:border-borderAndOtherRed outline-none text-sm px-2 font-semibold"
              type="text"
              value={data.businessName}
            />
          </div>
          <div className="w-4/12 gap-8 flex items-center">
            <div className="w-full flex items-center flex-col">
              <h1 className="text-textColor font-semibold">İşletme E-Posta</h1>
              <input
                disabled
                id="emailInput"
                className="cursor-not-allowed w-full h-11 border-2 rounded-lg border-transparent transition-colors duration-200 focus:border-borderAndOtherRed outline-none text-sm px-2 font-semibold"
                type="text"
                value={data.businessEmail}
              />
            </div>
            <div className="w-full flex items-center flex-col">
              <h1 className="text-textColor font-semibold">
                İşletme Telefon Numarası
              </h1>
              <input
                disabled
                id="emailInput"
                className="cursor-not-allowed w-full h-11 border-2 rounded-lg border-transparent transition-colors duration-200 focus:border-borderAndOtherRed outline-none text-sm px-2 font-semibold"
                type="text"
                value={data.businessPhone}
              />
            </div>
          </div>
          <div className="w-2/12 flex flex-col items-center">
            <h1 className="text-textColor font-semibold">İşletme Adresi</h1>
            <input
              disabled
              id="emailInput"
              className="cursor-not-allowed w-full h-11 border-2 rounded-lg border-transparent transition-colors duration-200 focus:border-borderAndOtherRed outline-none text-sm px-2 font-semibold"
              type="text"
              value={data.businessAddress}
            />
          </div>
        </Box>
      </MainContainer>
      <Footer />
    </>
  );
};

export default BusinessSettings;
