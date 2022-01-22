import React from "react";
import { Box, MainContainer } from "../components/UI";

import { Footer } from "../components";

import { Table } from "../components/TableSettings";

const TableSettings = () => {
  const tableData = [
    {
      id: 1,
      name: "Masa 1",
    },
    {
      id: 2,
      name: "Masa 2",
    },
    {
      id: 3,
      name: "Masa 3",
    },
    {
      id: 4,
      name: "Masa 4",
    },
    {
      id: 5,
      name: "Masa 5",
    },
  ];
  return (
    <>
      <MainContainer title="Masa Ayarları">
        <Box>
          <div className="grid grid-cols-4 gap-8">
            {tableData.map((table) => (
              <Table key={table.id} tableName={table.name} />
            ))}
          </div>
        </Box>
      </MainContainer>
      <Footer />
    </>
  );
};

export default TableSettings;
