import React from 'react';
import '../../styles/prescription-styles.scss';
import { Flex, Grid, ScrollArea, Text } from '@mantine/core';

const PrescriptionTemplate = () => {
  return (
    <ScrollArea style={{ height: '90vh' }}>
      <div className="card">
        <div className="card-body">
          <div className="prescription_wrapper">
            <div className="top_section_wrapper">
              <Flex justify="space-between" align="center">
                <div className="top_left_box">top left</div>
                <div className="top_right_box">right left</div>
              </Flex>
            </div>

            <div className="patient_details_section">
              <Flex justify="space-between">
                <div className="item-section">
                  <Text fz="xs" fw={600}>
                    Name : Shazid Morshed
                  </Text>
                </div>

                <div className="item-section">
                  <Text fz="xs" fw={600}>
                    Age : 26
                  </Text>
                </div>

                <div className="item-section">
                  <Text fz="xs" fw={600}>
                    Weight : 67
                  </Text>
                </div>

                <div className="item-section">
                  <Text fz="xs" fw={600}>
                    Date : 04/08/2023
                  </Text>
                </div>
              </Flex>
            </div>

            <div className="main_body_section">
              <Grid style={{ height: '100% !important' }}>
                <Grid.Col
                  xl={2}
                  lg={2}
                  md={2}
                  sm={2}
                  xs={2}
                  style={{ height: '100% !important' }}>
                  <div className="main_body_left_section">
                    <div className="main_body_left_section_inner">left</div>
                  </div>
                </Grid.Col>
                <Grid.Col xl={10} lg={10} md={10} sm={10} xs={10}>
                  <div className="main_body_right_section">
                    <div className="main_body_right_section_inner">right</div>
                  </div>
                </Grid.Col>
              </Grid>
            </div>

            <div className="footer_section"></div>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
};

export default PrescriptionTemplate;
