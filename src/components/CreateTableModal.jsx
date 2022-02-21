import axios from "axios";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import Modal from "react-modal";
import { API_URL } from "../config";

const CreateTableModal = (props) => {
  const [cookie, setCookies] = useCookies(["token"]);
  const { isOpen, setIsOpen } = props;

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#222020",
      width: "50%",
      height: "60%",
      borderRadius: "20px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-between",
      border: "0px",
      boxShadow: "0px 5px 15px 0px rgba(0,0,0,0.6)",
    },
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(240, 255, 255, 0.65)",
      backdropFilter: "blur(8px)",
    },
  };

  const closeModal = () => {
    setIsOpen(false);
    window.location.reload();
  };
  Modal.setAppElement("#root");

  const [tableName, setTableName] = useState("");
  const [tablePeopleCount, setTablePeopleCount] = useState("");
  const [ozellik, setOzellik] = useState("");
  const [tableFeatures, setTableFeatures] = useState([]);

  const [success, setSuccess] = useState(false);

  const handleSave = () => {
    axios
      .post(
        `${API_URL}/tables/create`,
        {
          tableName,
          tablePeopleCount,
          tableFeatures,
        },
        {
          headers: {
            Authorization: "Bearer " + cookie.token,
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          setSuccess(true);
          clearInputs();
        }
      });
  };
  const clearInputs = () => {
    setTableName("");
    setTablePeopleCount("");
    setOzellik("");
    setTableFeatures("");
  };
  return (
    <Modal
      isOpen={isOpen}
      shouldCloseOnOverlayClick={false}
      onRequestClose={closeModal}
      style={customStyles}
    >
      <div className="font-Montserrat w-2/3 flex flex-col items-center gap-6 text-center">
        <div className="flex flex-col gap-2">
          <h1 className="text-textColor font-bold text-xl">Masa Ekle</h1>
          <h1
            className={`${
              success
                ? "border-2 px-16 py-2 rounded-lg text-green-500 font-semibold text-sm border-green-500"
                : "hidden"
            }`}
          >
            Masa Başarıyla Eklendi
          </h1>
        </div>
        <div className="w-full flex flex-col items-center gap-4">
          <input
            value={tableName}
            onChange={(e) => setTableName(e.target.value)}
            className="w-1/2 h-10 border-2 rounded-lg border-transparent transition-colors duration-200 focus:border-borderAndOtherRed outline-none text-sm px-2 font-semibold"
            placeholder="Masa Adı"
            type="text"
          />
          <input
            value={tablePeopleCount}
            onChange={(e) => setTablePeopleCount(e.target.value)}
            className="w-1/3 h-10 border-2 rounded-lg border-transparent transition-colors duration-200 focus:border-borderAndOtherRed outline-none text-sm px-2 font-semibold"
            placeholder="Kişi Sayısı"
            type="text"
          />
          <div className="flex w-full justify-center gap-4">
            <input
              value={ozellik}
              onChange={(e) => setOzellik(e.target.value)}
              className="w-1/2 h-10 ml-20 border-2 rounded-lg border-transparent transition-colors duration-300 focus:border-borderAndOtherRed outline-none text-sm px-2 font-semibold"
              placeholder="Masa Özellikleri"
              type="text"
            />
            <button
              onClick={() => setTableFeatures([...tableFeatures, ozellik])}
              className="text-sm border-2 border-borderAndOtherRed text-textColor font-semibold px-4 rounded-lg transition-colors duration-300 hover:border-transparent hover:bg-textColor hover:text-background"
            >
              Ekle
            </button>
          </div>
          <div className="pb-2">
            {tableFeatures.length
              ? tableFeatures.map((mappedOzellik, index) => (
                  <div key={index} className="flex flex-col gap-1">
                    <li className="text-textColor">{mappedOzellik}</li>
                  </div>
                ))
              : ""}
          </div>
        </div>
      </div>
      <div className="flex gap-4">
        <button
          onClick={() => closeModal()}
          className="text-textColor font-Montserrat font-medium text-base border-2 px-6 rounded-lg border-disabledColor hover:border-transparent transition-colors duration-300 hover:text-textColor hover:bg-disabledColor py-2"
        >
          Çıkış
        </button>
        <button
          disabled={!tableName || !tablePeopleCount || !tableFeatures.length}
          onClick={() => handleSave()}
          className="text-textColor disabled:bg-disabledColor disabled:border-transparent disabled:text-textColor disabled:cursor-not-allowed font-Montserrat font-medium text-base border-2 px-6 rounded-lg border-borderAndOtherRed hover:border-transparent transition-colors duration-300 hover:text-boxColor hover:bg-textColor py-2"
        >
          Kaydet
        </button>
      </div>
    </Modal>
  );
};

export default CreateTableModal;
