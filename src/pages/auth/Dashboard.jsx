import React from 'react';
import { useSelector } from 'react-redux';
import SignIn from './SignIn';
import { Navigate } from 'react-router-dom';
import DashboardSearchBox from '../../components/Global/DashboardSearchBox';
import { Grid } from '@mantine/core';
import WelcomeCard from '../../components/Global/WelcomeCard';
import CornerSections from '../../components/Global/CornerSections';

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
    </div>
  );
};

export default Dashboard;
