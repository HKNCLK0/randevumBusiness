import React, { useEffect, useState } from "react";
import { Box, MainContainer } from "../components/UI";

import { CreateTableModal, Footer, TableModal } from "../components";

import axios from "axios";
import { useCookies } from "react-cookie";

import { API_URL } from "../config";

import Modal from "react-modal";

const TableSettings = () => {
  const [cookie, setCookies] = useCookies(["token"]);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [tableModal, setTableModal] = useState(false);

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
    setTableModal(false);
  };

  Modal.setAppElement("#root");

  useEffect(() => {
    axios
      .get(`${API_URL}/tables/get-tables`, {
        headers: {
          Authorization: "Bearer " + cookie.token,
        },
      })
      .then((res) => setTables(res.data));
  }, []);

  return (
    <>
      <MainContainer title="Masa Ayarları">
        <Box>
          <div className="grid grid-cols-4 gap-8">
            {tables.map((table, index) => (
              <button
                onClick={() => setTableModal(true)}
                className="flex flex-col items-center gap-2 group rounded-lg p-2 border-2 border-background hover:cursor-pointer"
              >
                <div className="flex gap-4">
                  <div className="w-16 h-2 bg-background transition-colors duration-300 group-hover:bg-textColor" />
                  <div className="w-16 h-2 bg-background transition-colors duration-300 group-hover:bg-textColor" />
                </div>
                <div className="w-60 h-32 border-4 flex items-center justify-center rounded-lg border-background transition-colors duration-300 group-hover:bg-textColor">
                  <h1 className="text-textColor transition-colors duration-300 font-semibold text-sm group-hover:text-background">
                    {table.tableName}
                  </h1>
                </div>
                <div className="flex gap-4">
                  <div className="w-16 h-2 bg-background transition-colors duration-300 group-hover:bg-textColor" />
                  <div className="w-16 h-2 bg-background transition-colors duration-300 group-hover:bg-textColor" />
                </div>
              </button>
            ))}
          </div>
          <button
            onClick={() => setModalIsOpen(true)}
            className={`items-center disabled:bg-disabledColor disabled:text-textColor disabled:border-transparent justify-center flex px-4 py-2.5 transition-colors duration-300 hover:text-boxColor border-2 border-borderAndOtherRed hover:border-transparent hover:bg-textColor rounded-xl font-semibold text-base filter drop-shadow-md bg-primary-iki text-textColor bg-background"`}
          >
            Masa Ekle
          </button>
        </Box>
      </MainContainer>
      <CreateTableModal isOpen={modalIsOpen} setIsOpen={setModalIsOpen} />
      <TableModal isOpen={tableModal} setIsOpen={setTableModal} />
      <Footer />
    </>
  );
};

export default TableSettings;
