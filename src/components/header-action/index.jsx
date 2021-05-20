import React from "react";
import { connect } from "react-redux";
import { Avatar, HeaderLink } from "..";
import "./styles.scss";

const HeaderAction = ({ user, linkText, link, ...restProps }) => {
  return (
    <div className="headerAction" {...restProps}>
      <HeaderLink className="headerAction__link" to={link}>
        {linkText}
      </HeaderLink>
      <Avatar> {user?.name[0]?.toUpperCase()}</Avatar>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user.userData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderAction);
