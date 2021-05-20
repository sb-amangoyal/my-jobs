import { put, takeEvery } from "@redux-saga/core/effects";
import axiosInstance from "../../utils/axios";
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

function* fetchAvailableJobs(action) {
  const { page } = action.payload;

  try {
    const availableJobsRes = yield axiosInstance.get(
      `/candidates/jobs?page=${page}`,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );

    console.log(availableJobsRes);

    if (availableJobsRes.data?.data) {
      yield put({
        type: AVAILABLE_JOBS_FETCH_SUCCEEDED,
        payload: {
          availableJobs: availableJobsRes.data?.data,
          totalCount: availableJobsRes.data?.metadata.count,
        },
      });
    } else {
      yield put({
        type: AVAILABLE_JOBS_FETCH_SUCCEEDED,
        payload: {
          postedJobs: [],
          totalCount: 0,
        },
      });
    }
  } catch (err) {
    console.log(err);
    yield put({
      type: AVAILABLE_JOBS_FETCH_FAILED,
      payload: err.response?.data,
    });
  }
}

function* fetchAppliedJobs(action) {
  try {
    let res = yield axiosInstance.get("/candidates/jobs/applied", {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    yield put({
      type: APPLIED_JOBS_FETCH_SUCCEEDED,
      payload: res.data?.data ? res.data.data : [],
    });
  } catch (err) {
    yield put({
      type: APPLIED_JOBS_FETCH_FAILED,
      payload: err.response?.data,
    });
  }
}

function* applyJob(action) {
  const { id, handleDialogClose } = action.payload;
  try {
    yield axiosInstance.post(
      "/candidates/jobs",
      {
        jobId: id,
      },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    yield put({
      type: APPLY_JOB_SUCCEEDED,
      payload: { id },
    });
    yield handleDialogClose();
  } catch (err) {
    yield put({ type: APPLY_JOB_FAILED, payload: err?.response?.data });
  }
}

export function* watchAvailableJobFetch() {
  yield takeEvery(AVAILABLE_JOBS_FETCH_REQUESTED, fetchAvailableJobs);
}

export function* watchAppliedJobsFetch() {
  yield takeEvery(APPLIED_JOBS_FETCH_REQUESTED, fetchAppliedJobs);
}

export function* watchApplyJob() {
  yield takeEvery(APPLY_JOB_REQUESTED, applyJob);
}
