// tslint:disable:promise-function-async
import Loadable from "react-loadable";
import { RouteProps as BaseRouteProps } from "react-router-dom";

import { SeoProps } from "@client/views/connected/EnhancedRoute/SeoElements";
import RouteLoaderUI from "@client/views/components/RouteLoaderUI";

export interface RouteProps extends BaseRouteProps {
  readonly guarded: boolean;
  readonly seo?: SeoProps;
  readonly routes?: RouteProps[];
}

export const DEFAULT_AUTH_PATH = "/login";
export const DEFAULT_PUBLIC_PATH = "/";
export const DEFAULT_PRIVATE_PATH = "/dashboard";

export const POST_VERIFICATION_SUCCESS_REDIRECTION_RULES = {
  email: "/instructions?preset=emailconfirmed",
  passwordreset: "/reset-password"
};

export const POST_VERIFICATION_FAILURE_REDIRECTION_RULES = {
  invalidCode: "/instructions?preset=invalidcode",
  expiredCode: "/instructions?preset=expiredcode"
};

export const routes: RouteProps[] = [
  {
    path: DEFAULT_PUBLIC_PATH,
    exact: true,
    guarded: false,
    seo: { title: "App" },
    component: Loadable({
      loading: RouteLoaderUI,
      loader: () => import("@client/views/routes/Landing")
    })
  },
  {
    path: DEFAULT_AUTH_PATH,
    exact: true,
    guarded: false,
    seo: { title: "Login" },
    component: Loadable({
      loading: RouteLoaderUI,
      loader: () => import("@client/views/routes/Login")
    })
  },
  {
    path: "/forgot-password",
    exact: true,
    guarded: false,
    seo: { title: "Reset Password" },
    component: Loadable({
      loading: RouteLoaderUI,
      loader: () => import("@client/views/routes/ForgotPassword")
    })
  },
  {
    path: "/reset-password",
    exact: true,
    guarded: false,
    seo: { title: "Reset Password" },
    component: Loadable({
      loading: RouteLoaderUI,
      loader: () => import("@client/views/routes/ResetPassword")
    })
  },
  {
    path: "/register",
    exact: true,
    guarded: false,
    seo: { title: "Register" },
    component: Loadable({
      loading: RouteLoaderUI,
      loader: () => import("@client/views/routes/Registration")
    })
  },
  {
    path: "/instructions",
    exact: true,
    guarded: false,
    seo: { title: "-" },
    component: Loadable({
      loading: RouteLoaderUI,
      loader: () => import("@client/views/routes/Instructions")
    })
  },
  {
    path: "/verification/:ctx(email|passwordreset)",
    exact: true,
    guarded: false,
    seo: { title: "Verification" },
    component: Loadable({
      loading: RouteLoaderUI,
      loader: () => import("@client/views/routes/Verification")
    })
  },
  {
    path: DEFAULT_PRIVATE_PATH,
    exact: true,
    guarded: true,
    seo: { title: "Dashboard" },
    component: Loadable({
      loading: RouteLoaderUI,
      loader: () => import("@client/views/routes/Dashboard")
    })
  },
  {
    path: "/profile",
    exact: true,
    guarded: true,
    seo: { title: "Profile Settings" },
    component: Loadable({
      loading: RouteLoaderUI,
      loader: () => import("@client/views/routes/Profile")
    })
  },
  {
    path: "/account",
    exact: true,
    guarded: true,
    seo: { title: "Account Settings" },
    component: Loadable({
      loading: RouteLoaderUI,
      loader: () => import("@client/views/routes/Account")
    })
  },
  {
    guarded: false,
    seo: { title: "404" },
    component: Loadable({
      loading: RouteLoaderUI,
      loader: () => import("@client/views/routes/NotFound")
    })
  }
];

export default routes;
