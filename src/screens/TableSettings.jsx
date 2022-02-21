import React, { useEffect, useState } from "react";
import { Box, MainContainer } from "../components/UI";

import { CreateTableModal, Footer } from "../components";

import { Table } from "../components/TableSettings";
import axios from "axios";
import { useCookies } from "react-cookie";

import { API_URL } from "../config";

const TableSettings = () => {
  const [cookie, setCookies] = useCookies(["token"]);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [tables, setTables] = useState([]);
  useEffect(() => {
    axios
      .get(`${API_URL}/businesses/business`, {
        headers: {
          Authorization: "Bearer " + cookie.token,
        },
      })
      .then((res) => setTables(res.data[0].businessTables));
  }, []);

  return (
    <>
      <MainContainer title="Masa Ayarları">
        <Box>
          <div className="grid grid-cols-4 gap-8">
            {tables.map((table, index) => (
              <Table key={index} tableName={table.masaAdi} />
            ))}
          </div>
          <button
            className={`items-center disabled:bg-disabledColor disabled:text-textColor disabled:border-transparent justify-center flex px-4 py-2.5 transition-colors duration-300 hover:text-boxColor border-2 border-borderAndOtherRed hover:border-transparent hover:bg-textColor rounded-xl font-semibold text-base filter drop-shadow-md bg-primary-iki text-textColor bg-background"`}
          >
            Masa Ekle
          </button>
        </Box>
      </MainContainer>
      <CreateTableModal isOpen={modalIsOpen} setIsOpen={setModalIsOpen} />
      <Footer />
    </>
  );
};

export default TableSettings;
