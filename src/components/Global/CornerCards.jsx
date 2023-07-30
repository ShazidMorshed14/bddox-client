import { Box, Flex, Grid, SimpleGrid, Text } from '@mantine/core';
import { IconMedicineSyrup } from '@tabler/icons-react';
import React from 'react';
import COLORS from '../../constants/colors';

const CornerCards = ({ title, description, icon }) => {
  return (
    <div className="card" style={{ minHeight: '13em', cursor: 'pointer' }}>
      <div className="card-body">
        <Flex direction="column" justify="space-between" align="flex-start">
          <Flex justify="space-between" align="center" gap={10}>
            <Box
              sx={{
                backgroundColor: COLORS.primaryBtn,
                padding: '0.3rem',
                borderRadius: '12px',
              }}>
              {icon}
            </Box>
            <Text fz="xs">{description}</Text>
          </Flex>
          <h3 className="card-title mb-2">{title}</h3>
        </Flex>
      </div>
    </div>
  );
};

export default CornerCards;
