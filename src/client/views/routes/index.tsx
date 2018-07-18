// tslint:disable:typedef
import * as Loadable from "react-loadable";
import { RouteProps as BaseRouteProps } from "react-router-dom";
import RouteLoaderUI from "@client/views/components/RouteLoaderUI";

export interface RouteProps extends BaseRouteProps {
  readonly guarded: boolean;
  readonly routes?: RouteProps[];
}

export const DEFAULT_AUTH_PATH: string = "/login";
export const DEFAULT_PUBLIC_PATH: string = "/";
export const DEFAULT_PRIVATE_PATH: string = "/dashboard";

// prettier-ignore
export const routes: RouteProps[] = [
  {
    path: DEFAULT_PUBLIC_PATH,
    exact: true,
    guarded: false,
    component: Loadable({
      loading: RouteLoaderUI,
      loader: async () => (await import(/* webpackChunkName: "routes/landing" */ "@client/views/routes/Landing")).default
    })
  },
  {
    path: DEFAULT_AUTH_PATH,
    exact: true,
    guarded: false,
    component: Loadable({
      loading: RouteLoaderUI,
      loader: async () => (await import(/* webpackChunkName: "routes/login" */ "@client/views/routes/Login")).default
    })
  },
  {
    path: '/forgot-password',
    exact: true,
    guarded: false,
    component: Loadable({
      loading: RouteLoaderUI,
      loader: async () => (await import(/* webpackChunkName: "routes/forgotpassword" */ "@client/views/routes/ForgotPassword")).default
    })
  },
  {
    path: '/reset-password',
    exact: true,
    guarded: false,
    component: Loadable({
      loading: RouteLoaderUI,
      loader: async () => (await import(/* webpackChunkName: "routes/resetpassword" */ "@client/views/routes/ResetPassword")).default
    })
  },
  {
    path: "/register",
    exact: true,
    guarded: false,
    component: Loadable({
      loading: RouteLoaderUI,
      loader: async () => (await import(/* webpackChunkName: "routes/register" */ "@client/views/routes/Register")).default
    })
  },
  {
    path: "/message",
    exact: true,
    guarded: false,
    component: Loadable({
      loading: RouteLoaderUI,
      loader: async () => (await import(/* webpackChunkName: "routes/message" */ "@client/views/routes/Message")).default
    })
  },
  {
    path: "/verification/:ctx(email|passwordreset)",
    exact: true,
    guarded: false,
    component: Loadable({
      loading: RouteLoaderUI,
      loader: async () => (await import(/* webpackChunkName: "routes/verification" */ "@client/views/routes/Verification")).default
    })
  },
  {
    path: DEFAULT_PRIVATE_PATH,
    exact: true,
    guarded: true,
    component: Loadable({
      loading: RouteLoaderUI,
      loader: async () => (await import(/* webpackChunkName: "routes/dashboard" */ "@client/views/routes/Dashboard")).default
    })
  },
  {
    path: "/profile",
    exact: true,
    guarded: true,
    component: Loadable({
      loading: RouteLoaderUI,
      loader: async () => (await import(/* webpackChunkName: "routes/profile" */ "@client/views/routes/Profile")).default
    })
  },
  {
    path: "/account",
    exact: true,
    guarded: true,
    component: Loadable({
      loading: RouteLoaderUI,
      loader: async () => (await import(/* webpackChunkName: "routes/account" */ "@client/views/routes/Account")).default
    })
  },
  {
    guarded: false,
    component: Loadable({
      loading: RouteLoaderUI,
      loader: async () => (await import(/* webpackChunkName: "routes/notfound" */ "@client/views/routes/NotFound")).default
    })
  }
];

export default routes;
