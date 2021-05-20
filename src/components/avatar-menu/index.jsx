import React, { useState } from "react";
import "./styles.scss";
import ArrowDownIcon from "../../assets/arrow-icon.svg";
import { connect } from "react-redux";
import { logout } from "../../redux/user/action";
import { useHistory } from "react-router";

const Avatar = ({ children, logoutUser, ...restProps }) => {
  const history = useHistory();

  const [openMenu, setOpenMenu] = useState(false);

  const handleLogout = () => {
    logoutUser();
    history.push("/login");
  };

  return (
    <div className="avatarMenu">
      <div className="avatar" onClick={() => setOpenMenu(!openMenu)}>
        <div className="avatar__circle" {...restProps}>
          <p> {children}</p>
        </div>
        <div className="avatar__menuIcon">
          <img src={ArrowDownIcon} alt="arrow-down" />
        </div>
      </div>
      <div className={`menu ${openMenu ? "show-menu" : ""}`}>
        <ul>
          <li onClick={handleLogout}>Logout</li>
        </ul>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    logoutUser: () => dispatch(logout()),
  };
};

export default connect(null, mapDispatchToProps)(Avatar);
