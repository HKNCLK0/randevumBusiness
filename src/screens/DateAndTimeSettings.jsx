import React, { useEffect, useState } from "react";
import moment from "moment";
import "moment/locale/tr";
import { Footer } from "../components";
import { Box, MainContainer } from "../components/UI";
import axios from "axios";
import { API_URL } from "../config";

import { useCookies } from "react-cookie";

const DateAndTimeSettings = () => {
  const [cookie, setCookies] = useCookies(["businessToken"]);

  const [selectedDay, setSelectedDay] = useState([]);
  const [inputTime, setInputTime] = useState("");
  const [selectedTime, setSelectedTime] = useState([]);

  var days = [];

  const handleSetMeetDates = () => {
    axios
      .put(
        `${API_URL}/businesses/setMeetsDates`,
        {
          meetDates: selectedDay,
        },
        {
          headers: {
            Authorization: "Bearer " + cookie.token,
          },
        }
      )
      .then((res) => alert("Yeni Randevu Tarihleriniz Kaydedilmiştir!"));
  };

  const handleSetMeetTimes = () => {
    axios
      .put(
        `${API_URL}/businesses/setMeetsTimes`,
        {
          meetTimes: selectedTime,
        },
        {
          headers: {
            Authorization: "Bearer " + cookie.token,
          },
        }
      )
      .then((res) => alert("Yeni Randevu Saatleriniz Kaydedilmiştir!"));
  };

  useEffect(() => {
    axios
      .get(`${API_URL}/businesses/business`, {
        headers: {
          Authorization: "Bearer " + cookie.token,
        },
      })
      .then((res) => setSelectedTime(res.data[0].businessMeetTimes));
  }, []);

  function getCurrentWeek(days) {
    var currentDate = moment();

    var weekStart = currentDate.clone().startOf("isoWeek");
    var weekEnd = currentDate.clone().endOf("isoWeek");

    for (var i = 0; i <= 6; i++) {
      days.push(moment(weekStart).add(i, "days").format("DD MMMM dddd"));
    }
  }
  getCurrentWeek(days);

  return (
    <>
      <MainContainer title="Date And Time Settings">
        <Box className="w-10/12">
          <h1 className="text-textColor font-semibold">
            İşletmenizin Açık Olduğu Günleri Seçiniz
          </h1>
          <div className="flex gap-8 w-full text-textColor items-center justify-center">
            {days.map((day) => (
              <button
                key={day}
                onClick={() => {
                  setSelectedDay(
                    selectedDay.includes(day)
                      ? selectedDay.filter((item) => item !== day)
                      : (oncekiState) => [...oncekiState, day]
                  );
                }}
                className={`${
                  selectedDay.includes(day)
                    ? "border-2 border-transparent px-2 py-1 rounded-lg text-boxColor bg-textColor duration-300 font-semibold"
                    : "border-2 border-borderAndOtherRed px-2 py-1 rounded-lg hover:border-transparent hover:bg-textColor hover:text-boxColor duration-300 font-semibold"
                }`}
              >
                {day}
              </button>
            ))}
          </div>
          <button
            disabled={selectedDay.length === 0}
            className="border-2 disabled:bg-disabledColor disabled:text-textColor disabled:border-transparent disabled:duration-200 disabled:transition-colors border-borderAndOtherRed px-6 py-2 rounded-lg text-textColor transition-colors duration-200 hover:bg-textColor hover:text-boxColor hover:border-transparent font-semibold"
            onClick={() => handleSetMeetDates()}
          >
            Kaydet
          </button>
        </Box>
        <Box>
          <div className="text-center">
            <h1 className="text-textColor font-semibold">
              İşletmenize Uygun Randevu Saatlerini Yazın
            </h1>
            <p className="text-sm text-textColor font-medium">
              Öncelikle Saat Bilgisi Girin, Ekle Butonuna Basın. Son Olarak
              Ekledğiniz Saatleri Kaydedin!
            </p>
          </div>
          <div className="flex flex-col gap-4 w-full items-center">
            <input
              type="time"
              onKeyPress={(e) =>
                e.key == "Enter" &&
                setSelectedTime((oncekiState) => [...oncekiState, inputTime])
              }
              value={inputTime}
              onChange={(e) => setInputTime(e.target.value)}
              className="px-2 font-semibold py-1 border-2 border-transparent outline-none transition-colors duration-300 hover:border-borderAndOtherRed focus:border-borderAndOtherRed rounded-lg"
            />
            <div className="grid grid-cols-10 gap-4">
              {selectedTime.map((time, index) => (
                <button
                  onClick={() =>
                    setSelectedTime(
                      selectedTime.filter((item) => item !== time)
                    )
                  }
                  className="flex items-center justify-center px-4 py-2 rounded-lg text-boxColor bg-textColor font-semibold border-2 border-transparent transition-colors duration-300 hover:text-textColor hover:border-borderAndOtherRed hover:bg-transparent"
                  key={index}
                >
                  {time}
                </button>
              ))}
            </div>
            <button
              disabled={inputTime.length === 0}
              onClick={() =>
                setSelectedTime((oncekiState) => [...oncekiState, inputTime])
              }
              className="border-2 disabled:bg-disabledColor disabled:text-textColor disabled:border-transparent disabled:duration-200 disabled:transition-colors border-borderAndOtherRed px-6 py-2 rounded-lg text-textColor transition-colors duration-200 hover:bg-textColor hover:text-boxColor hover:border-transparent font-semibold"
            >
              Ekle
            </button>
            <button
              disabled={inputTime.length === 0}
              onClick={() => handleSetMeetTimes()}
              className="border-2 disabled:bg-disabledColor disabled:text-textColor disabled:border-transparent disabled:duration-200 disabled:transition-colors border-borderAndOtherRed px-6 py-2 rounded-lg text-textColor transition-colors duration-200 hover:bg-textColor hover:text-boxColor hover:border-transparent font-semibold"
            >
              Kaydet
            </button>
          </div>
        </Box>
      </MainContainer>
      <Footer />
    </>
  );
};

export default DateAndTimeSettings;
