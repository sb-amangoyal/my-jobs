import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
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
  requestJobApplicants,
  requestPostedJobs,
} from "../../redux/recruiter/action";
import EmptyLogo from "../../assets/empty.svg";
import "./styles.scss";

const PostedJobs = (props) => {
  const {
    loading,
    postedJobs,
    postedJobsCount,
    getPostedJobs,
    jobApplicants,
    getJobApplicants,
    jobApplicantsFetchLoading,
    postedJobsFetchError,
  } = props;

  const history = useHistory();

  // ************************** State **********************************
  const [openDialog, setOpenDialog] = useState(false);

  // ************************** handlers **********************************
  const handleViewApplication = (item) => {
    getJobApplicants({ id: item.id });
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handlePaginationChange = (page) => {
    getPostedJobs({ page });
  };

  // ******************************* useEffect ****************************
  useEffect(() => {
    getPostedJobs({ page: 1 });
  }, [getPostedJobs]);

  return (
    <div className="postedJobs">
      <div className="postedJobs__mainContainer">
        <Header
          ActionComponent={
            <HeaderAction linkText="Post a Job" link="/post-job" />
          }
        />
        <div className="postedJobs__content">
          <Breadcrumb />

          <h2>Jobs posted by you</h2>
          {loading ? (
            <div className="postedJobs__spinnerContainer">
              <Spinner color="secondary" size="medium" />
            </div>
          ) : postedJobsFetchError ? (
            <div className="availableJobs__spinnerContainer">
              <p>Posted jobs fetching Failed!</p>
              <Button onClick={() => getPostedJobs({ page: 1 })}>Retry</Button>
            </div>
          ) : (
            <div className="postedJobs__cardsContainer">
              {postedJobsCount === 0 ? (
                <div className="postedJobs__noContentContainer">
                  <img src={EmptyLogo} alt="empty" />
                  <p>Your posted jobs will show here!</p>
                  <Button onClick={() => history.push("/post-job")}>
                    Post a Job
                  </Button>
                </div>
              ) : (
                postedJobs?.map((item, index) => (
                  <JobCard
                    key={index}
                    title={item.title}
                    location={item.location}
                    buttonText="View Applications"
                    description={item.description}
                    buttonHandler={() => handleViewApplication(item)}
                  />
                ))
              )}
            </div>
          )}
        </div>

        {postedJobsCount !== 0 && (
          <div className="postedJobs__paginationContainer">
            <Pagination
              pageCount={
                postedJobsCount % 20 === 0
                  ? parseInt(postedJobsCount / 20)
                  : parseInt(postedJobsCount / 20) + 1
              }
              onPageChange={handlePaginationChange}
            />
          </div>
        )}
      </div>

      {openDialog && (
        <Dialog title="Applicants for this job" onClose={handleDialogClose}>
          <div className="postedJobs__dialogContent">
            {jobApplicantsFetchLoading ? (
              <div className="postedJobs__dialogSpinnerContainer">
                <Spinner color="secondary" size="medium" />
              </div>
            ) : (
              <>
                <p>Total {jobApplicants?.length} applications</p>
                {jobApplicants?.length === 0 ? (
                  <div className="postedJobs__dialogNoContentContainer">
                    <p>No applications available!</p>
                  </div>
                ) : (
                  <div className="postedJobs__applicantsContainer">
                    {jobApplicants?.map((item, index) => (
                      <div key={item.id} className="postedJobs__applicantCard">
                        <div className="postedJobs__userDataContainer">
                          <div className="postedJobs__avatar">
                            <p>{item?.name[0]}</p>
                          </div>
                          <div className="postedJobs__nameEmail">
                            <b>{item.name}</b>
                            <p>{item.email}</p>
                          </div>
                        </div>
                        <div className="postedJobs__skillsContainer">
                          <b>Skills</b>
                          <p>{item.skills}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </Dialog>
      )}
    </div>
  );
};

const mapStatesToProps = (state) => {
  return {
    loading: state.recruiter.postedJobsFetchLoading,
    postedJobs: state.recruiter.postedJobs,
    postedJobsCount: state.recruiter.postedJobsCount,
    postedJobsFetchError: state.recruiter.postedJobsFetchError,
    jobApplicants: state.recruiter.jobApplicants,
    jobApplicantsFetchLoading: state.recruiter.jobApplicantsFetchLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPostedJobs: (payload) => dispatch(requestPostedJobs(payload)),
    getJobApplicants: (payload) => dispatch(requestJobApplicants(payload)),
  };
};

export default connect(mapStatesToProps, mapDispatchToProps)(PostedJobs);
