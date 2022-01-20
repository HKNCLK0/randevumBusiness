import React, { useState } from "react";
import fire from "../firebase";
import { decodeJWT } from "did-jwt";
import { Footer } from "../components";

//TODO:Amazon AWS Kurulacak
const PhotoGallery = () => {
  const storage = fire.storage();
  const token = sessionStorage.getItem("token");
  const business = decodeJWT(token);
  const [file, setFile] = useState();
  const [images, setImages] = useState([]);

  const handleUpload = (e) => {
    e.preventDefault();
    const ref = storage.ref(
      `/businessImages/${business.payload.id}/${file.name}`
    );
    const uploadTask = ref.put(file);
    uploadTask.on("state_changed", console.log, console.error, () => {
      ref.getDownloadURL().then((url) => {
        setFile(null);
        setImages((prevImages) => [...prevImages, url]);
      });
    });
  };
  return (
    <>
      <main className="py-16 font-Montserrat flex flex-col gap-16 items-center">
        <div className="flex w-3/4 flex-col gap-4 items-center justify-center">
          <h1 className="text-textColor font-bold">
            İşletmeniz İçin Resimler Yükleyin
          </h1>
          <div className="w-3/4 gap-y-4 flex items-center justify-center flex-col rounded-xl bg-boxColor py-8">
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
          </div>
          <button className="text-textColor" onClick={(e) => handleUpload(e)}>
            Yükle
          </button>
        </div>
        <Footer />
      </main>
    </>
  );
};

export default PhotoGallery;
