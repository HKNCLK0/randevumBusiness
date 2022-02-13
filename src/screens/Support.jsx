import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Footer } from "../components";
import MainContainer from "../components/UI/MainContainer";
import { API_URL } from "../config";

//TODO:Mailin Gideceği E-Posta Açılacak
const Support = () => {
  const [cookie, setCookies] = useCookies(["token"]);

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [problemText, setProblemText] = useState("");

  useEffect(() => {
    document.getElementById("name").focus();
  }, []);

  const handleSubmit = () => {
    axios
      .post(
        `${API_URL}/support`,
        {
          name,
          surname,
          email,
          phone,
          selectedSubject,
          problemText,
        },
        {
          headers: {
            Authorization: "Bearer " + cookie.token,
          },
        }
      )
      .then((res) => {
        console.log(res);
        if (res.statusText === "OK") {
          alert("Support Request Send");
          window.location.reload();
        }
      })
      .catch((err) => {
        alert("Support Request Error");
        window.location.reload();
      });
  };
  return (
    <>
      <MainContainer title="Destek">
        <div className="w-3/4 gap-y-4 flex items-center justify-center flex-col rounded-xl bg-boxColor pt-8 pb-4">
          <h1 className="text-textColor font-semibold">
            Destek İçin Lütfen Aşağıdaki Formu Doldurun
          </h1>
          <div className="flex flex-col gap-4 w-full items-center justify-center">
            <div className="flex w-3/6 gap-6">
              <input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="İsim"
                className="px-2 py-2 w-full rounded-lg border-2 border-transparent focus:border-borderAndOtherRed transition-colors duration-200 outline-none font-semibold text-sm"
              />
              <input
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                placeholder="Soyisim"
                className="px-2 py-2 w-full rounded-lg border-2 border-transparent focus:border-borderAndOtherRed transition-colors duration-200 outline-none font-semibold text-sm"
              />
            </div>
            <div className="flex gap-6 w-3/6 justify-between">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E-Posta"
                className="px-2 disabled:cursor-not-allowed py-2 w-full rounded-lg border-2 border-transparent focus:border-borderAndOtherRed transition-colors duration-200 outline-none font-semibold text-sm"
              />
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="tel"
                placeholder="Telefon Numarası"
                className="px-2 py-2 w-full rounded-lg border-2 border-transparent focus:border-borderAndOtherRed transition-colors duration-200 outline-none font-semibold text-sm"
              />
            </div>
            <div className="w-3/6">
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="px-2 border-2 border-transparent focus:border-borderAndOtherRed transition-colors duration-200 w-full py-2 flex gap-4 rounded-lg outline-none font-semibold text-sm"
              >
                <option value="" className="px-2 py-2 text-gray-400">
                  Konu Seçiniz
                </option>
                <option value="İşletme" className="px-2 font-semibold py-2">
                  İşletme
                </option>
                <option value="Randevular" className="px-2 font-semibold py-2">
                  Randevular
                </option>
                <option value="Tarih/Saat" className="px-2 font-semibold py-2">
                  Tarih/Saat
                </option>
                <option value="Hesap" className="px-2 font-semibold py-2">
                  Hesap
                </option>
                <option
                  value="Resim Galerisi"
                  className="px-2 font-semibold py-2"
                >
                  Resim Galerisi
                </option>
                <option
                  value="Değerlendirmeler"
                  className="px-2 font-semibold py-2"
                >
                  Değerlendirmeler
                </option>
              </select>
            </div>
            <div className="w-3/6 flex">
              <textarea
                onKeyPress={(e) => e.key === "Enter" && alert("asd")}
                value={problemText}
                onChange={(e) => setProblemText(e.target.value)}
                placeholder="Sorununuzu Buraya Yazınız"
                className="w-full border-2 border-transparent focus:border-borderAndOtherRed transition-colors duration-200 text-sm outline-none font-semibold rounded-lg px-2 py-2 items-start justify-start h-24"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 items-center">
            <button
              disabled={
                !name ||
                !surname ||
                !email ||
                !phone ||
                !selectedSubject ||
                !problemText
              }
              onClick={() => handleSubmit()}
              className="border-2 border-borderAndOtherRed peer duration-200 px-6 py-2.5 text-textColor font-semibold rounded-lg text-sm transition-colors hover:border-transparent hover:text-boxColor hover:bg-textColor disabled:border-transparent disabled:bg-disabledColor disabled:text-textColor"
            >
              Gönder
            </button>
            <h1
              className={`${
                !name ||
                !surname ||
                !email ||
                !phone ||
                !selectedSubject ||
                !problemText
                  ? "text-sm text-borderAndOtherRed transition-opacity opacity-0 duration-200 peer-hover:opacity-100"
                  : "text-sm opacity-0"
              }`}
            >
              Lütfen Tüm Bilgileri Eksiksiz Doldurun
            </h1>
          </div>
        </div>
      </MainContainer>
      <Footer />
    </>
  );
};

export default Support;
