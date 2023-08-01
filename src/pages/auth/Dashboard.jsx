import React from 'react';
import { useSelector } from 'react-redux';
import SignIn from './SignIn';
import { Navigate } from 'react-router-dom';
import DashboardSearchBox from '../../components/Global/DashboardSearchBox';
import { Box, Flex, Grid } from '@mantine/core';
import WelcomeCard from '../../components/Global/WelcomeCard';
import CornerSections from '../../components/Global/CornerSections';
import DemoTable from '../../components/Tables/DemoTable';
import { dummyTableData } from '../../constants/dummy-data';
import DemoForm from '../../components/Forms/DemoForm';

const Dashboard = () => {
  return (
    <div>
      <DashboardSearchBox />
      <Grid my="10px">
        <Grid.Col md={7} lg={7} sm={12} xs={12}>
          <WelcomeCard name="Dr.Jamil" />
        </Grid.Col>
        <Grid.Col md={5} lg={5} sm={12} xs={12}>
          <CornerSections />
        </Grid.Col>
      </Grid>

      <div>
        <DemoTable data={dummyTableData} />
      </div>

      <Box my="md">
        <DemoForm />
      </Box>
    </div>
  );
};

export default Dashboard;
