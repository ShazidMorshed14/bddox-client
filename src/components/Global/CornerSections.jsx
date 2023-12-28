import { Box, Flex, Grid, SimpleGrid, Text } from '@mantine/core';
import {
  IconMedicineSyrup,
  IconUser,
  IconUserCircle,
} from '@tabler/icons-react';
import React from 'react';
import COLORS from '../../constants/colors';
import CornerCards from './CornerCards';

const CornerSections = () => {
  return (
    <SimpleGrid
      cols={2}
      breakpoints={[
        { maxWidth: 'lg', cols: 2, spacing: 'sm' },
        { maxWidth: 'md', cols: 2, spacing: 'md' },
        { maxWidth: 'sm', cols: 1, spacing: 'sm' },
        { maxWidth: 'xs', cols: 1, spacing: 'sm' },
      ]}>
      <CornerCards
        title="Medicine Corner"
        description="Add your medicines and get suggetions now!"
        icon={<IconMedicineSyrup color="white" size="2.5rem" />}
      />

      <CornerCards
        title="Patients Corner"
        description="Save Patient details and use digital prescription!"
        icon={<IconUser color="white" size="2.5rem" />}
      />
    </SimpleGrid>
  );
};

export default CornerSections;
