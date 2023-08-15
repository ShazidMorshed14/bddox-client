import Dashboard from '../pages/auth/Dashboard';
import SignIn from '../pages/auth/SignIn';
import ForgetPassword from '../pages/auth/ForgetPassword';
import * as urls from './app-urls';
import ResetPassword from '../pages/auth/ResetPassword';
import PrescriptionManagement from '../pages/PrescriptionManagement';
import ProfileManagement from '../pages/ProfileManagement';
import PatientManagement from '../pages/PatientManagement';
import MedicineManagement from '../pages/MedicineManagement';
import PrescriptionCreate from '../pages/PrescriptionCreate';
import AppointmentManagement from '../pages/AppointmentManagement';

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
  {
    path: urls.PRESCRIPTION,
    Element: PrescriptionManagement,
    isIndexUrl: false,
    isProtected: true,
  },
  {
    path: urls.PRESCRIPTION_CREATE,
    Element: PrescriptionCreate,
    isIndexUrl: false,
    isProtected: true,
  },
  {
    path: urls.PROFILE,
    Element: ProfileManagement,
    isIndexUrl: false,
    isProtected: true,
  },
  {
    path: urls.PATIENT,
    Element: PatientManagement,
    isIndexUrl: false,
    isProtected: true,
  },
  {
    path: urls.MEDICINE,
    Element: MedicineManagement,
    isIndexUrl: false,
    isProtected: true,
  },
  {
    path: urls.APPOINTMENT,
    Element: AppointmentManagement,
    isIndexUrl: false,
    isProtected: true,
  },
];

export default routes;
