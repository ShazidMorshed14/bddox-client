import { Flex, Paper, TextInput } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import React from 'react';
import DashboardUserMenuAvatar from './DashboardUserMenuAvatar';

const DashboardSearchBox = () => {
  return (
    <Paper mt="5px" className="card">
      <div className="card-body-sm-padding">
        <Flex justify="space-between" align="center">
          <Flex gap={8} justify="center" align="center">
            <IconSearch />
            <TextInput placeholder="Search..." variant="unstyled" size="sm" />
          </Flex>

          <DashboardUserMenuAvatar />
        </Flex>
      </div>
    </Paper>
  );
};

export default DashboardSearchBox;
