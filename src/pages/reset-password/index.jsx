import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory, useLocation } from "react-router";
import { Button, Header, Input, Spinner } from "../../components";
import { resetError, startResetPassword } from "../../redux/user/action";
import axiosInstance from "../../utils/axios";
import "./styles.scss";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const ResetPassword = (props) => {
  const query = useQuery();
  const history = useHistory();

  const token = query.get("token");

  const { loading, resetPasswordError, resetPassword, resetValidationError } =
    props;

  // ************************* States ***********************************
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isValid, setIsValid] = useState(false);
  const [isValidating, setIsValidating] = useState(true);

  // *******************************************************************
  useEffect(() => {
    const call = async () => {
      try {
        await axiosInstance.get(`/auth/resetpassword/${token}`);
        setIsValid(true);
      } catch (err) {
        setIsValid(false);
      }
      setIsValidating(false);
    };

    call();
  }, [token]);

  // ************************ Handlers **********************************

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (resetPasswordError) resetValidationError();
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    if (resetPasswordError) resetValidationError();
  };

  const handleResetPassword = (e) => {
    e.preventDefault();

    const routeToLogin = () => {
      history.push("/login");
    };

    resetPassword({
      password,
      confirmPassword,
      token,
      routeToLogin,
    });
  };

  return (
    <div className="resetPassword">
      <div style={{ position: "relative", zIndex: "0" }}>
        <Header />
        <form
          className="resetPassword__formCard"
          onSubmit={handleResetPassword}
        >
          {isValidating ? (
            <div className="resetPassword__spinnerContainer">
              <Spinner size="large" color="secondary" />
            </div>
          ) : isValid ? (
            <>
              <h3>Reset Your Password</h3>
              <p>Reset Your Password</p>
              <div className="resetPassword__formInputWrapper">
                <Input
                  required
                  placeholder="Enter your password"
                  label="New password"
                  type="password"
                  error={resetPasswordError}
                  value={password}
                  onChange={handlePasswordChange}
                />
              </div>
              <div className="resetPassword__formInputWrapper">
                <Input
                  required
                  placeholder="Enter your password"
                  label="Confirm new password"
                  type="password"
                  error={resetPasswordError}
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                />
              </div>
              {resetPasswordError?.message && (
                <p className="login__errorMessage">
                  {resetPasswordError?.message}
                </p>
              )}
              <div className="resetPassword__formActionWrapper">
                <Button disabled={loading}>
                  {loading ? <Spinner /> : "Reset"}
                </Button>
              </div>
            </>
          ) : (
            <div className="resetPassword__linkExpireContainer">
              <h1>Link Expired</h1>
              <p>Reset your password again</p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

const mapStatesToProps = (state) => {
  return {
    resetPasswordError: state.user.resetPasswordError,
    loading: state.user.resetPasswordLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    resetPassword: (payload) => dispatch(startResetPassword(payload)),
    resetValidationError: () => dispatch(resetError()),
  };
};

export default connect(mapStatesToProps, mapDispatchToProps)(ResetPassword);
