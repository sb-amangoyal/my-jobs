import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { Button, Header, Input, Spinner } from "../../components";
import { resetError, startForgotPassword } from "../../redux/user/action";
import "./styles.scss";

const ForgotPassword = (props) => {
  const { loading, resetValidationError, forgotPasswordError, forgotPassword } =
    props;

  const history = useHistory();

  // ************************* States ***********************************
  const [email, setEmail] = useState("");

  // ************************ Handlers **********************************
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (forgotPasswordError) resetValidationError();
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();

    const routeToResetPassword = (token) => {
      history.push(`/reset-password?token=${token}`);
    };

    forgotPassword({ email, routeToResetPassword });
  };

  return (
    <div className="forgotPassword">
      <div style={{ position: "relative", zIndex: "0" }}>
        <Header />
        <form
          className="forgotPassword__formCard"
          onSubmit={handleForgotPassword}
        >
          <h3>Forgot your password?</h3>
          <p>
            Enter the email associated with your account and we’ll send you
            instructions to reset your password.
          </p>

          <div className="forgotPassword__formInputWrapper">
            <Input
              required
              placeholder="Enter your email"
              label="Email address"
              type="email"
              value={email}
              error={!!forgotPasswordError}
              onChange={handleEmailChange}
            />
          </div>

          {forgotPasswordError?.message && (
            <p className="login__errorMessage">
              {forgotPasswordError?.message}
            </p>
          )}

          <div className="forgotPassword__formActionWrapper">
            <Button disabled={loading}>
              {loading ? <Spinner /> : "Submit"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

const mapStatesToProps = (state) => {
  return {
    forgotPasswordError: state.user.forgotPasswordError,
    loading: state.user.forgotPasswordLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    forgotPassword: (payload) => dispatch(startForgotPassword(payload)),
    resetValidationError: () => dispatch(resetError()),
  };
};

export default connect(mapStatesToProps, mapDispatchToProps)(ForgotPassword);
