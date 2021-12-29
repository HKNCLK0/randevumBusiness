import axios from "axios";
import { decodeJWT } from "did-jwt";
import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import { API_URL } from "../config";

const Meets = () => {
  const token = sessionStorage.getItem("token");
  const businessID = decodeJWT(token);
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get(`${API_URL}/meets/business/${businessID.payload.id}`)
      .then((res) => setData(res.data));
  }, []);
  return (
    <>
      <main className="py-16 font-Montserrat flex flex-col gap-16 items-center">
        <div className="w-11/12 gap-y-8 flex items-center justify-center flex-col rounded-xl bg-boxColor py-8">
          <h1 className="text-textColor font-bold text-xl">Randevular</h1>
          {data.length !== 0 ? (
            <div className="grid grid-cols-8 gap-x-4 px-16">
              {data.map((meet) => (
                <div
                  key={meet._id}
                  className="flex flex-col items-center gap-2 font-semibold bg-background text-textColor font-Montserrat px-8 py-6 rounded-lg"
                >
                  <div className="w-16 h-16 rounded-full bg-red-50" />
                  {meet.userData.map((user) => (
                    <h1 key={user._id} className="flex">
                      {user.name} {user.surname}
                    </h1>
                  ))}
                  <h1>{meet.date}</h1>
                  <h1>{meet.clock}</h1>
                  <button className="border-2 border-borderAndOtherRed px-4 py-2 rounded-lg text-sm font-semibold transition-colors hover:bg-textColor hover:border-transparent hover:text-boxColor">
                    Detay
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <h1 className="font-semibold text-sm text-textColor">
              Oluşturulan Randevu Bulunamadı
            </h1>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Meets;
