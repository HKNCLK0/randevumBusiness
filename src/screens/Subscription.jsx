import React, { useEffect, useState } from "react";
import { Box, MainContainer } from "../components/UI";
import axios from "axios";
import { API_URL } from "../config";
import { Footer } from "../components";
import { useCookies } from "react-cookie";

//TODO:Kartların Navigasyonları Yapılacak

const Subscription = () => {
  const [cookie, setCookie] = useCookies(["businessToken"]);

  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/plans/get-level`, {
        headers: {
          Authorization: "Bearer " + cookie.token,
        },
      })
      .then((res) => setData(res.data.plan));
  }, []);

  const createCustomerPortal = async () => {
    axios
      .get(`${API_URL}/plans/portal`, {
        headers: {
          Authorization: "Bearer " + cookie.token,
        },
      })
      .then((res) => (window.location.href = res.data.url));
  };

  return (
    <>
      <MainContainer>
        <div className="flex w-3/4 flex-col gap-4 items-center justify-center">
          <h1 className="text-textColor font-bold">Subscription</h1>
          <Box>
            <div className="w-full flex flex-col items-center gap-4">
              <h1 className="text-textColor font-semibold">Mevcut Abonelik</h1>
              <div className="w-full flex justify-center">
                {data ? (
                  <button
                    onClick={() => createCustomerPortal()}
                    className="w-1/3 bg-background rounded-lg p-8 flex flex-col items-center transition-colors hover:cursor-pointer duration-300 gap-4 group hover:text-background hover:bg-textColor"
                  >
                    <h1 className="text-textColor transition-colors duration-300 group-hover:text-background font-bold text-lg">
                      {data.name}
                    </h1>
                    <h1 className="text-textColor transition-colors duration-300 group-hover:text-borderAndOtherRed font-semibold">
                      Aboneliğinizi Yönetin
                    </h1>
                  </button>
                ) : (
                  ""
                )}
              </div>
            </div>
          </Box>
        </div>
        <Footer />
      </MainContainer>
    </>
  );
};

export default Subscription;
