import { Login, Register } from "src/pages/NoAuth";
import { Home, Project, UserSettings } from "src/pages/Authed";
export const LOGIN_ROUTE = "/login";
export const REGISTER_ROUTE = "/register";
export const HOME_ROUTE = "/";
export const PROJECT_ROUTE = "/projects/:projectId";
export const USERSETTINGS_ROUTE = "/settings";

export const authRoutesMap = [
  { path: PROJECT_ROUTE, component: Project },
  { path: USERSETTINGS_ROUTE, component: UserSettings },
  { path: HOME_ROUTE, component: Home },
];

export const nonauthRoutesMap = [
  { path: LOGIN_ROUTE, component: Login },
  { path: REGISTER_ROUTE, component: Register },
];
