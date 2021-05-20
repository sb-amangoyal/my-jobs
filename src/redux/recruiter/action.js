import {
  JOB_APPLICANTS_FETCH_REQUESTED,
  POSTED_JOBS_FETCH_REQUESTED,
  POST_JOB_REQUESTED,
} from "./types";

export const requestPostedJobs = (payload) => {
  return {
    type: POSTED_JOBS_FETCH_REQUESTED,
    payload,
  };
};

export const requestJobApplicants = (payload) => {
  return {
    type: JOB_APPLICANTS_FETCH_REQUESTED,
    payload,
  };
};

export const requestPostJob = (payload) => {
  return {
    type: POST_JOB_REQUESTED,
    payload,
  };
};
