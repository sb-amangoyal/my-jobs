import React from "react";
import { connect } from "react-redux";
import { AvailableJobs, PostedJobs } from "..";

const Home = ({ user }) => {
  return (
    <div>
      {user ? user.userRole ? <AvailableJobs /> : <PostedJobs /> : null}
    </div>
  );
};

const mapState = (state) => {
  return {
    user: state.user.userData,
  };
};

const mapDispatch = (dispatch) => {
  return {};
};

export default connect(mapState, mapDispatch)(Home);
