import React, { useState } from "react";
import moment from "moment";
import { Footer } from "../components";
import { Box } from "../components/UI";

const DateAndTimeSettings = () => {
  const [selectedDay, setSelectedDay] = useState([]);
  const [inputTime, setInputTime] = useState("");
  const [selectedTime, setSelectedTime] = useState([]);
  const days = [
    "Pazartesi",
    "Salı",
    "Çarşamba",
    "Perşembe",
    "Cuma",
    "Cumartesi",
    "Sunday",
  ];
  const handleSubmit = () => {
    alert(selectedDay);
  };
  /*const day = 0;
  console.log(moment().day(day).format("dddd"));
  */
  function getDaysArrayByMonth() {
    var daysInMonth = moment().daysInMonth();
    var arrDays = [];

    while (daysInMonth) {
      var current = moment().date(daysInMonth);
      arrDays.push(current);
      daysInMonth--;
    }

    var d = [];
    var schedule = arrDays;
    schedule.forEach((item) => {
      d.push(item.format("dddd"));
    });
    console.log(d.filter((item) => item === "Tuesday"));
  }

  getDaysArrayByMonth();

  return (
    <>
      <main className="py-16 font-Montserrat flex flex-col gap-16 items-center">
        <div className="flex w-3/4 flex-col gap-4 items-center justify-center">
          <h1 className="text-textColor font-bold">Date And Time Settings</h1>
          <Box>
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
                      ? "border-2 border-transparent px-4 py-2 rounded-lg text-boxColor bg-textColor duration-300 font-semibold"
                      : "border-2 border-borderAndOtherRed px-4 py-2 rounded-lg hover:border-transparent hover:bg-textColor hover:text-boxColor duration-300 font-semibold"
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
            <button
              disabled={selectedDay.length === 0}
              className="border-2 disabled:bg-disabledColor disabled:text-textColor disabled:border-transparent disabled:duration-200 disabled:transition-colors border-borderAndOtherRed px-6 py-2 rounded-lg text-textColor transition-colors duration-200 hover:bg-textColor hover:text-boxColor hover:border-transparent font-semibold"
              onClick={() => handleSubmit()}
            >
              Kaydet
            </button>
          </Box>
          <Box>
            <h1 className="text-textColor font-semibold">
              İşletmenize Uygun Randevu Saatlerini Yazın
            </h1>
            <div className="flex flex-col gap-4 w-full items-center">
              <input
                type="time"
                value={inputTime}
                onChange={(e) => setInputTime(e.target.value)}
                className="px-2 font-semibold py-1 border-2 border-transparent outline-none transition-colors duration-300 hover:border-borderAndOtherRed focus:border-borderAndOtherRed rounded-lg"
              />
              <div className="grid grid-cols-10 gap-4 justify-center">
                {selectedTime.map((time, index) => (
                  <div
                    className="flex items-center justify-center px-4 py-2 rounded-lg text-boxColor bg-textColor font-semibold border-2 border-transparent"
                    key={index}
                  >
                    {time}
                  </div>
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
            </div>
          </Box>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default DateAndTimeSettings;
