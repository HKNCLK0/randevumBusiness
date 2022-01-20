import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_URL } from "../config";
import { decodeJWT } from "did-jwt";
import { Footer } from "../components";

const Comments = () => {
  const [data, setData] = useState([]);
  const token = sessionStorage.getItem("token");
  const businessID = decodeJWT(token);
  useEffect(() => {
    axios
      .get(`${API_URL}/comments/${businessID.payload.id}`)
      .then((res) => setData(res.data));
  }, []);
  return (
    <>
      <main className="py-16 font-Montserrat flex flex-col gap-16 items-center">
        <div className="flex w-3/4 flex-col gap-4 items-center justify-center">
          <h1 className="text-textColor font-bold">Değerlendirmeler</h1>
          <div className="w-3/4 gap-y-4 flex items-center justify-center flex-col rounded-xl bg-boxColor py-8">
            {data.map((comment) => (
              <div
                key={comment._id}
                className="w-3/4 px-24 py-4 rounded-lg border-2 border-borderAndOtherRed border-opacity-50 transition-colors hover:border-opacity-100 duration-200"
              >
                <h1 className="text-textColor">{comment.commentText}</h1>
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
};

export default Comments;
