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
  Modal,
  LoadingOverlay,
  Stack,
  Loader,
} from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { formatDateForDob } from '../../constants/const';
import { createPaient } from '../../services/patient';
import { handleErrorResponse } from '../../utils/utils';
import { NotificationUtil } from '../../utils/notifications';
import { fetchDoctorsFormatList } from '../../services/formats';
import { fetchDoctorsGenericList } from '../../services/generics';
import { fetchDoctorsCompanyList } from '../../services/companies';
import { IconPlus } from '@tabler/icons-react';
import AddFormatForm from '../Forms/AddFormatForm';
import AddGenericForm from '../Forms/AddGenericForm';
import AddCompanyForm from '../Forms/AddCompanyForm';
import { createMedicine } from '../../services/medicines';

const AddMedicineDrawer = ({ opened, close, refetchData }) => {
  const queryClient = useQueryClient();

  const [addFormatModal, setAddFormatModal] = useState(false);
  const [addGenericModal, setAddGenericModal] = useState(false);
  const [addCompanyModal, setAddCompanyModal] = useState(false);

  const form = useForm({
    initialValues: {
      name: '',
      formatId: '',
      genericId: '',
      companyId: '',
    },

    validate: {
      name: (value) => (value.length < 1 ? 'Name must be given' : null),
      formatId: (value) => (value.length < 1 ? 'Format must be given' : null),
      genericId: (value) => (value.length < 1 ? 'Generic must be given' : null),
      companyId: (value) => (value.length < 1 ? 'Company must be given' : null),
    },
  });

  const {
    mutate: addMedicineMutate,
    isMutating,
    isLoading,
  } = useMutation({
    mutationFn: (value) => createMedicine(value),
    onError: (error) => {
      handleErrorResponse(error);
    },
    onSuccess: (response) => {
      if (response) {
        refetchData();
        NotificationUtil({
          success: true,
          title: 'Success',
          message: 'Medicine Added successfully',
        });
        form.reset();
        close();
      }
    },
  });

  const handleSubmit = (values) => {
    addMedicineMutate(values);
  };

  //fetch all formatIds
  const {
    data: formatsData,
    isLoading: formatsIsLoading,
    error: formatsError,
    isFetching: formatsIsFetching,
    refetch: formatsRefetch,
  } = useQuery({
    queryKey: ['fetch-formats'],
    queryFn: fetchDoctorsFormatList,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    retry: false,
  });

  //fetch all generics
  const {
    data: genericsData,
    isLoading: genericsIsLoading,
    error: genericsError,
    isFetching: genericsIsFetching,
    refetch: genericsRefetch,
  } = useQuery({
    queryKey: ['fetch-generics'],
    queryFn: fetchDoctorsGenericList,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    retry: false,
  });

  //fetch all companies
  const {
    data: companiesData,
    isLoading: companiesIsLoading,
    error: companiesError,
    isFetching: companiesIsFetching,
    refetch: companiesRefetch,
  } = useQuery({
    queryKey: ['fetch-companies'],
    queryFn: fetchDoctorsCompanyList,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    retry: false,
  });

  if (formatsIsLoading || genericsIsLoading || companiesIsLoading) {
    return <div>Loading.....</div>;
  }

  const { formats } = formatsData.data.data;
  const { generics } = genericsData.data.data;
  const { companies } = companiesData.data.data;

  return (
    <Drawer
      opened={opened}
      closeOnClickOutside={false}
      onClose={() => {
        form.reset();
        setAddFormatModal(false);
        setAddGenericModal(false);
        setAddCompanyModal(false);
        close();
      }}
      title={<Text fw={600}>Add Medicine</Text>}
      overlayProps={{ opacity: 0.5, blur: 4 }}
      position="right"
      size="md">
      <LoadingOverlay
        visible={isLoading}
        overlayBlur={2}
        loader={
          <Stack justify="center" align="center">
            <Text fw={600}>Please wait...</Text>
            <Loader size="sm" />
          </Stack>
        }
      />

      {/* add new format modal*/}
      <Modal
        opened={addFormatModal}
        onClose={() => setAddFormatModal(false)}
        title={<Text fw={600}>Add Format</Text>}
        centered
        closeOnClickOutside={false}>
        <AddFormatForm
          closeModal={() => setAddFormatModal(false)}
          refetchData={formatsRefetch}
        />
      </Modal>

      {/* add new generic modal*/}
      <Modal
        opened={addGenericModal}
        onClose={() => setAddGenericModal(false)}
        title={<Text fw={600}>Add Generic</Text>}
        centered
        closeOnClickOutside={false}>
        <AddGenericForm
          closeModal={() => setAddGenericModal(false)}
          refetchData={genericsRefetch}
        />
      </Modal>

      {/* add new company modal*/}
      <Modal
        opened={addCompanyModal}
        onClose={() => setAddCompanyModal(false)}
        title={<Text fw={600}>Add Company</Text>}
        centered
        closeOnClickOutside={false}>
        <AddCompanyForm
          closeModal={() => setAddCompanyModal(false)}
          refetchData={companiesRefetch}
        />
      </Modal>

      <Flex gap={10} py="sm">
        <Button
          onClick={() => setAddFormatModal(true)}
          className="primary_btn"
          leftIcon={<IconPlus />}
          size="xs">
          Format
        </Button>
        <Button
          onClick={() => setAddGenericModal(true)}
          className="primary_btn"
          leftIcon={<IconPlus />}
          size="xs">
          Generic
        </Button>
        <Button
          onClick={() => setAddCompanyModal(true)}
          className="primary_btn"
          leftIcon={<IconPlus />}
          size="xs">
          Company
        </Button>
      </Flex>
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <Flex direction="column" gap={20}>
          <TextInput
            withAsterisk
            label="Name"
            placeholder="Ex. Napa"
            {...form.getInputProps('name')}
          />
          <Select
            value={form.values.formatId}
            onChange={(e) => form.setFieldValue('formatId', e)}
            placeholder="Select Fomrat"
            label="Select Format"
            searchable
            withAsterisk
            withinPortal
            nothingFound="No Data Found"
            data={formats?.map((f) => {
              return { label: f.name, value: f._id };
            })}
          />
          <Select
            value={form.values.genericId}
            onChange={(e) => form.setFieldValue('genericId', e)}
            placeholder="Select Generic"
            label="Select Generic"
            searchable
            withAsterisk
            withinPortal
            nothingFound="No Data Found"
            data={generics?.map((g) => {
              return { label: g.name, value: g._id };
            })}
          />

          <Select
            value={form.values.companyId}
            onChange={(e) => form.setFieldValue('companyId', e)}
            placeholder="Select Company"
            label="Select Company"
            searchable
            withAsterisk
            withinPortal
            nothingFound="No Data Found"
            data={companies?.map((c) => {
              return { label: c.name, value: c._id };
            })}
          />
          <Group position="right" mt="md">
            <Button type="submit" disabled={isLoading} className="primary_btn">
              Submit
            </Button>
          </Group>
        </Flex>
      </form>
    </Drawer>
  );
};

export default AddMedicineDrawer;
