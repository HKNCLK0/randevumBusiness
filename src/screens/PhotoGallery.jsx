import React, { useEffect, useState } from "react";
import fire from "../firebase";
import { Footer } from "../components";
import { useCookies } from "react-cookie";
import axios from "axios";
import { API_URL } from "../config";

const PhotoGallery = () => {
  const storage = fire.storage();

  const [cookie, setCookies] = useCookies(["token"]);

  const [file, setFile] = useState();
  const [images, setImages] = useState([]);

  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/businesses/business`, {
        headers: {
          Authorization: "Bearer " + cookie.token,
        },
      })
      .then((res) => {
        setData(res.data[0]);
      });
  }, []);

  const onFileChange = async (e) => {
    const file = e.target.files[0];
    const storageRef = storage.ref(`businessImages/${data._id}/`);
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file);
    console.log(await fileRef.getDownloadURL());
  };

  return (
    <>
      <main className="py-16 font-Montserrat flex flex-col gap-16 items-center">
        <div className="flex w-3/4 flex-col gap-4 items-center justify-center">
          <h1 className="text-textColor font-bold">
            İşletmeniz İçin Resimler Yükleyin
          </h1>
          <div className="w-3/4 gap-y-4 flex items-center justify-center flex-col rounded-xl bg-boxColor py-8">
            <input type="file" onChange={onFileChange} />
          </div>
          <button className="text-textColor">Yükle</button>
        </div>
        <Footer />
      </main>
    </>
  );
};

export default PhotoGallery;
