import React from 'react';
import '../../styles/prescription-styles.scss';
import { Flex, Grid, ScrollArea, Text } from '@mantine/core';

const PrescriptionTemplate = ({
  topLeft,
  topRight,
  bottomLeft,
  bottomRight,
}) => {
  console.log(topLeft);
  return (
    <ScrollArea style={{ height: '90vh' }}>
      <div className="card">
        <div className="card-body">
          <div className="prescription_wrapper">
            <div className="top_section_wrapper">
              <Flex justify="space-between" align="center">
                <div className="top_left_box">
                  <div dangerouslySetInnerHTML={{ __html: topLeft }} />
                </div>
                <div className="top_right_box">
                  <div dangerouslySetInnerHTML={{ __html: topRight }} />
                </div>
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
                  xl={3}
                  lg={3}
                  md={3}
                  sm={3}
                  xs={3}
                  style={{ height: '100% !important' }}>
                  <div className="main_body_left_section">
                    <div className="main_body_left_section_inner">
                      <Flex direction="column" gap={10}>
                        <div className="cc_box each_box">
                          <Text fz="sm">C/C:</Text>
                        </div>

                        <div className="oe_box each_box">
                          <Text fz="sm">O/E:</Text>
                        </div>

                        <div className="advice_box each_box">
                          <Text fz="sm">advice:</Text>
                        </div>
                      </Flex>
                    </div>
                  </div>
                </Grid.Col>
                <Grid.Col xl={9} lg={9} md={9} sm={9} xs={9}>
                  <div className="main_body_right_section">
                    <div className="main_body_right_section_inner">Rx</div>
                  </div>
                </Grid.Col>
              </Grid>
            </div>

            <div className="bottom_section">
              <Flex justify="space-between" align="center">
                <div className="bottom_left_box">
                  <div dangerouslySetInnerHTML={{ __html: bottomLeft }} />
                </div>
                <div className="bottom_right_box">
                  <div dangerouslySetInnerHTML={{ __html: bottomRight }} />
                </div>
              </Flex>
            </div>

            <div className="common_footer_section">
              <Flex justify="space-between" align="center" gap={5}>
                <Text fz="xs" fw={600} p="xs">
                  PID-12345
                </Text>
                <Text fz="xs" fw={600} p="xs">
                  All rights reserved by bddox
                </Text>
              </Flex>
            </div>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
};

export default PrescriptionTemplate;
