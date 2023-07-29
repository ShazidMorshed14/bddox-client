import Dashboard from '../pages/auth/Dashboard';
import SignIn from '../pages/auth/SignIn';
import ForgetPassword from '../pages/auth/ForgetPassword';
import * as urls from './app-urls';
import ResetPassword from '../pages/auth/ResetPassword';

const routes = [
  {
    path: urls.SIGNIN,
    Element: SignIn,
    isIndexUrl: true,
    isProtected: false,
  },
  {
    path: urls.DASHBOARD,
    Element: Dashboard,
    isIndexUrl: false,
    isProtected: true,
  },
  {
    path: urls.FORGET_PASSWORD,
    Element: ForgetPassword,
    isIndexUrl: false,
    isProtected: false,
  },
  {
    path: urls.RESET_PASSWORD,
    Element: ResetPassword,
    isIndexUrl: false,
    isProtected: false,
  },
];

export default routes;
