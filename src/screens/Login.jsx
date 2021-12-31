import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { API_URL } from "../config";
import Footer from "../components/Footer";

const Login = () => {
  const token = sessionStorage.getItem("token");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const handleLogin = () => {
    setLoading(true);
    axios
      .post(`${API_URL}/businesses/login`, {
        businessEmail: email,
        businessPassword: password,
      })
      .then((res) => {
        if (res.data.business) {
          sessionStorage.setItem("token", res.data.business.token);
          navigate("/dashboard");
        } else {
          alert("Please Check Email or Password");
        }
      })
      .catch(() => setError(true))
      .finally(() => {
        setLoading(false);
        setEmail("");
        setPassword("");
      });
  };
  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, []);
  return (
    <>
      <main className="py-16 font-Montserrat flex flex-col gap-8 items-center">
        <div className="flex flex-col gap-4 items-center justify-center">
          <img
            className="w-28 h-28"
            src="https://firebasestorage.googleapis.com/v0/b/randevum-5d873.appspot.com/o/logo-hakan.png?alt=media&token=5a4a56b9-9243-4fb2-8d49-d04ce69f94e4"
            alt="login-logo"
          />
          <h1 className="text-textColor text-xl font-bold">Business</h1>
        </div>
        <div
          className={`${
            error
              ? " px-8 py-3 visible border-2 border-borderAndOtherRed text-borderAndOtherRed rounded-lg font-semibold"
              : "invisible"
          }`}
        >
          E-Posta veya Şifre Hatalı!
        </div>
        <div className="w-1/4 gap-y-8 flex items-center justify-center flex-col rounded-xl bg-boxColor py-8">
          <h1 className="text-textColor font-bold text-xl">Giriş Yap</h1>
          <div className="w-1/2 flex flex-col items-center gap-4">
            <input
              id="emailInput"
              className="w-full h-11 border-2 rounded-lg border-transparent transition-colors duration-200 focus:border-borderAndOtherRed outline-none text-sm px-2 font-semibold"
              placeholder="E-Posta"
              type="text"
              value={email}
              onFocus={() => setError(false)}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="w-full h-11 border-2 rounded-lg border-transparent transition-colors duration-200 focus:border-borderAndOtherRed outline-none text-sm px-2 font-semibold"
              placeholder="Şifre"
              type="password"
              value={password}
              onFocus={() => setError(false)}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) =>
                !email || !password ? null : e.key === "Enter" && handleLogin(e)
              }
            />
          </div>
          <button
            onClick={() => handleLogin()}
            disabled={!email || !password}
            className={`items-center justify-center flex ${
              !email || !password
                ? " cursor-not-allowed w-1/3 py-2.5 rounded-xl font-semibold text-base filter border-2 border-transparent drop-shadow-md bg-primary-iki text-textColor transition-colors duration-200 bg-disabledColor"
                : " w-1/3 py-2.5 transition-colors duration-200 hover:text-boxColor border-2 border-borderAndOtherRed hover:border-transparent hover:bg-textColor rounded-xl font-semibold text-base filter drop-shadow-md bg-primary-iki text-textColor bg-background"
            }`}
          >
            {loading ? <Loader /> : "Giriş Yap"}
          </button>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Login;
