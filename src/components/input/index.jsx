import React from "react";
import { Link } from "react-router-dom";
import "./style.scss";

const Input = ({
  required,
  placeholder,
  helperLink,
  helperLinkText,
  type,
  label,
  onChange,
  error,
  errorMessage,
  ...restProps
}) => {
  return (
    <div>
      <div className="inputLabelContainer">
        <label>{label}</label>
        {helperLinkText && <Link to={helperLink}>{helperLinkText}</Link>}
      </div>
      <input
        required={required}
        className={`input ${error && "input--invalid"}`}
        placeholder={placeholder}
        onChange={onChange}
        type={type}
        {...restProps}
      />
      <div className="inputErrorContainer">
        <p>{errorMessage}</p>
      </div>
    </div>
  );
};

export default Input;
