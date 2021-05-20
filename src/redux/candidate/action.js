import {
  APPLIED_JOBS_FETCH_REQUESTED,
  APPLY_JOB_REQUESTED,
  AVAILABLE_JOBS_FETCH_REQUESTED,
} from "./types";

export const requestAvailableJobs = (payload) => {
  return {
    type: AVAILABLE_JOBS_FETCH_REQUESTED,
    payload,
  };
};

export const requestAppliedJobs = (payload) => {
  return {
    type: APPLIED_JOBS_FETCH_REQUESTED,
    payload,
  };
};

export const requestApplyJob = (payload) => {
  return {
    type: APPLY_JOB_REQUESTED,
    payload,
  };
};
