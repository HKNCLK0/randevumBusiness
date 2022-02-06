import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_URL } from "../../config";

//TODO:Kartların Ödeme Ekranları Yapılacak

const SubscriptionCards = ({ nowPlan }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get(`${API_URL}/plans`).then((res) => setData(res.data.data));
  }, []);

  return (
    <div className="w-full flex gap-8">
      {data.map((plan, index) => (
        <button
          key={index}
          className="w-1/3 bg-background rounded-lg p-8 flex flex-col items-center transition-colors hover:cursor-pointer duration-300 gap-4 group hover:text-background hover:bg-textColor"
        >
          <h1 className="text-textColor transition-colors duration-300 group-hover:text-background font-bold text-lg">
            {plan.id}
          </h1>
          <h1 className="text-textColor text-xl font-bold transition-colors duration-300 group-hover:text-background">
            {plan.unit_amount / 100}
          </h1>
          <form action="/create-checkout-session" method="POST">
            {/* Add a hidden field with the lookup_key of your Price */}
            <input type="hidden" name="lookup_key" value="RANDEVUM" />
            <button id="checkout-and-portal-button" type="submit">
              Checkout
            </button>
          </form>
        </button>
      ))}
    </div>
  );
};

export default SubscriptionCards;
