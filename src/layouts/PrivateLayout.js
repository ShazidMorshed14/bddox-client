import React from 'react';
import { Outlet } from 'react-router-dom';
import {
  AppShell,
  Avatar,
  Button,
  Flex,
  Navbar,
  ScrollArea,
  Space,
  Text,
  UnstyledButton,
} from '@mantine/core';
import NavBarItem from '../components/layouts/NavbarItem';
import navItems from '../constants/nav-items';
import useStyles from '../styles/nav-styles';
import { useSelector } from 'react-redux';

import { appEnv } from '../apps/App';
import { IconLogout } from '@tabler/icons-react';

const PrivateLayout = () => {
  const classes = useStyles();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {};
  return (
    <AppShell
      className={classes.appShell}
      navbar={
        <Navbar width={{ base: 220 }} height="100vh" p="md">
          <Navbar.Section className={classes.navTitle}>
            <Text className={classes.navTitleLink}>
              <UnstyledButton
                component="a"
                href={user?.profileUrl}
                target="_blank">
                <Flex position="apart" w="100%">
                  <Avatar bg="#161616" color="#fff" src={user?.avatar} />
                  <Space w="sm" />
                  <Text size="sm" weight="bold">
                    {user?.name} <br />
                    <span style={{ fontWeight: 300, fontSize: 12 }}>
                      {user?.handle}
                    </span>
                  </Text>
                </Flex>
              </UnstyledButton>
            </Text>
          </Navbar.Section>
          <Navbar.Section grow component={ScrollArea} className={classes.links}>
            <Space h={15} />
            <div className={classes.linksInner}>
              {navItems.map((item, index) => (
                <NavBarItem key={index} {...item} />
              ))}
            </div>
            <Space h={15} />
          </Navbar.Section>
          <Navbar.Section className={classes.navFooter}>
            <Text align="center" fz="xs" c="dimmed">
              Developed by Manush Technologies Ltd
            </Text>
            <Space h="xs" />
            <Text align="center" fz="xs" c="dimmed">
              Version: {appEnv.appName} - {appEnv.version}
            </Text>
            <Space h="sm" />
            <Button
              onClick={handleLogout}
              radius="xs"
              leftIcon={<IconLogout size={14} />}
              sx={{
                width: '100%',
              }}
              color="red">
              Logout
            </Button>
          </Navbar.Section>
        </Navbar>
      }>
      <Outlet />
    </AppShell>
  );
};

export default PrivateLayout;
