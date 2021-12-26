import React from "react";

const Meets = () => {
  return (
    <>
      <main className="py-16 font-Montserrat flex flex-col gap-16 items-center">
        <div className="w-11/12 gap-y-8 flex items-center justify-center flex-col rounded-xl bg-boxColor py-8">
          <h1 className="text-textColor font-bold text-xl">Randevular</h1>
          <div className="grid grid-cols-10">
            <div className="flex flex-col items-center gap-2 font-semibold bg-background text-textColor font-Montserrat px-6 py-6 rounded-lg">
              <div className="w-16 h-16 rounded-full bg-red-50" />
              <h1>Hakan Çelik</h1>
              <h1>26/12/2021</h1>
              <h1>16:30</h1>
              <button className="border-2 border-borderAndOtherRed px-4 py-2 rounded-lg text-sm font-semibold transition-colors hover:bg-textColor hover:border-transparent hover:text-boxColor">
                Detay
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Meets;
