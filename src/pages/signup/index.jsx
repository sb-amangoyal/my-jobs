import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { Button, Header, Input, Spinner } from "../../components";
import { resetError, startRegister } from "../../redux/user/action";
import RecruiterLogo from "../../assets/recruiter.svg";
import RecruiterSelectedLogo from "../../assets/recruiter-selected.svg";
import CandidateSelectedLogo from "../../assets/candidate-selected.svg";
import CandidateLogo from "../../assets/candidate.svg";

import "./styles.scss";
const Signup = (props) => {
  const { loading, registerError, registerUser, resetValidationError } = props;

  const history = useHistory();

  // ************************* States ***********************************
  const [profileType, setProfileType] = useState(0);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [skills, setSkills] = useState("");

  // ************************ Handlers **********************************

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (registerError) resetValidationError();
  };
  const handleFullNameChange = (e) => {
    setFullName(e.target.value);
    if (registerError) resetValidationError();
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (registerError) resetValidationError();
  };
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    if (registerError) resetValidationError();
  };
  const handleSkillsChange = (e) => {
    setSkills(e.target.value);
    if (registerError) resetValidationError();
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();

    const routeToLogin = () => {
      history.push("/login");
    };

    registerUser({
      routeToLogin,
      password,
      confirmPassword,
      userRole: profileType,
      email: email.trim(),
      skills: skills.trim(),
      name: fullName.trim(),
    });
  };

  return (
    <div className="signup">
      <div style={{ position: "relative", zIndex: "0" }}>
        <Header />
        <form className="signup__formCard" onSubmit={handleSignupSubmit}>
          <h3>Signup</h3>
          <div className="signup__formProfileTypeInputContainer">
            <label>I'm a*</label>
            <div className="signup__formProfileTypeInput">
              <div
                className={`profileTypeCard ${profileType === 0 && "selected"}`}
                onClick={() => setProfileType(0)}
              >
                <img
                  src={
                    profileType === 0 ? RecruiterSelectedLogo : RecruiterLogo
                  }
                  alt="R"
                ></img>
                {/* <RecruiterLogo /> */}
                <p>Recruiter</p>
              </div>
              <div
                className={`profileTypeCard ${profileType === 1 && "selected"}`}
                onClick={() => setProfileType(1)}
              >
                <img
                  src={
                    profileType === 1 ? CandidateSelectedLogo : CandidateLogo
                  }
                  alt="C"
                ></img>
                <p>Candidate</p>
              </div>
            </div>
          </div>
          <div className="signup__formInputWrapper">
            <Input
              required
              placeholder="Enter your full name*"
              label="Full Name*"
              type="text"
              value={fullName}
              error={!!registerError?.errors?.name}
              errorMessage={registerError?.errors?.name}
              onChange={handleFullNameChange}
            />
          </div>
          <div className="signup__formInputWrapper">
            <Input
              required
              type="email"
              placeholder="Enter your email"
              label="Email address*"
              value={email}
              error={!!registerError?.errors?.email}
              errorMessage={registerError?.errors?.email}
              onChange={handleEmailChange}
            />
          </div>
          <div className="signup__formPasswordInputContainer">
            <div className="signup__formInputWrapper">
              <Input
                required
                placeholder="Enter your password"
                label="Create Password*"
                type="password"
                value={password}
                error={!!registerError?.errors?.password}
                errorMessage={registerError?.errors?.password}
                onChange={handlePasswordChange}
              />
            </div>
            <div className="signup__formInputWrapper">
              <Input
                required
                placeholder="Enter your password"
                label="Confirm Password*"
                type="password"
                error={!!registerError?.errors?.confirmPassword}
                errorMessage={registerError?.errors?.confirmPassword}
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
            </div>
          </div>

          <div className="signup__formInputWrapper">
            <Input
              placeholder="Enter comma separated skills"
              label="Skills*"
              type="text"
              value={skills}
              error={!!registerError?.errors?.skills}
              errorMessage={registerError?.errors?.skills}
              onChange={handleSkillsChange}
            />
          </div>
          {registerError?.message && (
            <p className="login__errorMessage">{registerError?.message}</p>
          )}
          <div className="signup__formActionWrapper">
            <Button disabled={loading}>
              {loading ? <Spinner /> : "Signup"}
            </Button>
          </div>

          <div className="signup__createAccountLinkWrapper">
            <p>
              Have an account? <Link to="/login">Login</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

const mapStatesToProps = (state) => {
  return {
    registerError: state.user.registerError,
    loading: state.user.registerLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    registerUser: (payload) => dispatch(startRegister(payload)),
    resetValidationError: () => dispatch(resetError()),
  };
};

export default connect(mapStatesToProps, mapDispatchToProps)(Signup);
