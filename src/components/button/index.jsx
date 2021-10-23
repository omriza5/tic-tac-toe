import React from "react";
import "./style.css";

const Button = ({ value, onButtonClick }) => {
  return (
    <input
      className="btn"
      type="submit"
      value={value}
      onClick={onButtonClick}
    />
  );
};

export default Button;
