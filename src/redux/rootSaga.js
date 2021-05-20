import { all } from "@redux-saga/core/effects";
import {
  watchAppliedJobsFetch,
  watchApplyJob,
  watchAvailableJobFetch,
} from "./candidate/sagas";
import {
  watchJobApplicantsFetch,
  watchPostedJobFetch,
  watchPostJob,
} from "./recruiter/sagas";
import {
  watchLogin,
  watchRegister,
  watchForgotPassword,
  watchResetPassword,
} from "./user/sagas";

export default function* rootSaga() {
  yield all([
    watchLogin(),
    watchRegister(),
    watchForgotPassword(),
    watchResetPassword(),
    watchPostedJobFetch(),
    watchPostJob(),
    watchJobApplicantsFetch(),
    watchAvailableJobFetch(),
    watchAppliedJobsFetch(),
    watchApplyJob(),
  ]);
}
