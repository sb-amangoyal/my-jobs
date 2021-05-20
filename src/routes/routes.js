import {
  Login,
  Home,
  ForgotPassword,
  Signup,
  PostJob,
  ResetPassword,
  WelcomePage,
  AppliedJobs,
} from "../pages";

export const routes = [
  {
    path: "/login",
    component: Login,
    authIsRequired: false,
  },
  {
    path: "/home",
    component: Home,
    authIsRequired: true,
  },
  {
    path: "/forgot-password",
    component: ForgotPassword,
    authIsRequired: false,
  },
  {
    path: "/signup",
    component: Signup,
    authIsRequired: false,
  },
  {
    path: "/post-job",
    component: PostJob,
    authIsRequired: true,
  },
  {
    path: "/applied-jobs",
    component: AppliedJobs,
    authIsRequired: true,
  },
  {
    path: "/reset-password",
    component: ResetPassword,
    authIsRequired: false,
  },
  {
    path: "/",
    component: WelcomePage,
    exact: true,
    authIsRequired: false,
  },
];
