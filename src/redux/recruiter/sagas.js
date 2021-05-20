import { put, takeEvery } from "@redux-saga/core/effects";
import axiosInstance from "../../utils/axios";
import {
  JOB_APPLICANTS_FETCH_FAILED,
  JOB_APPLICANTS_FETCH_REQUESTED,
  JOB_APPLICANTS_FETCH_SUCCEEDED,
  POSTED_JOBS_FETCH_FAILED,
  POSTED_JOBS_FETCH_REQUESTED,
  POSTED_JOBS_FETCH_SUCCEEDED,
  POST_JOB_FAILED,
  POST_JOB_REQUESTED,
  POST_JOB_SUCCEEDED,
} from "./types";

function* fetchPostedJobs(action) {
  const { page } = action.payload;

  try {
    const postedJobsRes = yield axiosInstance.get(
      `/recruiters/jobs?page=${page}`,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );

    console.log(postedJobsRes);

    if (postedJobsRes.data?.data) {
      yield put({
        type: POSTED_JOBS_FETCH_SUCCEEDED,
        payload: {
          postedJobs: postedJobsRes.data.data?.data,
          totalCount: postedJobsRes.data?.data?.metadata.count,
        },
      });
    } else {
      yield put({
        type: POSTED_JOBS_FETCH_SUCCEEDED,
        payload: {
          postedJobs: [],
          totalCount: 0,
        },
      });
    }
  } catch (err) {
    console.log(err);
    yield put({ type: POSTED_JOBS_FETCH_FAILED, payload: err.response?.data });
  }
}

function* fetchJobApplicants(action) {
  const { id } = action.payload;

  try {
    let res = yield axiosInstance.get(`/recruiters/jobs/${id}/candidates`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    yield put({
      type: JOB_APPLICANTS_FETCH_SUCCEEDED,
      payload: res.data?.data ? res.data.data : [],
    });
  } catch (err) {
    yield put({
      type: JOB_APPLICANTS_FETCH_FAILED,
      payload: err.response?.data,
    });
  }
}

function* postJob(action) {
  const { title, description, location, routeToHome } = action.payload;
  try {
    yield axiosInstance.post(
      "/jobs",
      { title, description, location },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    yield put({
      type: POST_JOB_SUCCEEDED,
      payload: { title, description, location },
    });

    routeToHome();
  } catch (err) {
    console.log(err.response);
    let errors = {};

    if (err.response?.data?.message) {
      errors = { message: err.response?.data?.message };
      yield put({ type: POST_JOB_FAILED, payload: errors });
    } else {
      if (err.response) {
        console.log("hello1");
        const errorsArray = err.response?.data.errors;
        errorsArray.forEach((el, index) => {
          errors = { ...errors, ...errorsArray[index] };
        });
        yield put({ type: POST_JOB_FAILED, payload: { errors } });
      } else {
        console.log("hello2");

        yield put({
          type: POST_JOB_FAILED,
          payload: { message: "Something went wrong" },
        });
      }
    }
  }
}

export function* watchPostedJobFetch() {
  yield takeEvery(POSTED_JOBS_FETCH_REQUESTED, fetchPostedJobs);
}

export function* watchJobApplicantsFetch() {
  yield takeEvery(JOB_APPLICANTS_FETCH_REQUESTED, fetchJobApplicants);
}

export function* watchPostJob() {
  yield takeEvery(POST_JOB_REQUESTED, postJob);
}
