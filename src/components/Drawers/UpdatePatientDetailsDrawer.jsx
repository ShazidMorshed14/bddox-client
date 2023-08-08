import {
  Drawer,
  Grid,
  TextInput,
  Flex,
  Group,
  Button,
  Select,
  Paper,
  Textarea,
  Text,
} from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { formatDateForDob, parseFormattedDate } from '../../constants/const';
import { createPaient, updatePatientDetails } from '../../services/patient';
import { handleErrorResponse } from '../../utils/utils';
import { NotificationUtil } from '../../utils/notifications';
import { openConfirmModal } from '@mantine/modals';

const UpdatePatientDetailsDrawer = ({ opened, close, data }) => {
  const queryClient = useQueryClient();

  const form = useForm({
    initialValues: {
      name: data.name ? data.name : '',
      dob: data.dob ? parseFormattedDate(data.dob) : '',
      phone: data.phone ? data.phone : '',
      address: data.address ? data.address : '',
      gender: data.gender ? data.gender : 'male',
    },

    validate: {
      name: (value) => (value.length < 1 ? 'Name must be given' : null),
      dob: (value) => (value.length < 1 ? 'Date of Birth must be given' : null),
      phone: (value) => (value.length < 1 ? 'Phone must be given' : null),
      gender: (value) => (value.length < 1 ? 'Gender must be given' : null),
    },
  });

  const refetchPatients = async () => {
    await queryClient.refetchQueries({
      queryKey: ['fetch-patients'],
      type: 'active',
    });
  };

  const { mutate: updateMutate, isLoading } = useMutation({
    mutationFn: async (values) => await updatePatientDetails(values, data._id),
    onSuccess: () => {
      NotificationUtil({
        success: true,
        title: 'Success',
        message: 'Updated successfully',
      });
      refetchPatients();
      form.reset();
      close();
    },
    onError: (error) => {
      NotificationUtil({
        success: false,
        title: 'Error',
        message: error.response.data.message,
      });
    },
  });

  const handleSubmit = (values) => {
    const reqBody = {
      ...values,
      dob: formatDateForDob(values.dob),
    };
    openConfirmModal({
      title: 'Confirm',
      styles: () => ({
        title: {
          fontSize: '22px',
          fontWeight: 'bold',
        },
      }),
      children: <Text size="sm">Are you sure you want to save Changes?</Text>,
      confirmProps: { color: 'red' },
      labels: { confirm: 'Confirm', cancel: 'Cancel' },
      onConfirm: () => {
        updateMutate(reqBody);
      },
    });
  };

  return (
    <Drawer
      opened={opened}
      onClose={() => {
        form.reset();
        close();
      }}
      title="Edit Patient Details"
      overlayProps={{ opacity: 0.5, blur: 4 }}
      position="right"
      size="md">
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <Grid>
          <Grid.Col md={12} lg={12} sm={12} py="sm">
            <TextInput
              withAsterisk
              label="Name"
              placeholder="Ex. John Doe"
              {...form.getInputProps('name')}
            />
          </Grid.Col>
          <Grid.Col md={12} lg={12} sm={12} py="sm">
            <TextInput
              withAsterisk
              label="Phone"
              placeholder="Ex. +8801234567891"
              {...form.getInputProps('phone')}
            />
          </Grid.Col>
          <Grid.Col md={12} lg={12} sm={12} py="sm">
            <DatePickerInput
              label="Select Date of Birth"
              placeholder="Pick a date"
              value={form.values.dob}
              onChange={(e) => form.setFieldValue('dob', e)}
              mx="auto"
              maw={400}
              withAsterisk
            />
          </Grid.Col>

          <Grid.Col md={12} lg={12} sm={12} py="sm">
            <Select
              value={form.values.gender}
              onChange={(e) => form.setFieldValue('gender', e)}
              placeholder="Select Gender"
              label="Select Gender"
              withAsterisk
              data={[
                { value: 'male', label: 'Male' },
                { value: 'female', label: 'Female' },
              ]}
            />
          </Grid.Col>

          <Grid.Col md={12} lg={12} sm={12} py="sm">
            <Textarea
              label="Address"
              placeholder="Ex. kolatoli,Shugandha"
              {...form.getInputProps('address')}
            />
          </Grid.Col>
        </Grid>

        <Group position="right" mt="md">
          <Button type="submit" disabled={isLoading} className="primary_btn">
            Submit
          </Button>
        </Group>
      </form>
    </Drawer>
  );
};

export default UpdatePatientDetailsDrawer;
