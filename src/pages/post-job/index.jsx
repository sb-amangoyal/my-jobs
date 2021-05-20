import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  Breadcrumb,
  Button,
  Header,
  HeaderAction,
  Input,
  Spinner,
} from "../../components";
import { requestPostJob } from "../../redux/recruiter/action";
import "./styles.scss";

const PostJob = (props) => {
  const { postJobError, loading, postNewJob } = props;

  const history = useHistory();

  // ************************* States ***********************************
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [jobLocation, setJobLocation] = useState("");

  // ************************ Handlers **********************************
  const handlePostJob = (e) => {
    e.preventDefault();

    const routeToHome = () => {
      history.push("/home");
    };

    postNewJob({
      routeToHome,
      title: jobTitle.trim(),
      description: jobDescription.trim(),
      location: jobLocation.trim(),
    });
  };

  return (
    <div className="postJob">
      <div style={{ position: "relative" }}>
        <Header
          ActionComponent={
            <HeaderAction link="/post-job" linkText="Post a Job" />
          }
        />

        <div className="postJob__content">
          <Breadcrumb page="Post a Job" />
          <form className="postJob__formCard" onSubmit={handlePostJob}>
            <h2>Post a Job</h2>
            <div className="postJob__formInputWrapper">
              <Input
                required
                placeholder="Enter job title"
                label="Job title*"
                type="text"
                value={jobTitle}
                error={!!postJobError?.errors?.title}
                errorMessage={postJobError?.errors?.title}
                onChange={(e) => setJobTitle(e.target.value)}
              />
            </div>

            <div className="postJob__formInputWrapper">
              <Input
                required
                placeholder="Enter job description"
                label="Description*"
                type="textarea"
                value={jobDescription}
                error={!!postJobError?.errors?.description}
                errorMessage={postJobError?.errors?.description}
                onChange={(e) => setJobDescription(e.target.value)}
              />
            </div>

            <div className="postJob__formInputWrapper">
              <Input
                required
                placeholder="Enter location"
                label="Location*"
                type="text"
                value={jobLocation}
                error={!!postJobError?.errors?.location}
                errorMessage={postJobError?.errors?.location}
                onChange={(e) => setJobLocation(e.target.value)}
              />
            </div>
            {postJobError?.message && (
              <p className="login__errorMessage">{postJobError?.message}</p>
            )}
            <div className="postJob__formActionWrapper">
              <Button disabled={loading}>
                {loading ? <Spinner /> : "Post"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const mapStates = (state) => {
  return {
    loading: state.recruiter.postJobLoading,
    postJobError: state.recruiter.postJobError,
  };
};

const mapDispatch = (dispatch) => {
  return {
    postNewJob: (payload) => dispatch(requestPostJob(payload)),
  };
};

export default connect(mapStates, mapDispatch)(PostJob);
