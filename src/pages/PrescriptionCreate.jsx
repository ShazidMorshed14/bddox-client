import { Flex, Grid, ScrollArea } from '@mantine/core';
import React from 'react';
import CommonHeader from '../components/Global/CommonHeader';
import PrescriptionTemplate from '../components/Prescription/PrescriptionTemplate';

const PrescriptionCreate = () => {
  return (
    <div>
      <Flex justify="flex-start" align="center">
        <CommonHeader title="Create Prescription" />
      </Flex>

      <Grid>
        <Grid.Col xl={8} lg={8} md={8} sm={12}>
          <PrescriptionTemplate />
        </Grid.Col>
        <Grid.Col xl={4} lg={4} md={4} sm={4}>
          <div className="card">
            <div className="card-body">
              <ScrollArea style={{ height: '85vh' }}>options here</ScrollArea>
            </div>
          </div>
        </Grid.Col>
      </Grid>
    </div>
  );
};

export default PrescriptionCreate;
