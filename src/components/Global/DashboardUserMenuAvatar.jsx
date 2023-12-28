import { Menu, Button, Text, Indicator } from '@mantine/core';
import {
  IconSettings,
  IconSearch,
  IconPhoto,
  IconMessageCircle,
  IconTrash,
  IconArrowsLeftRight,
  IconUser,
  IconPhone,
  IconLogout,
} from '@tabler/icons-react';

import { Avatar } from '@mantine/core';

const DashboardUserMenuAvatar = () => {
  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Indicator
          inline
          size={14}
          offset={4}
          position="bottom-end"
          color="green"
          withBorder>
          <Avatar
            radius="xl"
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80"
          />
        </Indicator>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Application</Menu.Label>
        <Menu.Item icon={<IconUser size={14} />}>Profile</Menu.Item>
        <Menu.Item icon={<IconSettings size={14} />}>Settings</Menu.Item>
        <Menu.Item icon={<IconMessageCircle size={14} />}>Messages</Menu.Item>
        <Menu.Item icon={<IconPhone size={14} />}>Help Line</Menu.Item>

        <Menu.Divider />

        <Menu.Label>Danger zone</Menu.Label>

        <Menu.Item color="red" icon={<IconLogout size={14} />}>
          Log Out
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default DashboardUserMenuAvatar;
