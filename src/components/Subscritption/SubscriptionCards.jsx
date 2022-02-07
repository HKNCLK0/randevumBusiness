import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { API_URL } from "../../config";

//TODO:Kartların Ödeme Ekranları Yapılacak

const SubscriptionCards = () => {
  const [cookie, setCookie] = useCookies(["token"]);

  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get(`${API_URL}/plans`).then((res) => setData(res.data.data));
  }, []);

  const createSession = async (props) => {
    await axios
      .post(
        `${API_URL}/plans/session`,
        {
          priceID: props,
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
    <div className="w-full flex gap-8">
      {data.map((plan, index) => (
        <button
          onClick={() => createSession(plan.id)}
          key={index}
          className="w-1/3 bg-background rounded-lg p-8 flex flex-col items-center transition-colors hover:cursor-pointer duration-300 gap-4 group hover:text-background hover:bg-textColor"
        >
          <h1 className="text-textColor transition-colors duration-300 group-hover:text-background font-bold text-lg">
            {plan.product}
          </h1>
          <h1 className="text-textColor text-xl font-bold transition-colors duration-300 group-hover:text-background">
            {plan.unit_amount / 100}
          </h1>
        </button>
      ))}
    </div>
  );
};

export default SubscriptionCards;
