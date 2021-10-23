import React from "react";
import "./style.css";

const HistoryList = ({ history, onHistoryClick }) => {
  return (
    <div className="history">
      <ul className="history-list">
        {history.map((item, index) => (
          <li key={index} onClick={() => onHistoryClick(item, index)}>
            Go To Move #{index + 1}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HistoryList;
