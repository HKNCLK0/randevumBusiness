import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_URL } from "../../config";

//TODO:Kartların Ödeme Ekranları Yapılacak

const SubscriptionCards = ({ nowPlan }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get(`${API_URL}/plans`).then((res) => setData(res.data));
  }, []);

  return (
    <div className="w-full flex gap-8">
      {data
        .filter((x) => x._id != nowPlan)
        .map((plan, index) => (
          <button
            key={index}
            className="w-1/3 bg-background rounded-lg p-8 flex flex-col items-center transition-colors hover:cursor-pointer duration-300 gap-4 group hover:text-background hover:bg-textColor"
          >
            <h1 className="text-textColor transition-colors duration-300 group-hover:text-background font-bold text-lg">
              {plan.planName}
            </h1>
            <div>
              {plan.planDetails.map((detail, index) => (
                <h1
                  key={index}
                  className="text-textColor font-medium transition-colors duration-300 group-hover:text-background"
                >
                  {detail}
                </h1>
              ))}
            </div>
            <h1 className="text-textColor text-xl font-bold transition-colors duration-300 group-hover:text-background">
              {plan.planPrice}
            </h1>
          </button>
        ))}
    </div>
  );
};

export default SubscriptionCards;
