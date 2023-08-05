import { Button, Flex, Grid, ScrollArea, Text } from '@mantine/core';
import { openConfirmModal } from '@mantine/modals';
import { useMutation } from '@tanstack/react-query';
import JoditEditor from 'jodit-react';
import React, { useRef, useState } from 'react';
import CommonHeader from '../components/Global/CommonHeader';
import PrescriptionTemplate from '../components/Prescription/PrescriptionTemplate';
import { createPrescription } from '../services/prescription';
import { NotificationUtil } from '../utils/notifications';
import { useNavigate } from 'react-router-dom';

const PrescriptionCreate = () => {
  const navigate = useNavigate();

  const topLeftEditor = useRef(null);
  const topRightEditor = useRef(null);
  const bottomLeftEditor = useRef(null);
  const bottomRightEditor = useRef(null);

  const [topLeft, setTopLeft] = useState(null);
  const [topRight, setTopRight] = useState(null);
  const [bottomLeft, setBottomLeft] = useState(null);
  const [bottomRight, setBottomRight] = useState(null);

  const { mutate: createMutate, isLoading } = useMutation({
    mutationFn: async (values) => await createPrescription(values),
    onSuccess: () => {
      NotificationUtil({
        success: true,
        title: 'Success',
        message: 'Prescription created successfully',
      });
      navigate('/prescription');
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
        createMutate(values);
      },
    });
  };

  const handleSubmit = () => {
    const reqBody = {
      topLeft: topLeft,
      topRight: topRight,
      bottomLeft: bottomLeft,
      bottomRight: bottomRight,
    };
    ConfirmModal(reqBody);
  };

  const handleReset = () => {
    setTopLeft(null);
    setTopRight(null);
    setBottomLeft(null);
    setBottomRight(null);
  };

  return (
    <div>
      <Flex justify="flex-start" align="center">
        <CommonHeader title="Create Prescription" />
      </Flex>

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
                <Flex justify="space-between" align="center">
                  <div className="form-title">Create Prescription</div>
                  <Button className="danger_btn" onClick={() => handleReset()}>
                    Reset
                  </Button>
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
                    size="sm"
                    className="primary_btn"
                    type="submit"
                    disabled={isLoading}
                    onClick={() => handleSubmit()}>
                    Save
                  </Button>
                </Flex>
              </Flex>
            </div>
          </div>
        </Grid.Col>
      </Grid>
    </div>
  );
};

export default PrescriptionCreate;
