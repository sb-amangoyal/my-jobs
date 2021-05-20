import {
  FORGOT_PASSWORD_FAIL,
  FORGOT_PASSWORD_START,
  FORGOT_PASSWORD_SUCCESS,
  LOGIN_FAIL,
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAIL,
  REGISTER_START,
  REGISTER_SUCCESS,
  RESET_ERROR,
  RESET_PASSWORD_FAIL,
  RESET_PASSWORD_START,
  RESET_PASSWORD_SUCCESS,
} from "./types";

const initialState = {
  loginLoading: false,
  registerLoading: false,
  forgotPasswordLoading: false,
  resetPasswordLoading: false,

  userData: null,

  loginError: null,
  registerError: null,
  forgotPasswordError: null,
  resetPasswordError: null,
};

const UserReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case LOGIN_START:
      return { ...state, loginLoading: true };

    case LOGIN_SUCCESS:
      return { ...state, loginLoading: false, userData: actions.payload };

    case LOGIN_FAIL:
      return { ...state, loginLoading: false, loginError: actions.payload };

    case REGISTER_START:
      return { ...state, registerLoading: true };

    case REGISTER_SUCCESS:
      return { ...state, registerLoading: false };

    case REGISTER_FAIL:
      return {
        ...state,
        registerLoading: false,
        registerError: actions.payload,
      };
    case RESET_PASSWORD_START:
      return { ...state, resetPasswordLoading: true };

    case RESET_PASSWORD_SUCCESS:
      return { ...state, resetPasswordLoading: false };

    case RESET_PASSWORD_FAIL:
      return {
        ...state,
        resetPasswordLoading: false,
        resetPasswordError: actions.payload,
      };
    case FORGOT_PASSWORD_START:
      return { ...state, forgotPasswordLoading: true };

    case FORGOT_PASSWORD_SUCCESS:
      return { ...state, forgotPasswordLoading: false };

    case FORGOT_PASSWORD_FAIL:
      return {
        ...state,
        forgotPasswordLoading: false,
        forgotPasswordError: actions.payload,
      };
    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...initialState,
      };

    case RESET_ERROR:
      return {
        ...state,
        loginError: null,
        forgotPasswordError: null,
        resetPasswordError: null,
        registerError: null,
      };
    default:
      return state;
  }
};

export default UserReducer;
