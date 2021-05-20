import { useEffect } from "react";
import { connect } from "react-redux";
import {
  Breadcrumb,
  Button,
  Header,
  HeaderAction,
  JobCard,
  Spinner,
} from "../../components";
import { requestAppliedJobs } from "../../redux/candidate/action";
import "./styles.scss";

const AppliedJobs = (props) => {
  const {
    loading,
    appliedJobs,
    appliedJobsCount,
    appliedJobsFetchError,
    getAppliedJobs,
  } = props;

  // ******************************* States *****************************

  // ******************************* useEffect ****************************
  useEffect(() => {
    getAppliedJobs({ page: 1 });
  }, [getAppliedJobs]);
  return (
    <div className="appliedJobs">
      <div style={{ position: "relative", zIndex: "0" }}>
        <Header
          ActionComponent={
            <HeaderAction linkText="Applied Jobs" link="/applied-jobs" />
          }
        />
        <div className="appliedJobs__content">
          <Breadcrumb page="Applied Jobs" />

          <h2>Jobs applied by you</h2>
          {loading ? (
            <div className="availableJobs__spinnerContainer">
              <Spinner color="secondary" size="medium" />
            </div>
          ) : appliedJobsFetchError ? (
            <div className="availableJobs__spinnerContainer">
              <p>Applied Jobs fetching Failed!</p>
              <Button onClick={() => getAppliedJobs({ page: 1 })}>Retry</Button>
            </div>
          ) : (
            <div className="appliedJobs__cardsContainer">
              {appliedJobs?.length === 0 ? (
                <div className="postedJobs__noContentContainer">
                  <p>Applied jobs will show here!</p>
                </div>
              ) : (
                appliedJobs?.map((item, index) => (
                  <JobCard
                    key={index}
                    title={item.title}
                    location={item.location}
                    description={item.description}
                  />
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStates = (state) => {
  return {
    loading: state.candidate.appliedJobsFetchLoading,
    appliedJobs: state.candidate.appliedJobs,
    appliedJobsFetchError: state.candidate.appliedJobsFetchError,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getAppliedJobs: (payload) => dispatch(requestAppliedJobs(payload)),
  };
};

export default connect(mapStates, mapDispatch)(AppliedJobs);
