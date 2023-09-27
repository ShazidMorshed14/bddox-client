import {
  Flex,
  Modal,
  Text,
  Box,
  Button,
  TextInput,
  Grid,
  Select,
} from '@mantine/core';
import React from 'react';
import COLORS from '../../constants/colors';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from '@mantine/form';
import { textFieldStyle } from '../../constants/styles';
import { DateInput } from '@mantine/dates';
import { useRef } from 'react';
import { ActionIcon } from '@mantine/core';
import { TimeInput } from '@mantine/dates';
import {
  IconBellDollar,
  IconClock,
  IconCoinMonero,
  IconDatabase,
  IconMoneybag,
} from '@tabler/icons-react';
import {
  DateInputDateConvert,
  formatTime,
  handleErrorResponse,
} from '../../utils/utils';
import { NotificationUtil } from '../../utils/notifications';
import { formatDateForDob } from '../../constants/const';
import { createAppointment } from '../../services/appointment';

const AppointmentModal = ({ opened, close, data }) => {
  const queryClient = useQueryClient();
  const ref = useRef();
  //console.log(data);

  const form = useForm({
    initialValues: {
      patientId: data._id,
      date: '',
      time: '',
      next_visiting_date: '',
      payment: 0,
      payment_status: 'unpaid',
      status: 'pending',
    },

    validate: {
      patientId: (value) =>
        value.length < 1 ? 'patientId must be given' : null,
      date: (value) => (value.length < 1 ? 'date must be given' : null),
      time: (value) => (value.length < 1 ? 'time must be given' : null),
      payment: (value) =>
        value.length < 1 ? 'Next Visiting Date Must be Given' : null,
      payment_status: (value) =>
        value.length < 1 ? 'Next Visiting Date Must be Given' : null,
      status: (value) =>
        value.length < 1 ? 'Next Visiting Date Must be Given' : null,
    },
  });

  const refetchAppointments = async () => {
    queryClient.invalidateQueries('fetch-appointments');
    await queryClient.refetchQueries({
      queryKey: ['fetch-appointments'],
      type: 'active',
    });
  };

  const {
    mutate: addAppointmentMutate,
    isMutating,
    isLoading,
  } = useMutation({
    mutationFn: (value) => createAppointment(value),
    onError: (error) => {
      handleErrorResponse(error);
    },
    onSuccess: (response) => {
      if (response) {
        refetchAppointments();
        NotificationUtil({
          success: true,
          title: 'Success',
          message: 'Appointment Scheduled successfully!',
        });
        form.reset();
        close();
      }
    },
  });

  const handleSubmit = (values) => {
    const reqBody = {
      ...values,
      date: formatDateForDob(values.date),
      next_visiting_date: values.next_visiting_date
        ? formatDateForDob(values.next_visiting_date)
        : null,
      time: formatTime(values.time),
    };
    addAppointmentMutate(reqBody);
  };
  return (
    <Modal
      opened={opened}
      onClose={close}
      title="Schedule Appointnment"
      size="xl"
      closeOnClickOutside={false}>
      <div>
        <Flex gap={5} py="sm" justify="flex-start" align="center">
          <Text fz="md" fw={600}>
            Scheduling appointment for
          </Text>
          <Text fz="md" fw={700} color={COLORS.primaryBtn}>
            {data.name}-{data.pid}
          </Text>
        </Flex>

        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <Flex
            direction="column"
            justify="space-between"
            style={{ minHeight: '65vh' }}>
            <Flex direction="column" justify="flex-start" gap={10}>
              <div>
                <TextInput
                  //placeholder="Ex. Shazid Morshed"
                  label="Patient Id"
                  size="xs"
                  disabled
                  {...form.getInputProps('patientId')}
                />
              </div>
              <Grid>
                <Grid.Col lg={6} md={6} sm={12} xs={12}>
                  <div>
                    <DateInput
                      size="xs"
                      label="Date"
                      placeholder="Date"
                      withAsterisk
                      {...form.getInputProps('date')}
                    />
                  </div>
                </Grid.Col>
                <Grid.Col lg={6} md={6} sm={12} xs={12}>
                  <div>
                    <TimeInput
                      size="xs"
                      label="Time"
                      ref={ref}
                      withAsterisk
                      rightSection={
                        <ActionIcon onClick={() => ref.current.showPicker()}>
                          <IconClock size="1rem" stroke={1.5} />
                        </ActionIcon>
                      }
                      {...form.getInputProps('time')}
                    />
                  </div>
                </Grid.Col>
              </Grid>

              <Grid>
                <Grid.Col lg={4} md={4} sm={12} xs={12}>
                  <div>
                    <DateInput
                      size="xs"
                      label="Next Visiting Date"
                      placeholder="Next Visiting Date"
                      {...form.getInputProps('next_visiting_date')}
                    />
                  </div>
                </Grid.Col>
                <Grid.Col lg={4} md={4} sm={12} xs={12}>
                  <div>
                    <TextInput
                      placeholder="Ex. 500"
                      label="Payment"
                      size="xs"
                      fw={600}
                      color={COLORS.green}
                      icon={<IconCoinMonero size="0.8rem" />}
                      type="Number"
                      {...form.getInputProps('payment')}
                    />
                  </div>
                </Grid.Col>
                <Grid.Col lg={4} md={4} sm={12} xs={12}>
                  <div>
                    <Select
                      size="xs"
                      label="Payment Status"
                      withAsterisk
                      data={[
                        { value: 'unpaid', label: 'Unpaid' },
                        { value: 'paid', label: 'Paid' },
                      ]}
                      {...form.getInputProps('payment_status')}
                    />
                  </div>
                </Grid.Col>
              </Grid>

              <Flex>
                <div>
                  <Select
                    size="xs"
                    label="status"
                    withAsterisk
                    data={[
                      { value: 'pending', label: 'Pending' },
                      { value: 'postponded', label: 'Postponded' },
                      { value: 'cancelled', label: 'Cancelled' },
                      { value: 'completed', label: 'Completed' },
                    ]}
                    {...form.getInputProps('status')}
                  />
                </div>
              </Flex>
            </Flex>

            <Flex my="sm" justify="flex-end" gap={10}>
              <Button size="xs" className="danger_btn">
                Cancel
              </Button>
              {isLoading ? (
                <Button leftIcon={<IconDatabase size="1rem" />} loading>
                  Please wait..
                </Button>
              ) : (
                <Button size="xs" className="primary_btn" type="submit">
                  Save
                </Button>
              )}
            </Flex>
          </Flex>
        </form>
      </div>
    </Modal>
  );
};

export default AppointmentModal;
