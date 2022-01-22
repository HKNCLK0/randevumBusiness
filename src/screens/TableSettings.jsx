import React, { useState } from "react";
import { Box, MainContainer } from "../components/UI";

import { Footer } from "../components";

import { Table } from "../components/TableSettings";

const TableSettings = () => {
  const [tableCount, setTableCount] = useState(1);

  const tableData = [];

  for (var i = 1; i < tableCount; i += 1) {
    tableData.push({
      id: i,
      name: `Masa ${i}`,
    });
  }
  return (
    <>
      <MainContainer title="Masa Ayarları">
        <Box>
          <button
            onClick={() => setTableCount(tableCount + 1)}
            className="text-textColor font-semibold border-2 border-textColor px-4 py-2 rounded-lg"
          >
            Add Table
          </button>
          <div className="grid grid-cols-4 gap-8">
            {tableData.map((table, index) => (
              <Table key={index} tableName={table.name} />
            ))}
          </div>
          <button
            disabled={tableCount <= 1}
            className={`items-center disabled:bg-disabledColor disabled:text-textColor disabled:border-transparent justify-center flex px-4 py-2.5 transition-colors duration-300 hover:text-boxColor border-2 border-borderAndOtherRed hover:border-transparent hover:bg-textColor rounded-xl font-semibold text-base filter drop-shadow-md bg-primary-iki text-textColor bg-background"`}
          >
            Kaydet
          </button>
        </Box>
      </MainContainer>
      <Footer />
    </>
  );
};

export default TableSettings;
