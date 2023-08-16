import { Flex, Modal, Text, Box, Button, TextInput, Grid } from '@mantine/core';
import React from 'react';
import COLORS from '../../constants/colors';
import { useQueryClient } from '@tanstack/react-query';
import { useForm } from '@mantine/form';
import { textFieldStyle } from '../../constants/styles';
import { DateInput } from '@mantine/dates';
import { useRef } from 'react';
import { ActionIcon } from '@mantine/core';
import { TimeInput } from '@mantine/dates';
import { IconClock } from '@tabler/icons-react';

const AppointmentModal = ({ opened, close, data }) => {
  const queryClient = useQueryClient();
  const inputEle = useRef();
  //console.log(data);

  const form = useForm({
    initialValues: {
      patientId: data._id,
      date: '',
      time: '',
    },

    validate: {
      patientId: (value) =>
        value.length < 1 ? 'patientId must be given' : null,
      date: (value) => (value.date < 1 ? 'date must be given' : null),
      time: (value) => (value.time < 1 ? 'time must be given' : null),
    },
  });

  const handleSubmit = (values) => {
    console.log(values);
  };
  return (
    <Modal
      opened={opened}
      onClose={close}
      title="Set Appointnment"
      size="lg"
      closeOnClickOutside={false}>
      <Flex gap={5} py="sm" justify="flex-start" align="center">
        <Text fz="md" fw={600}>
          Scheduling appointment for
        </Text>
        <Text fz="md" fw={700} color={COLORS.primaryBtn}>
          {data.name}-{data.pid}
        </Text>
      </Flex>

      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
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
            <Grid.Col md={6}>
              <div>
                <DateInput
                  //value={value}
                  onChange={(e) => form.setFieldValue('date', e)}
                  size="xs"
                  label="Date"
                  placeholder="Date"
                  {...form.getInputProps('date')}
                />
              </div>
            </Grid.Col>
            <Grid.Col md={6}>
              <div>
                <input
                  //ref={inputEle}
                  type="time"
                  id="appt"
                  name="appt"
                  //onChange={(e) => onTimeChange(e, form)}
                  {...form.getInputProps('time')}
                />
              </div>
            </Grid.Col>
          </Grid>

          <Flex my="sm" justify="flex-end" gap={10}>
            <Button size="xs" className="danger_btn">
              Cancel
            </Button>
            <Button size="xs" className="primary_btn" type="submit">
              Save
            </Button>
          </Flex>
        </Flex>
      </form>
    </Modal>
  );
};

export default AppointmentModal;
