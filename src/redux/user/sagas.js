import { put, takeLatest } from "redux-saga/effects";
import axiosInstance from "../../utils/axios";
import {
  FORGOT_PASSWORD_FAIL,
  FORGOT_PASSWORD_START,
  FORGOT_PASSWORD_SUCCESS,
  LOGIN_FAIL,
  LOGIN_START,
  LOGIN_SUCCESS,
  REGISTER_FAIL,
  REGISTER_START,
  REGISTER_SUCCESS,
  RESET_PASSWORD_FAIL,
  RESET_PASSWORD_START,
  RESET_PASSWORD_SUCCESS,
} from "./types";

function* login(action) {
  const { email, password, routeToHome } = action.payload;

  try {
    const loginResponse = yield axiosInstance.post("/auth/login", {
      email,
      password,
    });
    yield put({ type: LOGIN_SUCCESS, payload: loginResponse.data.data });
    yield localStorage.setItem("token", loginResponse.data.data.token);
    yield routeToHome();
  } catch (err) {
    let errors = {};

    if (err.response?.data?.message) {
      errors = { message: err.response?.data?.message };
      yield put({ type: LOGIN_FAIL, payload: errors });
    } else {
      const errorsArray = err.response?.data.errors;
      errorsArray.forEach((el, index) => {
        errors = { ...errors, ...errorsArray[index] };
      });
      yield put({ type: LOGIN_FAIL, payload: { errors } });
    }
  }
}

function* register(action) {
  const {
    email,
    userRole,
    password,
    confirmPassword,
    name,
    skills,
    routeToLogin,
  } = action.payload;
  try {
    yield axiosInstance.post("/auth/register", {
      email,
      userRole,
      password,
      confirmPassword,
      name,
      skills,
    });
    yield put({ type: REGISTER_SUCCESS });
    yield routeToLogin();
  } catch (err) {
    let errors = {};

    if (err.response?.data?.message) {
      errors = { message: err.response?.data?.message };
      yield put({ type: REGISTER_FAIL, payload: errors });
    } else {
      const errorsArray = err.response?.data.errors;
      errorsArray.forEach((el, index) => {
        errors = { ...errors, ...errorsArray[index] };
      });
      yield put({ type: REGISTER_FAIL, payload: { errors } });
    }
  }
}

function* forgotPassword(action) {
  const { email, routeToResetPassword } = action.payload;

  try {
    const forgotPasswordResponse = yield axiosInstance.get(
      `/auth/resetpassword?email=${email}`
    );

    yield put({
      type: FORGOT_PASSWORD_SUCCESS,
      data: forgotPasswordResponse.data.data,
    });
    yield routeToResetPassword(forgotPasswordResponse?.data?.data?.token);
  } catch (err) {
    console.log(err);
    let errors = {};

    if (err.response?.data?.message) {
      errors = { message: err.response?.data?.message };
      yield put({ type: FORGOT_PASSWORD_FAIL, payload: errors });
    } else {
      const errorsArray = err.response?.data.errors;
      errorsArray.forEach((el, index) => {
        errors = { ...errors, ...errorsArray[index] };
      });
      yield put({ type: FORGOT_PASSWORD_FAIL, payload: { errors } });
    }
  }
}

function* resetPassword(action) {
  const { password, confirmPassword, token, routeToLogin } = action.payload;
  try {
    yield axiosInstance.post(`/auth/resetpassword`, {
      password,
      confirmPassword,
      token,
    });

    yield put({ type: RESET_PASSWORD_SUCCESS });
    yield routeToLogin();
  } catch (err) {
    console.log(err);
    let errors = {};

    if (err.response?.data?.message) {
      errors = { message: err.response?.data?.message };
      yield put({ type: RESET_PASSWORD_FAIL, payload: errors });
    } else {
      const errorsArray = err.response?.data.errors;
      errorsArray.forEach((el, index) => {
        errors = { ...errors, ...errorsArray[index] };
      });
      yield put({ type: RESET_PASSWORD_FAIL, payload: { errors } });
    }
  }
}

export function* watchLogin() {
  yield takeLatest(LOGIN_START, login);
}

export function* watchRegister() {
  yield takeLatest(REGISTER_START, register);
}

export function* watchForgotPassword() {
  yield takeLatest(FORGOT_PASSWORD_START, forgotPassword);
}

export function* watchResetPassword() {
  yield takeLatest(RESET_PASSWORD_START, resetPassword);
}
