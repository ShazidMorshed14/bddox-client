import { Button, Flex, Grid, Loader, Stack, Text } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router-dom';
import CommonHeader from '../components/Global/CommonHeader';
import { fetchAppointmentDetails } from '../services/appointment';
import { fetchDoctorPrescription } from '../services/prescription';
import PrescriptionBox from '../components/Prescription/PrescriptionBox';
import ServerErrorBox from '../components/Global/ServerErrorBox';
import { IconDownload } from '@tabler/icons-react';
import COLORS from '../constants/colors';
import { useState } from 'react';
import CcModal from '../components/Modals/CcModal';
import OeModal from '../components/Modals/OeModal';
import AdviceModal from '../components/Modals/AdviceModal';

import ReactToPrint from 'react-to-print';
import { useRef } from 'react';
import MedicineSelectModal from '../components/Modals/MedicineSelectModal';

const AssignPrescription = () => {
  const { appointmentId } = useParams();

  const [ccModal, setCcModal] = useState(false);
  const [oeModal, setOeModal] = useState(false);
  const [adviceModal, setAdviceModal] = useState(false);
  const [medicineModal, setMedicineModal] = useState(false);

  const [ccs, setCcs] = useState([]);
  const [oes, setOes] = useState([]);
  const [advices, setAdvices] = useState([]);
  const [medicines, setMedicines] = useState([]);

  const componentRef = useRef();

  const {
    data: prescriptionDetails,
    isLoading: prescriptionDetailsIsLoading,
    error: prescriptionDetailsError,
    isFetching: prescriptionDetailsIsFetching,
  } = useQuery({
    queryKey: ['fetch-prescription', null, null, null, true],
    queryFn: fetchDoctorPrescription,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    retry: false,
  });

  const {
    data: appointmentDetails,
    isLoading: appointmentDetailsLoading,
    error: appointmentDetailsError,
    isFetching: appointmentDetailsIsFetching,
  } = useQuery({
    queryKey: ['fetch-appointment-details', appointmentId],
    queryFn: fetchAppointmentDetails,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    retry: false,
  });

  if (appointmentDetailsLoading || prescriptionDetailsIsLoading)
    return (
      <div>
        <Flex
          w="100%"
          justify="flex-start"
          align="center"
          sx={{
            padding: '10px',
            borderRadius: '4px',
            //border: '1px solid rgba(0,0,0,0.2)',
          }}>
          <CommonHeader title="Add Prescription" />
        </Flex>
        <Stack
          sx={{
            minHeight: '70vh',
          }}
          justify="center"
          align="center">
          <Loader size="md" variant="dots" />
        </Stack>
      </div>
    );

  if (appointmentDetailsError || prescriptionDetailsError)
    return (
      <div>
        <ServerErrorBox apiError={true} />
      </div>
    );

  return (
    <div>
      {/* c/c modal */}
      <CcModal
        opened={ccModal}
        close={() => setCcModal(false)}
        ccs={ccs}
        setCcs={setCcs}
      />

      {/* o/e modal */}
      <OeModal
        opened={oeModal}
        close={() => setOeModal(false)}
        oes={oes}
        setOes={setOes}
      />

      {/* advice modal */}
      <AdviceModal
        opened={adviceModal}
        close={() => setAdviceModal(false)}
        advices={advices}
        setAdvices={setAdvices}
      />

      {/* medicine modal */}
      <MedicineSelectModal
        opened={medicineModal}
        close={() => setMedicineModal(false)}
        medicines={medicines}
        setMedicines={setMedicines}
      />

      <Flex
        w="100%"
        justify="flex-start"
        align="center"
        sx={{
          // padding: '10px',
          borderRadius: '4px',
          //border: '1px solid rgba(0,0,0,0.2)',
        }}>
        <CommonHeader title="Add Prescription" />
      </Flex>

      {prescriptionDetailsIsFetching || appointmentDetailsIsFetching ? (
        <div>
          <div className="card">
            <div className="card-body">
              <Stack
                sx={{
                  minHeight: '80vh',
                }}
                justify="center"
                align="center">
                <Flex
                  direction="column"
                  gap={10}
                  justify="center"
                  align="center">
                  <Loader size="md" variant="dots" />
                  <Text fz="xs" fw={600} color="dimmed">
                    Loading Please wait...
                  </Text>
                </Flex>
              </Stack>
            </div>
          </div>
        </div>
      ) : (
        <Grid>
          <Grid.Col xl={8} lg={8} md={8} sm={12}>
            <PrescriptionBox
              topLeft={prescriptionDetails?.data?.data?.topLeft}
              topRight={prescriptionDetails?.data?.data?.topRight}
              bottomLeft={prescriptionDetails?.data?.data?.bottomLeft}
              bottomRight={prescriptionDetails?.data?.data?.bottomRight}
              patientDetails={appointmentDetails?.data?.data?.patientId}
              appointmentDetails={appointmentDetails?.data?.data}
              ccs={ccs}
              oes={oes}
              advices={advices}
              medicines={medicines}
              componentRef={componentRef}
            />
          </Grid.Col>

          <Grid.Col xl={4} lg={4} md={4} sm={12}>
            <Flex direction="column" gap={10}>
              <ReactToPrint
                trigger={() => (
                  <Button
                    className="primary_btn"
                    rightIcon={<IconDownload size={18} />}>
                    Print
                  </Button>
                )}
                content={() => componentRef.current}
              />

              <Button className="primary_btn" onClick={() => setCcModal(true)}>
                C/C
              </Button>
              <Button className="primary_btn" onClick={() => setOeModal(true)}>
                O/E
              </Button>
              <Button
                className="primary_btn"
                onClick={() => setAdviceModal(true)}>
                Advice
              </Button>
              <Button
                className="primary_btn"
                onClick={() => setMedicineModal(true)}>
                Medicines
              </Button>
            </Flex>
          </Grid.Col>
        </Grid>
      )}
    </div>
  );
};

export default AssignPrescription;
