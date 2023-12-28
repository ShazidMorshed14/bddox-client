import { Button, Flex, Space, Text } from '@mantine/core';
import React from 'react';
import COLORS from '../../constants/colors';
import { useNavigate } from 'react-router-dom';
import Lottie from 'react-lottie';
import animationData from '../../assets/animations/prescription-writing.json';
import { IconPlus } from '@tabler/icons-react';

const lottieOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

const CreatePrescriptionBox = () => {
  const navigate = useNavigate();

  return (
    <div className="card">
      <div className="card-body">
        <Flex justify="flex-end" align="center">
          <Button
            onClick={() => navigate('/prescription/create')}
            className="primary_btn"
            my="sm"
            leftIcon={<IconPlus />}>
            Create Prescription
          </Button>
        </Flex>
        <Flex
          direction="column"
          justify="center"
          align="center"
          style={{ height: '80vh' }}>
          <Lottie options={lottieOptions} height={400} width={400} />
          <Text fz="lg" fw={700} py="md" color={COLORS.fontSecondary}>
            Sorry! No Prescription Found!
          </Text>

          <Text fz="sm" color={COLORS.fontSecondary}>
            Looks like you havent built one yet!
          </Text>
        </Flex>
      </div>
    </div>
  );
};

export default CreatePrescriptionBox;
