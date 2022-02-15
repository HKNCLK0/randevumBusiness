import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_URL } from "../config";
import City from "../Citys";
import İlce from "../İlce";
import { useNavigate } from "react-router-dom";
import fire from "../firebase";

const Register = () => {
  const storage = fire.storage();
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  const [businessName, setBusinessName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [categories, setCategories] = useState([]);
  const [address, setAddress] = useState("");
  const [filteredIlce, setFilteredIlce] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedIlce, setSelectedIlce] = useState("");

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
    axios
      .get(`${API_URL}/category`)
      .then((category) => setCategories(category.data));
    setFilteredIlce(İlce.filter((a) => a.il_id === selectedCountry));
  }, [selectedCountry]);

  const handleRegister = () => {
    axios
      .post(`${API_URL}/businesses/register`, {
        businessName: businessName,
        businessCategory: selectedCategory,
        businessEmail: email,
        businessPassword: password,
        businessPhone: phone,
        businessImage: imageURL,
        businessAddress: address,
        businessCountry: selectedCountry,
        businessIlce: selectedIlce,
      })
      .then((res) => {
        if (res.statusText === "OK") {
          alert("Kayıt Başarılı!");
          navigate("/");
        } else {
          alert("Please Check All Fields");
        }
      });
  };

  const [file, setFile] = useState();
  const [imageURL, setImageURL] = useState("");
  const onFileChange = async (e) => {
    const file = e.target.files[0];
    const storageRef = storage.ref(`businessImages/${email}/`);
    const fileRef = storageRef.child(file.name);
    setFile(file);
    await fileRef.put(file);
    setImageURL(await fileRef.getDownloadURL());
  };
  return (
    <>
      <main className="py-16 font-Montserrat flex flex-col gap-16 items-center">
        <div className="flex flex-col gap-4 items-center justify-center">
          <img
            className="w-28 h-28"
            src="https://firebasestorage.googleapis.com/v0/b/randevum-5d873.appspot.com/o/logo-hakan.png?alt=media&token=5a4a56b9-9243-4fb2-8d49-d04ce69f94e4"
            alt="login-logo"
          />
          <h1 className="text-textColor text-xl font-bold">Business</h1>
        </div>
        <div className="w-3/6 gap-4 flex items-center justify-center flex-col rounded-xl bg-boxColor pt-8 pb-4">
          <h1 className="text-textColor font-bold text-xl">Kayıt Ol</h1>
          <div className=" w-3/5 h-[40px] flex gap-8 justify-around">
            <input
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              placeholder="İşletme Adı"
              className="w-1/2 px-2 py-2 text-sm rounded-lg font-semibold outline-none"
            />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-2 border-2 border-transparent focus:border-borderAndOtherRed transition-colors duration-200 w-1/2 py-2 flex gap-4 rounded-lg outline-none font-semibold text-sm"
            >
              <option className="text-gray-400" value="">
                Kategori Seçin
              </option>
              {categories.map((category) => (
                <option
                  key={category._id}
                  className="font-semibold"
                  value={category.categoryName}
                >
                  {category.categoryName}
                </option>
              ))}
            </select>
          </div>
          <div className=" w-3/5 h-[40px] flex gap-8 justify-around">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-Posta"
              className="w-1/2 px-2 py-2 text-sm rounded-lg font-semibold outline-none"
            />
            <input
              value={password}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Şifre"
              className="w-1/2 px-2 py-2 text-sm rounded-lg font-semibold outline-none"
            />
          </div>
          <div className=" w-3/5 h-[40px] flex gap-8 justify-around">
            <input
              value={phone}
              type="tel"
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Telefon Numarası"
              className="w-full px-2 py-2 text-sm rounded-lg font-semibold outline-none"
            />
          </div>
          <div className=" w-3/5 h-[40px] flex gap-8 justify-around">
            <label className="w-full flex items-center justify-center">
              <h1 className="w-full h-full flex items-center justify-center text-textColor font-semibold text-sm cursor-pointer rounded-lg outline-dashed">
                {file ? file.name : "Resim Ekle"}
              </h1>
              <input
                id="file"
                type="file"
                onChange={onFileChange}
                className="hidden"
                name="files[]"
              />
            </label>
          </div>
          <div className=" w-3/5 h-20 flex gap-8 justify-around">
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Adres"
              className="w-full px-2 py-2 text-sm rounded-lg font-semibold outline-none"
            />
          </div>
          <div className=" w-3/5 h-[40px] flex gap-8 justify-around">
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="px-2 border-2 border-transparent focus:border-borderAndOtherRed transition-colors duration-200 w-1/2 py-2 flex gap-4 rounded-lg outline-none font-semibold text-sm"
            >
              <option className="text-gray-400" value="">
                İl
              </option>
              {City.map((city) => (
                <option
                  key={city.id}
                  className="font-semibold"
                  id={city.id}
                  value={city.id}
                >
                  {city.name}
                </option>
              ))}
            </select>
            <select
              value={selectedIlce}
              onChange={(e) => setSelectedIlce(e.target.value)}
              className="px-2 border-2 border-transparent focus:border-borderAndOtherRed transition-colors duration-200 w-1/2 py-2 flex gap-4 rounded-lg outline-none font-semibold text-sm"
            >
              <option className="text-gray-400" value="">
                İlçe
              </option>
              {filteredIlce.map((ilce) => (
                <option
                  key={ilce.id}
                  className="font-semibold"
                  value={ilce.name}
                >
                  {ilce.name}
                </option>
              ))}
            </select>
          </div>
          <button
            disabled={
              !businessName ||
              !selectedCategory ||
              !email ||
              !password ||
              !phone ||
              !address ||
              !selectedCountry ||
              !selectedIlce
            }
            onClick={() => handleRegister()}
            className="border-2 border-borderAndOtherRed peer duration-200 px-6 py-2.5 text-textColor font-semibold rounded-lg text-sm transition-colors hover:border-transparent hover:text-boxColor hover:bg-textColor disabled:border-transparent disabled:bg-disabledColor disabled:text-textColor"
          >
            Gönder
          </button>
          <h1
            className={`${
              !businessName ||
              !selectedCategory ||
              !email ||
              !password ||
              !phone ||
              !address ||
              !selectedCountry ||
              !selectedIlce
                ? "text-sm text-borderAndOtherRed transition-opacity opacity-0 duration-200 peer-hover:opacity-100"
                : "text-sm opacity-0"
            }`}
          >
            Lütfen Tüm Bilgileri Eksiksiz Doldurun
          </h1>
        </div>
      </main>
    </>
  );
};

export default Register;
