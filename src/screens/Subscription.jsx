import React, { useEffect, useState } from "react";
import { Box, MainContainer } from "../components/UI";
import { SubscriptionCards } from "../components/Subscritption";
import axios from "axios";
import { API_URL } from "../config";
import { decodeJWT } from "did-jwt";
import { Footer } from "../components";
import { useCookies } from "react-cookie";

//TODO:Kartların Navigasyonları Yapılacak

const Subscription = () => {
  const [cookie, setCookie] = useCookies(["token"]);

  const [data, setData] = useState([]);

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
                  <button className="w-1/3 bg-background rounded-lg p-8 flex flex-col items-center transition-colors hover:cursor-pointer duration-300 gap-4 group hover:text-background hover:bg-textColor">
                    <h1 className="text-textColor transition-colors duration-300 group-hover:text-background font-bold text-lg">
                      {data.planName}
                    </h1>
                    <div>
                      {/*data.planDetails.map((detail, index) => (
                        <h1
                          key={index}
                          className="text-textColor font-medium transition-colors duration-300 group-hover:text-background"
                        >
                          {detail}
                        </h1>
                      ))*/}
                    </div>
                    <h1 className="text-textColor text-xl font-bold transition-colors duration-300 group-hover:text-background">
                      {data.planPrice}
                    </h1>
                  </button>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="w-full flex flex-col items-center px-8 gap-y-4">
              <h1 className="text-textColor font-semibold">
                Geçebileceğiniz Abonelikler
              </h1>
              <SubscriptionCards nowPlan={data._id} />
            </div>
          </Box>
        </div>
        <Footer />
      </MainContainer>
    </>
  );
};

export default Subscription;
