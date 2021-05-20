import {
  JOB_APPLICANTS_FETCH_FAILED,
  JOB_APPLICANTS_FETCH_REQUESTED,
  JOB_APPLICANTS_FETCH_SUCCEEDED,
  POSTED_JOBS_FETCH_FAILED,
  POSTED_JOBS_FETCH_REQUESTED,
  POSTED_JOBS_FETCH_SUCCEEDED,
  POST_JOB_REQUESTED,
  POST_JOB_SUCCEEDED,
  POST_JOB_FAILED,
} from "./types";

const initialState = {
  postedJobs: [],
  postedJobsCount: 0,
  postedJobsFetchLoading: false,
  postedJobsFetchError: null,

  jobApplicants: [],
  jobApplicantsFetchLoading: false,
  jobApplicantsFetchError: null,

  postJobLoading: false,
  postJobError: null,
};

const recruiterReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case POSTED_JOBS_FETCH_REQUESTED:
      return { ...state, postedJobsFetchLoading: true };

    case POSTED_JOBS_FETCH_SUCCEEDED:
      return {
        ...state,
        postedJobsFetchLoading: false,
        postedJobs: actions.payload.postedJobs,
        postedJobsCount: actions.payload.totalCount,
        postedJobsFetchError: null,
      };

    case POSTED_JOBS_FETCH_FAILED:
      return {
        ...state,
        postedJobsFetchLoading: false,
        postedJobsFetchError: actions.payload ? actions.payload : {},
      };

    case JOB_APPLICANTS_FETCH_REQUESTED:
      return { ...state, jobApplicantsFetchLoading: true };

    case JOB_APPLICANTS_FETCH_SUCCEEDED:
      return {
        ...state,
        jobApplicantsFetchLoading: false,
        jobApplicants: actions.payload,
        jobApplicantsFetchError: null,
      };

    case JOB_APPLICANTS_FETCH_FAILED:
      return {
        ...state,
        jobApplicantsFetchLoading: false,
        jobApplicantsFetchError: actions.payload ? actions.payload : {},
      };
    case POST_JOB_REQUESTED:
      return {
        ...state,
        postJobLoading: true,
      };
    case POST_JOB_SUCCEEDED: {
      const newJob = actions.payload;
      const newPostedJobs = state.postedJobs;
      newPostedJobs.push(newJob);

      return {
        ...state,
        postJobLoading: false,
        postedJobs: newPostedJobs,
        postJobError: null,
      };
    }
    case POST_JOB_FAILED:
      return {
        ...state,
        postJobLoading: false,
        postJobError: actions.payload ? actions.payload : {},
      };
    default:
      return state;
  }
};

export default recruiterReducer;
