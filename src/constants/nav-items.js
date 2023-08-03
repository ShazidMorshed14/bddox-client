import {
  IconLayoutDashboard,
  IconPrescription,
  IconUser,
  IconUserBolt,
  IconUsers,
} from '@tabler/icons-react';
import * as urls from './app-urls';

const navBarList = [
  {
    label: 'Dashboard',
    icon: IconLayoutDashboard,
    link: urls.DASHBOARD,
  },
  {
    label: 'User Profile',
    icon: IconUser,
    link: urls.PROFILE,
  },
  {
    label: 'Prescription',
    icon: IconPrescription,
    link: urls.PRESCRIPTION,
  },
  {
    label: 'Patients',
    icon: IconUsers,
    link: urls.PATIENT,
  },
];

export default navBarList;
