import React, { useState } from "react";
import moment from "moment";
import Footer from "../components/Footer";

const DateAndTimeSettings = () => {
  const [selectedDay, setSelectedDay] = useState([]);
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
          <div className="w-3/4 gap-y-4 flex items-center justify-center flex-col rounded-xl bg-boxColor py-8">
            <h1 className="text-textColor font-semibold">
              İşletmenizin Açık Olduğu Günleri Seçiniz
            </h1>
            <div className="flex gap-8 w-full text-textColor items-center justify-center">
              {days.map((day) => (
                <button
                  key={day}
                  onClick={(e) => {
                    setSelectedDay(
                      selectedDay.includes(day)
                        ? selectedDay.filter((item) => item !== day)
                        : (oncekiState) => [...oncekiState, day]
                    );
                  }}
                  className={`${
                    selectedDay.includes(day)
                      ? "border-2 border-transparent px-4 py-2 rounded-lg text-boxColor bg-textColor duration-200 font-semibold"
                      : "border-2 border-borderAndOtherRed px-4 py-2 rounded-lg hover:border-transparent hover:bg-textColor hover:text-boxColor duration-200 font-semibold"
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>
          <button
            disabled={selectedDay.length === 0}
            className="border-2 disabled:bg-disabledColor disabled:text-textColor disabled:border-transparent disabled:duration-200 disabled:transition-colors border-borderAndOtherRed px-6 py-2 rounded-lg text-textColor transition-colors duration-200 hover:bg-textColor hover:text-boxColor hover:border-transparent font-semibold"
            onClick={() => handleSubmit()}
          >
            Kaydet
          </button>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default DateAndTimeSettings;
