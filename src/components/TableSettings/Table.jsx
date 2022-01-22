import React from "react";

const Table = (props) => {
  return (
    <div className="flex flex-col items-center gap-2 group rounded-lg p-2 border-2 border-background hover:cursor-pointer">
      <div className="flex gap-4">
        <div className="w-16 h-2 bg-background transition-colors duration-300 group-hover:bg-textColor" />
        <div className="w-16 h-2 bg-background transition-colors duration-300 group-hover:bg-textColor" />
      </div>
      <div className="w-60 h-32 border-4 flex items-center justify-center rounded-lg border-background transition-colors duration-300 group-hover:bg-textColor">
        <h1 className="text-textColor transition-colors duration-300 font-semibold text-sm group-hover:text-background">
          {props.tableName}
        </h1>
      </div>
      <div className="flex gap-4">
        <div className="w-16 h-2 bg-background transition-colors duration-300 group-hover:bg-textColor" />
        <div className="w-16 h-2 bg-background transition-colors duration-300 group-hover:bg-textColor" />
      </div>
    </div>
  );
};

export default Table;
