import {
  IconEdit,
  IconKey,
  IconMoodSadFilled,
  IconPackage,
  IconPackageExport,
  IconPackageImport,
  IconPackageOff,
  IconPackages,
  IconSquareRoundedPlusFilled,
  IconTrash,
  IconTruck,
} from '@tabler/icons-react';
import COLORS from './colors';

export const authContext = 'web';

export const userRoles = {
  ADMIN: 'ADMIN',
  'SUPER ADMIN': 'SUPER ADMIN',
  MANAGER: 'MANAGER',
  'GODOWN MANAGER': 'GODOWN MANAGER',
  OPERATOR: 'GODOWN KEEPER',
};
export const userWeight = {
  'SUPER ADMIN': 10,
  ADMIN: 8,
  MANAGER: 6,
  'GODOWN MANAGER': 4,
  OPERATOR: 2,
};

export const userColors = {
  ADMIN: COLORS.ADMIN,
  'SUPER ADMIN': COLORS['SUPER ADMIN'],
  MANAGER: COLORS.MANAGER,
  'GODOWN MANAGER': COLORS['GODOWN MANAGER'],
  OPERATOR: COLORS.OPERATOR,
};

export const userBadgeBackgroundColors = {
  'SUPER ADMIN': 'rgba(255, 88, 88, 0.1)',
  ADMIN: 'rgba(134, 93, 255, 0.1)',
  MANAGER: 'rgba(127, 183, 126, 0.1)',
  'GODOWN MANAGER': 'rgba(253, 126, 20, 0.1)',
  OPERATOR: 'rgba(64, 66, 88, 0.1)',
};

export const orderStatusConst = {
  PENDING: 'PENDING',
  // APPROVED: 'APPROVED',
  'IN QUEUE': 'IN QUEUE',
  LOADING: 'LOADING',
  'IN TRANSIT': 'IN TRANSIT',
  UNLOADING: 'UNLOADING',
  COMPLETE: 'COMPLETE',
  CANCELLED: 'CANCELLED',
};

export const orderStatusBadgeColors = {
  PENDING: 'yellow',
  // APPROVED: 'indigo',
  'IN QUEUE': 'grape',
  LOADING: 'orange',
  'IN TRANSIT': 'lime',
  UNLOADING: 'pink',
  COMPLETE: 'green',
  CANCELLED: 'red',
};

export const cbcTabNames = {
  scanIn: 'SCANNED IN',
  scanOut: 'SCANNED OUT',
};

export const orderDetailsType = {
  SO: 'SO',
  IGT: 'IGT',
};

export const actionLoggerReferenceTypes = {
  USER_MANAGEMENT: 'USER_MANAGEMENT',
  LOCATION_MANAGEMENT: 'LOCATION_MANAGEMENT',
  ORDER_MANAGEMENT: 'ORDER_MANAGEMENT',
  INVENTORY_MANAGEMENT: 'INVENTORY_MANAGEMENT',
  DISTRIBUTOR_MANAGEMENT: 'DISTRIBUTOR_MANAGEMENT',
};

export const actionLoggerActionsBadgeColor = {
  CREATE: 'green',
  UPDATE: 'violet',
  DELETE: 'red',
  LOGIN: 'blue',
  LOGOUT: 'orange',
  RESET_PASSWORD: 'pink',
};

export const reportTypeConst = {
  STOCK_IN_HAND: 'STOCK_IN_HAND',
  OPEN_CBC_STOCK: 'OPEN_CBC_STOCK',
  BLOCKED_CBC_STOCK: 'BLOCKED_CBC_STOCK',
};

export const actionLoggerIcons = {
  CREATE: <IconSquareRoundedPlusFilled size="0.8rem" />,
  UPDATE: <IconEdit size="0.8rem" />,
  DELETE: <IconTrash size="0.8rem" />,
  LOGIN: <IconKey size="0.8rem" />,
  LOGOUT: <IconMoodSadFilled size="0.8rem" />,
  RESET_PASSWORD: <IconKey size="0.8rem" />,
};

export const actionLoggerIconsGradients = {
  CREATE: { from: 'lime', to: 'cyan' },
  UPDATE: { from: 'yellow', to: 'orange' },
  DELETE: { from: 'red', to: 'darkred' },
  LOGIN: { from: 'lime', to: 'cyan' },
  LOGOUT: { from: 'red', to: 'darkred' },
  RESET_PASSWORD: { from: 'yellow', to: 'orange' },
};

export const DashboardCardIconChoice = (title, color) => {
  switch (title) {
    case 'Incoming':
      return (
        <IconPackageImport color={color ? color : '#ffffff'} size="1.5em" />
      );

    case 'Outgoing':
      return (
        <IconPackageExport color={color ? color : '#ffffff'} size="1.5em" />
      );

    case 'In Transit':
      return <IconTruck color={color ? color : '#ffffff'} size="1.5em" />;

    case 'OH Stock':
      return <IconPackages color={color ? color : '#ffffff'} size="1.5em" />;

    case 'Open Stock':
      return <IconPackage color={color ? color : '#ffffff'} size="1.5em" />;

    case 'Blocked':
      return <IconPackageOff color={color ? color : '#ffffff'} size="1.5em" />;

    default:
      return <IconPackages color={color ? color : '#ffffff'} size="1.5em" />;
  }
};
