import React from "react";
import "./style.css";

const Cell = ({ data, onCellClick }) => {
  const renderClasses = () => {
    let classes = "cell";

    if (data.value === "x") return (classes += " bg-x");
    if (data.value === "o") return (classes += " bg-o");
    return classes;
  };

  return <div className={renderClasses()} onClick={onCellClick}></div>;
};

export default Cell;
