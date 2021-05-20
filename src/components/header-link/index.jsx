import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./styles.scss";

const HeaderLink = ({ to, children, ...restProps }) => {
  const [active, setActive] = useState(false);

  const path = window.location.pathname;

  useEffect(() => {
    if (path === to) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [path, to]);

  return (
    <div className={`headerLink ${active ? "active-link" : ""}`}>
      <Link to={to} {...restProps}>
        {children}
      </Link>
      {active && <div className="headerLink__ActiveBar"> </div>}
    </div>
  );
};

export default HeaderLink;
