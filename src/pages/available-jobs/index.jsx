import { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  Breadcrumb,
  Button,
  Dialog,
  Header,
  HeaderAction,
  JobCard,
  Pagination,
  Spinner,
} from "../../components";
import {
  requestApplyJob,
  requestAvailableJobs,
} from "../../redux/candidate/action";
import EmptyLogo from "../../assets/empty.svg";
import "./styles.scss";

const AvailableJobs = (props) => {
  const {
    getAvailableJobs,
    availableJobs,
    loading,
    availableJobsFetchError,
    availableJobsCount,
    applyToJob,
    applyJobLoading,
  } = props;

  // ************************** State **********************************
  const [openDialog, setOpenDialog] = useState(false);
  const [jobDetails, setJobDetails] = useState({
    name: "",
    description: "",
    location: "",
  });

  // ************************** handlers **********************************
  const handleViewApplication = (item) => {
    setJobDetails({
      title: item.title,
      description: item.description,
      location: item.location,
      id: item.id,
    });
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handlePaginationChange = (page) => {
    getAvailableJobs({ page: page.selected + 1 });
  };

  const handleApplyJob = (e) => {
    e.preventDefault();
    applyToJob({ id: jobDetails.id, handleDialogClose });
  };

  // ******************************* useEffect ****************************
  useEffect(() => {
    getAvailableJobs({ page: 1 });
  }, [getAvailableJobs]);

  return (
    <div className="availableJobs">
      <div className="availableJobs__mainContainer">
        <Header
          ActionComponent={
            <HeaderAction linkText="Applied Jobs" link="/applied-jobs" />
          }
        />
        <div className="availableJobs__content">
          <Breadcrumb />

          <h2>Jobs for you</h2>
          {loading ? (
            <div className="availableJobs__spinnerContainer">
              <Spinner color="secondary" size="medium" />
            </div>
          ) : availableJobsFetchError ? (
            <div className="availableJobs__spinnerContainer">
              <p>Available Jobs fetching Failed!</p>
              <Button onClick={() => getAvailableJobs({ page: 1 })}>
                Retry
              </Button>
            </div>
          ) : (
            <div className="availableJobs__cardsContainer">
              {availableJobsCount === 0 ? (
                <div className="postedJobs__noContentContainer">
                  <img src={EmptyLogo} alt="empty" />
                  <p>Available jobs will show here!</p>
                </div>
              ) : (
                availableJobs?.map((item, index) => (
                  <JobCard
                    key={index}
                    title={item.title}
                    location={item.location}
                    buttonText="Apply"
                    description={item.description}
                    buttonHandler={() => handleViewApplication(item)}
                  />
                ))
              )}
            </div>
          )}
        </div>

        {availableJobsCount !== 0 && (
          <div className="availableJobs__paginationContainer">
            <Pagination
              pageCount={
                availableJobsCount % 20 === 0
                  ? parseInt(availableJobsCount / 20)
                  : parseInt(availableJobsCount / 20) + 1
              }
              onPageChange={handlePaginationChange}
            />
          </div>
        )}
      </div>

      {openDialog && (
        <Dialog title="Apply for this job" onClose={handleDialogClose}>
          <div className="availableJobs__dialogContent">
            <p>Are you sure you want to apply for this job?</p>
            <p>
              <b>Title:</b> {jobDetails.title}
            </p>
            <p>
              <b>Description:</b> {jobDetails.description}
            </p>
            <p>
              <b>Location:</b> {jobDetails.location}
            </p>
          </div>
          <div className="availableJobs__dialogAction">
            <Button
              secondary
              disabled={applyJobLoading}
              onClick={handleDialogClose}
            >
              No
            </Button>
            <Button
              secondary
              disabled={applyJobLoading}
              onClick={handleApplyJob}
            >
              {applyJobLoading ? <Spinner color="secondary" /> : "Yes"}
            </Button>
          </div>
        </Dialog>
      )}
    </div>
  );
};

const mapStates = (state) => {
  return {
    loading: state.candidate.availableJobsFetchLoading,
    availableJobs: state.candidate.availableJobs,
    availableJobsCount: state.candidate.availableJobsCount,
    availableJobsFetchError: state.candidate.availableJobsFetchError,

    applyJobLoading: state.candidate.applyJobLoading,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getAvailableJobs: (payload) => dispatch(requestAvailableJobs(payload)),
    applyToJob: (payload) => dispatch(requestApplyJob(payload)),
  };
};

export default connect(mapStates, mapDispatch)(AvailableJobs);
