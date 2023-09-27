import {
  AppShell,
  Avatar,
  Badge,
  Center,
  Flex,
  Footer,
  HoverCard,
  Navbar,
  Stack,
  Text,
  Title,
  UnstyledButton,
} from '@mantine/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import useStyles from '../styles/nav-styles';

import { closeAllModals, openConfirmModal } from '@mantine/modals';
import {
  IconCheck,
  IconLogout,
  IconMail,
  IconPhone,
  IconX,
} from '@tabler/icons-react';

import NavbarLink from '../components/layouts/NavbarLink';
import NavbarLinks from '../components/layouts/NavbarLinks';
import COLORS from '../constants/colors';
import { logout } from '../services/auth';
import { authActions } from '../store/reducers/authReducer';
import { NotificationUtil } from '../utils/notifications';
//import { getInitialFromName } from '../utils/utils';
import { useQueryClient } from '@tanstack/react-query';
import { userBadgeBackgroundColors } from '../constants/const';
import SmallLogo from '../assets/logo/logo-small.png';

const PrivateLayout = () => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const user = useSelector((state) => state.auth.user);

  const logoutUser = async () => {
    try {
      const response = await logout();
      if (response.status === 200) {
        dispatch(authActions.signout());
        navigate('/');
        NotificationUtil({
          title: 'See you soon!',
          message: 'You have been logged out successfully',
          success: true,
        });
      }
    } catch (err) {
      dispatch(authActions.signout());
      navigate('/');
      NotificationUtil({
        title: 'See you soon!',
        message: 'You have been logged out successfully',
        success: true,
      });
    }
  };

  const openLogoutConfirmModal = () => {
    openConfirmModal({
      title: 'Are you sure?',
      children: <Text size="sm">Are you sure you want to logout?</Text>,
      labels: {
        confirm: 'Confirm',
        cancel: 'Cancel',
      },
      onCancel: () => {
        closeAllModals();
      },
      onConfirm: () => {
        logoutUser();
        queryClient.invalidateQueries();
        closeAllModals();
      },
    });
  };

  if (!user) {
    window.location.href = '/';
  }

  return (
    <AppShell
      className={classes.appShell}
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[8]
              : theme.colors.gray[1],
        },
      })}
      navbar={
        <Navbar
          // height={750}
          width={{ base: 220 }}
          p="md"
          sx={() => ({
            backgroundColor: '#ffffff',
          })}>
          {/* <Center>
            <HoverCard
              shadow="md"
              position="right"
              withArrow
              arrowPosition="side"
              sx={{
                maxWidth: 300,
              }}>
              <HoverCard.Target>
                <UnstyledButton>
                  <Avatar
                    bg="#161616"
                    color={COLORS.link_secondary}
                    style={{
                      borderRadius: '50%',
                      border: 'none',
                      outline: 'none !important',
                    }}
                    src={user?.avatar}>
               
                  </Avatar>
                </UnstyledButton>
              </HoverCard.Target>
              <HoverCard.Dropdown>
                <Stack>
                  <Stack spacing={0}>
                    <Flex gap={10} align="center" wrap="wrap">
                      <Title order={4}>{user?.name}</Title>
                      <Badge
                        sx={{
                          background: userBadgeBackgroundColors[user?.role],
                          color: COLORS[user?.role],
                        }}>
                        {user?.role}
                      </Badge>
                      <Badge
                        color={user?.status === 'ACTIVE' ? 'green' : 'red'}>
                        {user?.status}
                      </Badge>
                      <Badge
                        color={user?.isMfaEnabled ? 'green' : 'gray'}
                        variant="outline">
                        <Flex gap={2} align="center" justify="space-between">
                          {user?.isMfaEnabled ? (
                            <IconCheck size={12} />
                          ) : (
                            <IconX size={12} />
                          )}
                          <Text>MFA</Text>
                        </Flex>
                      </Badge>
                    </Flex>
                    <Text size="sm">{user?.designation}</Text>
                  </Stack>
                  <Flex gap={5}>
                    <IconMail size={20} />
                    <Text size="sm">{user?.email}</Text>
                  </Flex>
                  <Flex gap={5}>
                    <IconPhone size={20} />
                    <Text size="sm">{user?.phone}</Text>
                  </Flex>
                  <Flex gap={5} align="center" wrap="wrap">
                    {user?.locations?.map((location, index) => (
                      <Badge key={index} color="grape">
                        {location.name}
                      </Badge>
                    ))}
                  </Flex>
                </Stack>
              </HoverCard.Dropdown>
            </HoverCard>
          </Center> */}

          <Center>
            <img src={SmallLogo} style={{ height: '4rem' }} />
          </Center>
          <Navbar.Section grow mt={50}>
            <NavbarLinks />
          </Navbar.Section>
          <Navbar.Section>
            <Stack justify="center" spacing={0}>
              <NavbarLink
                icon={IconLogout}
                label="Logout"
                onClick={() => openLogoutConfirmModal()}
              />
            </Stack>
          </Navbar.Section>
        </Navbar>
      }
      // footer={
      //   <Footer
      //     fixed
      //     sx={{
      //       borderTop: 'none',
      //     }}>
      //     <CustomFooter />
      //   </Footer>
      // }
    >
      <Outlet />
    </AppShell>
  );
};

export default PrivateLayout;
