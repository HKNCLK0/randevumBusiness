import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Footer } from "../components";
import { Box, MainContainer } from "../components/UI";
import { API_URL } from "../config";

//TODO:User Data İçine Yazılacak

const Meets = () => {
  const [cookie, setCookies] = useCookies(["token"]);

  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get(`${API_URL}/meets/business-meets`, {
        headers: {
          Authorization: "Bearer " + cookie.token,
        },
      })
      .then((res) => setData(res.data));
  }, []);
  return (
    <>
      <MainContainer title="Randevular">
        <Box>
          {data.length > 0 ? (
            <div className="grid grid-cols-8 gap-x-4 px-16">
              {data.map((meet) => (
                <div
                  key={meet._id}
                  className="flex flex-col items-center gap-2 text-center font-semibold bg-background text-textColor font-Montserrat px-8 py-6 rounded-lg"
                >
                  <div className="w-16 h-16 rounded-full bg-red-50" />
                  {/*meet.userData.map((user) => (
                    <h1 key={user._id} className="flex">
                      {user.name} {user.surname}
                    </h1>
                  ))*/}
                  <h1>{meet.date}</h1>
                  <h1>{meet.clock}</h1>
                  <button
                    disabled
                    className="disabled:cursor-not-allowed disabled:bg-disabledColor disabled:text-textColor disabled:border-transparent border-2 border-borderAndOtherRed px-4 py-2 rounded-lg text-sm font-semibold transition-colors hover:bg-textColor hover:border-transparent hover:text-boxColor"
                  >
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
        </Box>
      </MainContainer>
      <Footer />
    </>
  );
};

export default Meets;
