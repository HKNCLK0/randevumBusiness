import React, { useEffect, useState } from "react";
import { Box, MainContainer } from "../components/UI";
import { Footer } from "../components";
import { API_URL } from "../config";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const Plan = () => {
  const navigate = useNavigate();
  const [cookie, setCookies] = useCookies(["token"]);

  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/plans/get-level`, {
        headers: {
          Authorization: "Bearer " + cookie.token,
        },
      })
      .then((res) =>
        res.data
          ? navigate("/")
          : axios.get(`${API_URL}/plans`).then((res) => setData(res.data.data))
      );
  }, []);

  const createSession = async (priceID) => {
    await axios
      .post(
        `${API_URL}/plans/session`,
        {
          priceID: priceID,
        },
        {
          headers: {
            Authorization: "Bearer " + cookie.token,
          },
        }
      )
      .then((res) => (window.location.href = res.data.url));
  };

  return (
    <>
      <MainContainer title="Planlar">
        <Box>
          <p className="text-textColor font-medium text-sm text-center">
            İşletmeniz İçin En Uygun Planı Seçin <br /> Planı Satın Almak İçin
            Tıklayın
          </p>
          <div className="grid grid-cols-3 gap-24 w-4/5">
            {data
              .map((plan) => (
                <button
                  onClick={() => createSession(plan.id)}
                  key={plan.product.id}
                  className="bg-background flex flex-col gap-y-2 items-center py-4 rounded-xl text-textColor transition hover:scale-110 ease-in-out duration-200"
                >
                  <h1>{plan.product.name}</h1>
                </button>
              ))
              .reverse()}
          </div>
        </Box>
      </MainContainer>
      <Footer />
    </>
  );
};

export default Plan;
