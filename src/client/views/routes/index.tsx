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

export const routes: RouteProps[] = [
  {
    path: DEFAULT_PUBLIC_PATH,
    exact: true,
    guarded: false,
    seo: { title: "App" },
    component: Loadable({
      loading: RouteLoaderUI,
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
      loader: () => import(/* webpackChunkName: "routes/register" */ "@client/views/routes/Register") // prettier-ignore
    })
  },
  {
    path: "/message",
    exact: true,
    guarded: false,
    seo: { title: "-" },
    component: Loadable({
      loading: RouteLoaderUI,
      loader: () => import(/* webpackChunkName: "routes/message" */ "@client/views/routes/Message") // prettier-ignore
    })
  },
  {
    path: "/verification/:ctx(email|passwordreset)",
    exact: true,
    guarded: false,
    seo: { title: "Verification" },
    component: Loadable({
      loading: RouteLoaderUI,
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
      loader: () => import(/* webpackChunkName: "routes/account" */ "@client/views/routes/Account") // prettier-ignore
    })
  },
  {
    guarded: false,
    seo: { title: "404" },
    component: Loadable({
      loading: RouteLoaderUI,
      loader: () => import(/* webpackChunkName: "routes/notfound" */ "@client/views/routes/NotFound") // prettier-ignore
    })
  }
];

export default routes;
