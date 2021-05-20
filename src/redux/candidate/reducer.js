import {
  APPLIED_JOBS_FETCH_FAILED,
  APPLIED_JOBS_FETCH_REQUESTED,
  APPLIED_JOBS_FETCH_SUCCEEDED,
  APPLY_JOB_FAILED,
  APPLY_JOB_REQUESTED,
  APPLY_JOB_SUCCEEDED,
  AVAILABLE_JOBS_FETCH_FAILED,
  AVAILABLE_JOBS_FETCH_REQUESTED,
  AVAILABLE_JOBS_FETCH_SUCCEEDED,
} from "./types";

const initialState = {
  availableJobs: [],
  availableJobsCount: 0,
  availableJobsFetchLoading: false,
  availableJobsFetchError: null,

  appliedJobs: [],
  appliedJobsFetchLoading: false,
  appliedJobsFetchError: null,

  applyJobLoading: false,
  applyJobError: null,
};

const candiateReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case AVAILABLE_JOBS_FETCH_REQUESTED:
      return { ...state, availableJobsFetchLoading: true };

    case AVAILABLE_JOBS_FETCH_SUCCEEDED:
      return {
        ...state,
        availableJobsFetchLoading: false,
        availableJobs: actions.payload.availableJobs,
        availableJobsCount: actions.payload.totalCount,
        availableJobsFetchError: null,
      };

    case AVAILABLE_JOBS_FETCH_FAILED:
      return {
        ...state,
        availableJobsFetchLoading: false,
        availableJobsFetchError: actions.payload ? actions.payload : {},
      };

    case APPLIED_JOBS_FETCH_REQUESTED:
      return { ...state, appliedJobsFetchLoading: true };

    case APPLIED_JOBS_FETCH_SUCCEEDED:
      return {
        ...state,
        appliedJobsFetchLoading: false,
        appliedJobs: actions.payload,
        appliedJobsFetchError: null,
      };

    case APPLIED_JOBS_FETCH_FAILED:
      return {
        ...state,
        appliedJobsFetchLoading: false,
        appliedJobsFetchError: actions.payload ? actions.payload : {},
      };

    case APPLY_JOB_REQUESTED:
      return {
        ...state,
        applyJobLoading: true,
      };

    case APPLY_JOB_SUCCEEDED: {
      const { id } = actions.payload;
      const newAvailableJobs = state.availableJobs.filter(
        (job) => job.id !== id
      );

      return {
        ...state,
        applyJobLoading: false,
        availableJobs: newAvailableJobs,
        applyJobError: null,
      };
    }

    case APPLY_JOB_FAILED:
      return {
        ...state,
        applyJobLoading: false,
        applyJobError: actions.payload ? actions.payload : {},
      };
    default:
      return state;
  }
};

export default candiateReducer;
