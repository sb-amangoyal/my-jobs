import React from "react";
import "./styles.scss";

const Spinner = ({ size, color, ...restProps }) => {
  return (
    <div
      className={`loader loader--small 
      ${size === "medium" ? "loader--medium" : ""} 
        ${size === "large" ? "loader--large" : ""}
        ${color === "secondary" ? "loader--color-secondary" : ""}
         `}
      {...restProps}
    ></div>
  );
};

export default Spinner;
