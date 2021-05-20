import React from "react";
import { Redirect, Route } from "react-router";

const CustomRoute = (props) => {
  const { authIsRequired } = props;
  const isAuthenticated = localStorage.getItem("token") != null;

  if (!isAuthenticated && authIsRequired) {
    return <Redirect to="/login" />;
  }

  if (isAuthenticated && !authIsRequired) {
    return <Redirect to="/home" />;
  }

  return <Route {...props} />;
};

export default CustomRoute;
