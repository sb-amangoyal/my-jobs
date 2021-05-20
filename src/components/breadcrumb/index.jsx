import React from "react";
import "./styles.scss";
import Home from "../../assets/home.svg";
import { Link } from "react-router-dom";

const Breadcrumb = ({ page }) => {
  return (
    <div className="breadcrumb">
      <img src={Home} alt="H"></img>
      <Link to="/home"> Home </Link>
      {page && (
        <p>
          {">"} &nbsp;{page}
        </p>
      )}
    </div>
  );
};

export default Breadcrumb;
