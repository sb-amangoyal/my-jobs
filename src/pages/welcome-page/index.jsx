import React from "react";
import { useHistory } from "react-router";
import { Button, Header } from "../../components";
import "./styles.scss";

const WelcomePage = () => {
  const history = useHistory();

  return (
    <div className="welcomePage">
      <div style={{ position: "relative", zIndex: "0" }}>
        <Header
          ActionComponent={
            <Button outlined onClick={() => history.push("/login")}>
              Login/Signup
            </Button>
          }
        />
        <div className="welcomePage__banner">
          <div className="welcomePage__heading">
            <div>
              <h2>Welcome to</h2>
              <h1>
                My<span>Jobs</span>
              </h1>
              <Button onClick={() => history.push("/signup")}>
                Get Started
              </Button>
            </div>
          </div>
          <div className="welcomePage__img">
            <img
              src="https://previews.123rf.com/images/deklofenak/deklofenak1107/deklofenak110700029/9997054-young-beautiful-girl-with-a-laptop-at-home.jpg"
              alt="welcome"
            />
          </div>
        </div>

        <div className="welcomePage__whyUs">
          <h3>Why Us</h3>
          <div className="welcomePage__WhyUsCardsContainer">
            <div className="welcomePage__whyUsCard">
              <h3>
                Get More <br /> Visibilty
              </h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt.
              </p>
            </div>
            <div className="welcomePage__whyUsCard">
              <h3>
                Organize your <br /> candidates
              </h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
            <div className="welcomePage__whyUsCard">
              <h3>
                Verify their <br /> abilities
              </h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore.
              </p>
            </div>
          </div>
        </div>

        <div className="welcomePage__companiesLogo">
          <h2>companies who trust us</h2>
          <div className="welcomePage__CompaniesLogoContainer">
            <img
              src="https://leafletgroup.com/wp-content/uploads/24.png"
              alt="solaytic"
            ></img>
            <img
              src="https://workonlinehome.com/wp-content/uploads/2019/06/liva.png"
              alt="solaytic"
            ></img>
            <img
              src="https://leafletgroup.com/wp-content/uploads/24.png"
              alt="solaytic"
            ></img>
            <img
              src="https://workonlinehome.com/wp-content/uploads/2019/06/liva.png"
              alt="solaytic"
            ></img>
            <img
              src="https://leafletgroup.com/wp-content/uploads/24.png"
              alt="solaytic"
            ></img>
            <img
              src="https://workonlinehome.com/wp-content/uploads/2019/06/liva.png"
              alt="solaytic"
            ></img>
            <img
              src="https://leafletgroup.com/wp-content/uploads/24.png"
              alt="solaytic"
            ></img>
            <img
              src="https://workonlinehome.com/wp-content/uploads/2019/06/liva.png"
              alt="solaytic"
            ></img>
            <img
              src="https://leafletgroup.com/wp-content/uploads/24.png"
              alt="solaytic"
            ></img>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
