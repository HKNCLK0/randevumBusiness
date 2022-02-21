import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import Modal from "react-modal";
import { API_URL } from "../config";

const TableModal = (props) => {
  const [cookie, setCookies] = useCookies(["token"]);

  const { isOpen, setIsOpen } = props;

  const [success, setSuccess] = useState(false);

  const [tables, setTables] = useState([]);

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
  };

  useEffect(() => {
    axios
      .get(`${API_URL}/tables/get-tables`, {
        headers: {
          Authorization: "Bearer " + cookie.token,
        },
      })
      .then((res) => setTables(res.data));
  }, []);

  const handleDeleteTable = (props) => {
    axios
      .post(
        `${API_URL}/tables/delete`,
        { tableID: props._id },
        {
          headers: {
            Authorization: "Bearer " + cookie.token,
          },
        }
      )
      .then((res) => {
        setSuccess(true);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      });
  };

  Modal.setAppElement("#root");

  return tables.map((table) => (
    <Modal
      isOpen={isOpen}
      shouldCloseOnOverlayClick={false}
      onRequestClose={closeModal}
      style={customStyles}
    >
      <div className="font-Montserrat w-2/3 flex flex-col items-center gap-6 text-center">
        <div className="flex flex-col gap-2">
          <h1 className="text-textColor font-bold text-xl">
            {table.tableName}
          </h1>
          <h1
            className={`${
              success
                ? "border-2 px-16 py-2 rounded-lg text-green-500 font-semibold text-sm border-green-500"
                : "hidden"
            }`}
          >
            Masa Başarıyla Silindi
          </h1>
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="text-textColor font-semibold">
            {table.tablePeopleCount} Kişi
          </h1>
          <span>
            {table.tableFeatures.map((feature) => (
              <li className="text-textColor font-semibold">{feature}</li>
            ))}
          </span>
        </div>
      </div>
      <div className="flex gap-4 font-Montserrat">
        <button
          onClick={() => closeModal()}
          className="text-textColor font-medium text-base border-2 px-6 rounded-lg border-disabledColor hover:border-transparent transition-colors duration-300 hover:text-textColor hover:bg-disabledColor py-2"
        >
          Çıkış
        </button>
        <button
          onClick={() => handleDeleteTable(table)}
          className="border-2 px-4 py-2 rounded-lg border-borderAndOtherRed text-borderAndOtherRed font-semibold transition-colors duration-300 hover:bg-textColor"
        >
          Masayi Sil
        </button>
      </div>
    </Modal>
  ));
};

export default TableModal;
