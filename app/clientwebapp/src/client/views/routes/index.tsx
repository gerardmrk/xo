// tslint:disable:typedef promise-function-async
import * as Loadable from "react-loadable";
import { RouteProps as BaseRouteProps } from "react-router-dom";

import { SeoProps } from "@client/views/components/SeoElements";
import RouteLoaderUI from "@client/views/components/RouteLoaderUI";

export interface RouteProps extends BaseRouteProps {
  readonly guarded: boolean;
  readonly seo?: SeoProps;
  readonly routes?: RouteProps[];
}

export const DEFAULT_AUTH_PATH: string = "/login";
export const DEFAULT_PUBLIC_PATH: string = "/";
export const DEFAULT_PRIVATE_PATH: string = "/dashboard";

export const POST_VERIFICATION_SUCCESS_REDIRECTION_RULES = {
  email: "/affirmation?preset=emailconfirmed",
  passwordreset: "/reset-password"
};

export const POST_VERIFICATION_FAILURE_REDIRECTION_RULES = {
  invalidCode: "/affirmation?preset=invalidcode",
  expiredCode: "/affirmation?preset=expiredcode"
};

export const routes: RouteProps[] = [
  {
    path: DEFAULT_PUBLIC_PATH,
    exact: true,
    guarded: false,
    seo: { title: "App" },
    component: Loadable({
      loading: RouteLoaderUI,
      modules: ["routes/landing"],
      loader: () => import(/* webpackChunkName: "routes/landing" */ "@client/views/routes/Landing") // prettier-ignore
    })
  },
  {
    path: DEFAULT_AUTH_PATH,
    exact: true,
    guarded: false,
    seo: { title: "Login" },
    component: Loadable({
      loading: RouteLoaderUI,
      modules: ["routes/login"],
      loader: () => import(/* webpackChunkName: "routes/login" */ "@client/views/routes/Login") // prettier-ignore
    })
  },
  {
    path: "/forgot-password",
    exact: true,
    guarded: false,
    seo: { title: "Reset Password" },
    component: Loadable({
      loading: RouteLoaderUI,
      modules: ["routes/forgotpassword"],
      loader: () => import(/* webpackChunkName: "routes/forgotpassword" */ "@client/views/routes/ForgotPassword") // prettier-ignore
    })
  },
  {
    path: "/reset-password",
    exact: true,
    guarded: false,
    seo: { title: "Reset Password" },
    component: Loadable({
      loading: RouteLoaderUI,
      modules: ["routes/resetpassword"],
      loader: () => import(/* webpackChunkName: "routes/resetpassword" */ "@client/views/routes/ResetPassword") // prettier-ignore
    })
  },
  {
    path: "/register",
    exact: true,
    guarded: false,
    seo: { title: "Register" },
    component: Loadable({
      loading: RouteLoaderUI,
      modules: ["routes/register"],
      loader: () => import(/* webpackChunkName: "routes/register" */ "@client/views/routes/Register") // prettier-ignore
    })
  },
  {
    path: "/affirmation",
    exact: true,
    guarded: false,
    seo: { title: "-" },
    component: Loadable({
      loading: RouteLoaderUI,
      modules: ["routes/affirmationmessage"],
      loader: () => import(/* webpackChunkName: "routes/affirmationmessage" */ "@client/views/routes/AffirmationMessage") // prettier-ignore
    })
  },
  {
    path: "/verification/:ctx(email|passwordreset)",
    exact: true,
    guarded: false,
    seo: { title: "Verification" },
    component: Loadable({
      loading: RouteLoaderUI,
      modules: ["routes/verification"],
      loader: () => import(/* webpackChunkName: "routes/verification" */ "@client/views/routes/Verification") // prettier-ignore
    })
  },
  {
    path: DEFAULT_PRIVATE_PATH,
    exact: true,
    guarded: true,
    seo: { title: "Dashboard" },
    component: Loadable({
      loading: RouteLoaderUI,
      modules: ["routes/dashboard"],
      loader: () => import(/* webpackChunkName: "routes/dashboard" */ "@client/views/routes/Dashboard") // prettier-ignore
    })
  },
  {
    path: "/profile",
    exact: true,
    guarded: true,
    seo: { title: "Profile Settings" },
    component: Loadable({
      loading: RouteLoaderUI,
      modules: ["routes/profile"],
      loader: () => import(/* webpackChunkName: "routes/profile" */ "@client/views/routes/Profile") // prettier-ignore
    })
  },
  {
    path: "/account",
    exact: true,
    guarded: true,
    seo: { title: "Account Settings" },
    component: Loadable({
      loading: RouteLoaderUI,
      modules: ["routes/account"],
      loader: () => import(/* webpackChunkName: "routes/account" */ "@client/views/routes/Account") // prettier-ignore
    })
  },
  {
    guarded: false,
    seo: { title: "404" },
    component: Loadable({
      loading: RouteLoaderUI,
      modules: ["routes/notfound"],
      loader: () => import(/* webpackChunkName: "routes/notfound" */ "@client/views/routes/NotFound") // prettier-ignore
    })
  }
];

export default routes;
