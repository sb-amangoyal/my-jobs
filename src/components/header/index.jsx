import React from "react";
import { useHistory } from "react-router";
import "./styles.scss";

const Header = ({ ActionComponent }) => {
  const history = useHistory();
  return (
    <header className="header">
      <div className="header__content">
        <h1 className="header__logo" onClick={() => history.push("/")}>
          My<span>Jobs</span>
        </h1>
        <div className="header__actionComponent">{ActionComponent}</div>
      </div>
    </header>
  );
};

export default Header;
