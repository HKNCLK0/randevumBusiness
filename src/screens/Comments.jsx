import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_URL } from "../config";
import { decodeJWT } from "did-jwt";
import { Footer } from "../components";
import { Box, MainContainer } from "../components/UI";

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
      <MainContainer title="Değerlendirmeler">
        <Box>
          {data.map((comment) => (
            <div
              key={comment._id}
              className="w-3/4 px-24 py-4 rounded-lg border-2 border-borderAndOtherRed border-opacity-50 transition-colors hover:border-opacity-100 duration-200"
            >
              <h1 className="text-textColor">{comment.commentText}</h1>
            </div>
          ))}
        </Box>
        <Footer />
      </MainContainer>
    </>
  );
};

export default Comments;
