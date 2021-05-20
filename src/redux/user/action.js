import {
  FORGOT_PASSWORD_START,
  LOGIN_START,
  REGISTER_START,
  RESET_ERROR,
  RESET_PASSWORD_START,
  LOGOUT,
  LOGIN_SUCCESS,
} from "./types";

export const startLogin = (payload) => {
  return {
    type: LOGIN_START,
    payload: payload,
  };
};

export const loginSuccess = (payload) => {
  return {
    type: LOGIN_SUCCESS,
    payload: payload,
  };
};

export const startRegister = (payload) => {
  return {
    type: REGISTER_START,
    payload: payload,
  };
};

export const startResetPassword = (payload) => {
  return {
    type: RESET_PASSWORD_START,
    payload,
  };
};

export const startForgotPassword = (payload) => {
  return {
    type: FORGOT_PASSWORD_START,
    payload,
  };
};

export const resetError = () => {
  return {
    type: RESET_ERROR,
  };
};

export const logout = () => {
  return {
    type: LOGOUT,
  };
};
