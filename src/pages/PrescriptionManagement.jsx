import React, { useEffect, useRef, useState } from 'react';
import CommonHeader from '../components/Global/CommonHeader';
import {
  Button,
  Flex,
  Grid,
  Loader,
  ScrollArea,
  Stack,
  Text,
} from '@mantine/core';
import {
  fetchDoctorPrescription,
  updatePrescription,
} from '../services/prescription';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import ServerErrorBox from '../components/Global/ServerErrorBox';
import PrescriptionTemplate from '../components/Prescription/PrescriptionTemplate';
import CreatePrescriptionBox from '../components/Global/CreatePrescriptionBox';
import JoditEditor from 'jodit-react';
import { openConfirmModal } from '@mantine/modals';
import { NotificationUtil } from '../utils/notifications';

const PrescriptionManagement = () => {
  const queryClient = useQueryClient();

  const topLeftEditor = useRef(null);
  const topRightEditor = useRef(null);
  const bottomLeftEditor = useRef(null);
  const bottomRightEditor = useRef(null);

  const [topLeft, setTopLeft] = useState(null);
  const [topRight, setTopRight] = useState(null);
  const [bottomLeft, setBottomLeft] = useState(null);
  const [bottomRight, setBottomRight] = useState(null);

  const { data, isLoading, error, isFetching } = useQuery({
    queryKey: ['fetch-prescription', null, null, null, true],
    queryFn: fetchDoctorPrescription,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    retry: false,
  });

  useEffect(() => {
    if (data) {
      setTopLeft(data?.data?.data?.topLeft);
      setTopRight(data?.data?.data?.topRight);
      setBottomLeft(data?.data?.data?.bottomLeft);
      setBottomRight(data?.data?.data?.bottomRight);
    }
  }, [data]);

  const refetchPrescription = async () => {
    await queryClient.refetchQueries({
      queryKey: ['fetch-prescription'],
      type: 'active',
    });
  };

  const { mutate: updateMutate, isLoading: updating } = useMutation({
    mutationFn: async (values) => await updatePrescription(values),
    onSuccess: () => {
      NotificationUtil({
        success: true,
        title: 'Success',
        message: 'Prescription Updated successfully',
      });
      refetchPrescription();
    },
    onError: (error) => {
      NotificationUtil({
        success: false,
        title: 'Error',
        message: error.response.data.message,
      });
    },
  });

  const ConfirmModal = (values) => {
    openConfirmModal({
      title: 'Confirm',
      styles: () => ({
        title: {
          fontSize: '22px',
          fontWeight: 'bold',
        },
      }),
      children: <Text size="sm">Are you sure you want to save this?</Text>,
      confirmProps: { color: 'green' },
      labels: { confirm: 'Confirm', cancel: 'Cancel' },
      onConfirm: () => {
        updateMutate(values);
      },
    });
  };

  const handleSubmit = () => {
    const reqBody = {
      id: data?.data?.data?._id,
      topLeft: topLeft,
      topRight: topRight,
      bottomLeft: bottomLeft,
      bottomRight: bottomRight,
    };
    ConfirmModal(reqBody);
  };

  if (isLoading)
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
          <CommonHeader title="Prescription Corner" />
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

  if (error)
    return (
      <div>
        <ServerErrorBox apiError={true} />
      </div>
    );

  if (!data?.data?.data) {
    return <CreatePrescriptionBox />;
  }

  return (
    <div>
      <Flex
        w="100%"
        justify="flex-start"
        align="center"
        sx={{
          // padding: '10px',
          borderRadius: '4px',
          //border: '1px solid rgba(0,0,0,0.2)',
        }}>
        <CommonHeader title="Prescription Corner" />
      </Flex>

      {isFetching ? (
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
                    Updating Please wait...
                  </Text>
                </Flex>
              </Stack>
            </div>
          </div>
        </div>
      ) : (
        <Grid>
          <Grid.Col xl={7} lg={7} md={7} sm={12}>
            <PrescriptionTemplate
              topLeft={topLeft}
              topRight={topRight}
              bottomLeft={bottomLeft}
              bottomRight={bottomRight}
            />
          </Grid.Col>
          <Grid.Col xl={5} lg={5} md={5} sm={5}>
            <div className="card">
              <div className="card-body">
                <Flex direction="column" justify="flex-start" gap={10}>
                  <Flex justify="flex-start" align="center">
                    <div className="form-title">Update Prescription</div>
                  </Flex>
                  <ScrollArea style={{ height: '70vh' }}>
                    <div>
                      <p className="form-label">Top Left</p>
                      <JoditEditor
                        ref={topLeftEditor}
                        value={topLeft}
                        //config={config}
                        tabIndex={1} // tabIndex of textarea
                        onChange={(newContent) => setTopLeft(newContent)}
                      />
                    </div>

                    <div>
                      <p className="form-label">Top Right</p>
                      <JoditEditor
                        ref={topRightEditor}
                        value={topRight}
                        //config={config}
                        tabIndex={1} // tabIndex of textarea
                        onChange={(newContent) => setTopRight(newContent)}
                      />
                    </div>

                    <div>
                      <p className="form-label">Bottom Left</p>
                      <JoditEditor
                        ref={bottomLeftEditor}
                        value={bottomLeft}
                        //config={config}
                        tabIndex={1} // tabIndex of textarea
                        onChange={(newContent) => setBottomLeft(newContent)}
                      />
                    </div>

                    <div>
                      <p className="form-label">Bottom Right</p>
                      <JoditEditor
                        ref={bottomRightEditor}
                        value={bottomRight}
                        //config={config}
                        tabIndex={1} // tabIndex of textarea
                        onChange={(newContent) => setBottomRight(newContent)}
                      />
                    </div>
                  </ScrollArea>

                  <Flex my="sm" justify="flex-end" gap={10}>
                    <Button size="sm" className="danger_btn">
                      Cancel
                    </Button>
                    <Button
                      onClick={() => handleSubmit()}
                      disabled={updating}
                      size="sm"
                      className="primary_btn"
                      type="submit">
                      Save Changes
                    </Button>
                  </Flex>
                </Flex>
              </div>
            </div>
          </Grid.Col>
        </Grid>
      )}
    </div>
  );
};

export default PrescriptionManagement;
