import React from 'react';
import { useSelector } from 'react-redux';
import SignIn from './SignIn';
import { Navigate } from 'react-router-dom';

const Dashboard = () => {
  const user = useSelector((state) => state?.auth?.user);
  const isAuth = useSelector((state) => state?.auth?.isAuth);

  if (!isAuth) {
    return <Navigate to={SignIn} />;
  }
  return <div>Dashboard</div>;
};

export default Dashboard;
