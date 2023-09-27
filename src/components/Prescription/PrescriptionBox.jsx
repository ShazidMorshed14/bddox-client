import React from 'react';
import '../../styles/prescription-styles.scss';
import { Flex, Grid, ScrollArea, Text } from '@mantine/core';
import { isArrayAndHasContent } from '../../utils/utils';
import dayjs from 'dayjs';
import { calculateAge } from '../../constants/const';

const PrescriptionBox = ({
  topLeft,
  topRight,
  bottomLeft,
  bottomRight,
  patientDetails,
  appointmentDetails,
  ccs,
  oes,
  advices,
  medicines,
  componentRef,
}) => {
  return (
    <ScrollArea style={{ height: '90vh' }}>
      <div className="card">
        <div className="card-body">
          <div className="prescription_wrapper" ref={componentRef}>
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
                    Name : {patientDetails?.name || 'N/A'}
                  </Text>
                </div>

                <div className="item-section">
                  <Text fz="xs" fw={600}>
                    Age :{' '}
                    {patientDetails?.dob
                      ? calculateAge(patientDetails?.dob)
                      : 'N/A'}
                  </Text>
                </div>

                {/* <div className="item-section">
                  <Text fz="xs" fw={600}>
                    Weight : {patientDetails?.weight || 'N/A'}
                  </Text>
                </div> */}

                <div className="item-section">
                  <Text fz="xs" fw={600}>
                    Date : {dayjs().format('DD-MM-YYYY')}
                  </Text>
                </div>
              </Flex>
            </div>

            <div className="main_body_section">
              <div className="main_body_left_section">
                <div className="main_body_left_section_inner">
                  <Flex direction="column" gap={10}>
                    <div className="cc_box each_box">
                      <Text fz="sm">C/C:</Text>
                      {isArrayAndHasContent(ccs) ? (
                        <Flex direction="column" gap={5} py="sm">
                          {ccs.map((cc, index) => {
                            return (
                              <Text fz="xs" key={index}>
                                {cc.value}
                              </Text>
                            );
                          })}
                        </Flex>
                      ) : (
                        <></>
                      )}
                    </div>

                    <div className="oe_box each_box">
                      <Text fz="sm">O/E:</Text>
                      {isArrayAndHasContent(oes) ? (
                        <Flex direction="column" gap={5} py="sm">
                          {oes.map((oe, index) => {
                            return (
                              <Text fz="xs" key={index}>
                                {oe.value}
                              </Text>
                            );
                          })}
                        </Flex>
                      ) : (
                        <></>
                      )}
                    </div>

                    <div className="advice_box each_box">
                      <Text fz="sm">Advice:</Text>
                      {isArrayAndHasContent(advices) ? (
                        <Flex direction="column" gap={5} py="sm">
                          {advices.map((advice, index) => {
                            return (
                              <Text fz="xs" key={index}>
                                {advice.value}
                              </Text>
                            );
                          })}
                        </Flex>
                      ) : (
                        <></>
                      )}
                    </div>
                  </Flex>
                </div>
              </div>

              <div className="main_body_right_section">
                <div className="main_body_right_section_inner">
                  <Text fw={600} fz="xl">
                    Rx
                  </Text>
                </div>
              </div>
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

            <div className="bottom_section_last">
              <Flex justify="space-between" align="center" gap={5}>
                <Text fz="xs" fw={600} p="xs">
                  {patientDetails?.pid || 'N/A'}
                </Text>

                <Text fz="xs" fw={600} p="xs">
                  {appointmentDetails?.aid || 'N/A'}
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

export default PrescriptionBox;
