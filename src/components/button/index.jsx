import React from "react";
import "./styles.scss";

const Button = ({ children, disabled, outlined, secondary, ...restProps }) => {
  return (
    <button
      disabled={disabled}
      className={`button ${outlined ? "button--outlined" : ""} ${
        secondary ? "button--secondary" : ""
      } `}
      {...restProps}
    >
      {children}
    </button>
  );
};

export default Button;
