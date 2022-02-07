import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_URL } from "../config";

import { Footer } from "../components";
import { Box, MainContainer } from "../components/UI";
import { useCookies } from "react-cookie";

const Comments = () => {
  const [data, setData] = useState([]);

  const [cookie, setCookies] = useCookies(["token"]);

  useEffect(() => {
    axios
      .get(`${API_URL}/comments`, {
        headers: {
          Authorization: "Bearer " + cookie.token,
        },
      })
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
              <h1 className="text-textColor font-semibold">
                {comment.commentText}
              </h1>
              <h1 className="text-textColor">{comment.createdAt}</h1>
              <h1 className="text-textColor">{comment.commentPoint}</h1>
            </div>
          ))}
        </Box>
        <Footer />
      </MainContainer>
    </>
  );
};

export default Comments;
