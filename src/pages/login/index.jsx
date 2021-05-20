import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Button, Header, Input, Spinner } from "../../components";
import { connect } from "react-redux";

import "./styles.scss";
import { resetError, startLogin } from "../../redux/user/action";

const Login = (props) => {
  const { loginUser, loginError, resetValidationError, loading } = props;

  const history = useHistory();

  // ************************* States ***********************************
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ************************ Handlers **********************************

  const handleEmailChange = (e) => {
    if (loginError) {
      resetValidationError();
    }

    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    if (loginError) {
      resetValidationError();
    }

    setPassword(e.target.value);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    const routeToHome = () => {
      history.push("/home");
    };

    loginUser({ email: email.trim(), password, routeToHome });
  };

  return (
    <div className="login">
      <div style={{ position: "relative", zIndex: "0" }}>
        <Header />
        <form className="login__formCard" onSubmit={handleLoginSubmit}>
          <h3>Login</h3>
          <div className="login__formInputWrapper">
            <Input
              required
              placeholder="Email address"
              label="Email address"
              type="email"
              error={loginError}
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div className="login__formInputWrapper">
            <Input
              required
              helperLinkText="Forgot your password?"
              helperLink="/forgot-password"
              placeholder="Enter your password"
              label="Password"
              type="password"
              error={loginError}
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          {loginError?.message && (
            <p className="login__errorMessage">{loginError?.message}</p>
          )}
          <div className="login__formActionWrapper">
            <Button disabled={loading}>
              {loading ? <Spinner /> : "Login"}
            </Button>
          </div>

          <div className="login__createAccountLinkWrapper">
            <p>
              New to MyJobs? <Link to="/signup">Create an account</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

const mapStatesToProps = (state) => {
  return {
    loginError: state.user.loginError,
    loading: state.user.loginLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: (payload) => dispatch(startLogin(payload)),
    resetValidationError: () => dispatch(resetError()),
  };
};

export default connect(mapStatesToProps, mapDispatchToProps)(Login);
