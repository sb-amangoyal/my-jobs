import { useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { routes } from "./routes/routes";
import CustomRoute from "./utils/CustomRoute";
import jwt from "jsonwebtoken";
import { connect } from "react-redux";
import { loginSuccess } from "./redux/user/action";

function App({ login }) {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      var decodedUserData = jwt.decode(token);
      login(decodedUserData);
    }
    console.log("object");
  }, [login]);

  return (
    <>
      <Switch>
        {routes.map((route) => (
          <CustomRoute
            key={route.path}
            path={route.path}
            component={route.component}
            authIsRequired={route.authIsRequired}
          ></CustomRoute>
        ))}
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (payload) => dispatch(loginSuccess(payload)),
  };
};

export default connect(null, mapDispatchToProps)(App);
