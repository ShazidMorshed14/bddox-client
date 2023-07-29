import {
  IconChecks,
  IconForklift,
  IconHourglass,
  IconMoodCrazyHappy,
  IconMoodSad,
  IconPackageExport,
  IconSpacingHorizontal,
  IconTruckLoading,
} from '@tabler/icons-react';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import COLORS from '../constants/colors';
import { orderStatusConst, userRoles, userWeight } from '../constants/const';
import { NotificationUtil } from './notifications';

export const isArrayAndHasContent = (arr) => {
  return Array.isArray(arr) && arr.length > 0;
};

export const isObjectAndHasProperties = (obj) => {
  return obj !== null && typeof obj === 'object' && Object.keys(obj).length > 0;
};

export const parseResponseError = (err) => {
  if (err.response) {
    const { data } = err.response;

    if (data.validation && data.validation.body) {
      return data.validation.body.message;
    } else if (data.message) {
      return data.msg;
    } else {
      return data.msg;
    }
  }

  return 'Please try again later.';
};

export const getInitialFromName = (name) => {
  if (typeof name !== 'string' || name.length === 0) {
    return null;
  }

  const split = name.split(' ');
  let initials = '';

  for (let i = 0; i < split.length; i++) {
    if (initials.length === 3) {
      break;
    }

    initials += split[i][0];
  }

  return initials.toUpperCase();
};

export const isNumeric = (str) => {
  if (typeof str != 'string') {
    return false;
  }

  return !isNaN(str) && !isNaN(parseFloat(str));
};

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    minimumFractionDigits: 2,
  }).format(amount);
};

export const encryptPasswordTemporarily = (value) => {
  const password = value.toString();
  const firstHalf = password.slice(0, password.length / 2);
  const secondHalf = password.slice(password.length / 2, password.length);

  const encryptedFirstHalf = firstHalf.split('').reverse().join('');
  const encryptedSecondHalf = secondHalf.split('').reverse().join('');

  const encryptedPassword =
    encryptedFirstHalf.toString() + encryptedSecondHalf.toString();

  return encryptedPassword;
};

export const decryptPasswordTemporarily = (value) => {
  const encryptedPassword = value.toString();
  const firstHalf = encryptedPassword.slice(0, encryptedPassword.length / 2);
  const secondHalf = encryptedPassword.slice(
    encryptedPassword.length / 2,
    encryptedPassword.length,
  );

  const decryptedFirstHalf = firstHalf.split('').reverse().join('');
  const decryptedSecondHalf = secondHalf.split('').reverse().join('');

  const decryptedPassword =
    decryptedFirstHalf.toString() + decryptedSecondHalf.toString();

  return decryptedPassword;
};

export const handleErrorResponse = (err) => {
  const { data } = err.response;

  NotificationUtil({
    success: false,
    title: 'Something went wrong!',
    message: data.message,
  });
};

export const userRoleLabelsAccordingToWeight = (weight) => {
  const labels = [];

  if (weight === 10) {
    const superAdminLable = {
      label: 'SUPER ADMIN',
      color: COLORS['SUPER ADMIN'],
      value: 'SUPER ADMIN',
    };
    labels.push(superAdminLable);
    const adminLable = {
      label: 'ADMIN',
      color: COLORS['ADMIN'],
      value: 'ADMIN',
    };
    labels.push(adminLable);
  }

  if (weight === 8) {
    const lable = {
      label: 'ADMIN',
      color: COLORS['ADMIN'],
      value: 'ADMIN',
    };
    labels.push(lable);
  }

  for (var role in userRoles) {
    if (userWeight[role] === 8 || userWeight[role] === 10) {
      continue;
    }
    if (userWeight[role] < weight) {
      const lable = {
        label: userRoles[role],
        color: COLORS[role],
        value: role,
      };
      labels.push(lable);
    }
  }

  return labels;
};

export const canThisUserEditThisUser = (user, userToEdit) => {
  if (user.userWeight === 10 || user.userWeight === 8) {
    return true;
  }
  if (user.userWeight > userToEdit.userWeight) {
    return true;
  }
  return false;
};

export const getOrderStatusById = (id) => {
  switch (id) {
    case Object.keys(orderStatusConst).indexOf('IN QUEUE'):
      return {
        value: orderStatusConst['IN QUEUE'],
        label: 'IN QUEUE',
        icon: <IconForklift />,
        color: 'grape',
      };
    case Object.keys(orderStatusConst).indexOf('LOADING'):
      return {
        value: orderStatusConst.LOADING,
        label: 'LOADING',
        color: 'orange',
        icon: <IconTruckLoading />,
      };
    case Object.keys(orderStatusConst).indexOf('IN TRANSIT'):
      return {
        value: orderStatusConst['IN TRANSIT'],
        label: 'IN TRANSIT',
        color: 'lime',
        icon: <IconSpacingHorizontal />,
      };
    case Object.keys(orderStatusConst).indexOf('UNLOADING'):
      return {
        value: orderStatusConst['UNLOADING'],
        label: 'UNLOADING',
        color: 'pink',
        icon: <IconPackageExport />,
      };
    case Object.keys(orderStatusConst).indexOf('COMPLETE'):
      return {
        value: orderStatusConst.COMPLETE,
        label: 'Completed',
        color: 'green',
        icon: <IconMoodCrazyHappy />,
      };
    case Object.keys(orderStatusConst).indexOf('PENDING'):
      return {
        value: orderStatusConst.PENDING,
        label: 'PENDING',
        color: 'yellow',
        icon: <IconHourglass />,
      };

    case Object.keys(orderStatusConst).indexOf('APPROVED'):
      return {
        value: orderStatusConst.APPROVED,
        label: 'APPROVED',
        color: 'indigo',
        icon: <IconChecks />,
      };

    case Object.keys(orderStatusConst).indexOf('CANCELLED'):
      return {
        value: orderStatusConst.CANCELLED,
        label: 'Cancelled',
        color: 'red',
        icon: <IconMoodSad />,
      };
    default:
      return {
        value: -1,
        label: 'Unknown',
        color: 'grey',
        icon: <IconHourglass />,
      };
  }
};

export const HumanizeDuration = ({
  durationData,
  format = [],
  shortHand = true,
}) => {
  //duration : number in milliseconds
  //format: array that includes the timestamps required.
  //format example: ['hour', 'minute', 'second', 'millisecond']
  //shortHand is for hrs or hours

  dayjs.extend(duration);
  dayjs.extend(relativeTime);

  let inMilliseconds = null;
  let inSeconds = null;
  let inMinutes = null;
  let inHours = null;

  if (format.length > 0) {
    if (
      format.includes('hour') ||
      format.includes('hours') ||
      format.includes('HOUR') ||
      format.includes('HOURS')
    ) {
      inHours = dayjs.duration(durationData).hours();
    }
    if (
      format.includes('minute') ||
      format.includes('minutes') ||
      format.includes('MINUTE') ||
      format.includes('MINUTES')
    ) {
      inMinutes = dayjs.duration(durationData).minutes();
    }
    if (
      format.includes('second') ||
      format.includes('seconds') ||
      format.includes('SECOND') ||
      format.includes('SECONDS')
    ) {
      inSeconds = dayjs.duration(durationData).seconds();
    }
    if (
      format.includes('millisecond') ||
      format.includes('milliseconds') ||
      format.includes('MILLISECOND') ||
      format.includes('MILLISECONDS')
    ) {
      inMilliseconds = dayjs.duration(durationData).milliseconds();
    }
  } else {
    inMilliseconds = dayjs.duration(durationData).milliseconds();
    inSeconds = dayjs.duration(durationData).seconds();
    inMinutes = dayjs.duration(durationData).minutes();
    inHours = dayjs.duration(durationData).hours();
  }

  if (shortHand) {
    return `${inHours ? inHours + ' hr' : ''} ${
      inMinutes ? inMinutes + ' min' : ''
    } ${inSeconds ? inSeconds + ' sec' : ''} ${
      inMilliseconds ? inMilliseconds + ' ms' : ''
    }`;
  } else {
    return `${inHours ? inHours + ' hours' : ''} ${
      inMinutes ? inMinutes + ' minutes' : ''
    } ${inSeconds ? inSeconds + ' seconds' : ''} ${
      inMilliseconds ? inMilliseconds + ' milliseconds' : ''
    }`;
  }
};

export const userWiseAutocompleteLocationDataWithId = ({
  appUser,
  locationData,
}) => {
  if (
    appUser.role === userRoles.ADMIN ||
    appUser.role === userRoles['SUPER ADMIN']
  ) {
    return locationData?.map((location) => ({
      id: location.id,
      value: location.name,
    }));
  } else {
    return appUser.locations.map((location) => ({
      id: location.id,
      value: location.name,
    }));
  }
};

export const userWiseAutocompleteLocationDataWithUid = ({
  appUser,
  locationData,
}) => {
  if (
    appUser.role === userRoles.ADMIN ||
    appUser.role === userRoles['SUPER ADMIN']
  ) {
    return locationData?.map((location) => ({
      uid: location.uid,
      value: location.name,
    }));
  } else {
    return appUser.locations.map((location) => ({
      uid: location.uid,
      value: location.name,
    }));
  }
};

export const userWiseMultiSelectLocationDataWithId = ({
  appUser,
  locationData,
}) => {
  if (
    appUser.role === userRoles.ADMIN ||
    appUser.role === userRoles['SUPER ADMIN']
  ) {
    return locationData?.map((location) => ({
      label: location?.name || location.uid,
      value: location?.id,
    }));
  } else {
    return appUser.locations.map((location) => ({
      label: location?.name || location.uid,
      value: location?.id,
    }));
  }
};

export const scanActionBadgeColorMapper = (scanAction) => {
  switch (scanAction) {
    case 'SCANNED IN':
      return 'green';

    case 'SCANNED OUT':
      return 'blue';

    case 'BLOCKED':
      return 'red';

    default:
      break;
  }
};

export const isScanOutable = ({ appUser, destinationLocation }) => {
  if (
    appUser.role === userRoles.ADMIN ||
    appUser.role === userRoles['SUPER ADMIN']
  ) {
    return false;
  } else {
    let doesLocationExist = false;
    appUser.locations.map((location) => {
      if (location.id === destinationLocation.id) {
        doesLocationExist = true;
      }
    });
    if (doesLocationExist) {
      return true;
    } else {
      return false;
    }
  }
};

export const isReopenable = (openedAt) => {
  if (openedAt === null) return true;
  const currentTime = dayjs();
  const openedTime = dayjs(openedAt);

  const hoursDifference = currentTime.diff(openedTime, 'hour');

  if (hoursDifference >= 24) {
    return false;
  } else {
    return true;
  }
};
