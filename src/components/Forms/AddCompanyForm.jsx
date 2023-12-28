import { useForm } from '@mantine/form';
import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { createFormat } from '../../services/formats';
import { handleErrorResponse } from '../../utils/utils';
import { NotificationUtil } from '../../utils/notifications';
import {
  Button,
  Group,
  Loader,
  LoadingOverlay,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import { createCompany } from '../../services/companies';

const AddCompanyForm = ({ closeModal, refetchData }) => {
  const form = useForm({
    initialValues: {
      name: '',
    },

    validate: {
      name: (value) => (value.length < 1 ? 'Name must be given' : null),
    },
  });

  const {
    mutate: addCompanyMutate,
    isMutating,
    isLoading,
  } = useMutation({
    mutationFn: (value) => createCompany(value),
    onError: (error) => {
      handleErrorResponse(error);
    },
    onSuccess: (response) => {
      if (response) {
        refetchData();
        NotificationUtil({
          success: true,
          title: 'Success',
          message: 'Company registered successfully',
        });
        form.reset();
        closeModal();
      }
    },
  });

  const handleSubmit = (values) => {
    const reqBody = {
      ...values,
    };
    addCompanyMutate(reqBody);
  };
  return (
    <div>
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

      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <TextInput
          withAsterisk
          label="Name"
          placeholder="Ex. Beximco"
          {...form.getInputProps('name')}
        />

        <Group position="right" mt="md">
          <Button type="submit" disabled={isLoading} className="primary_btn">
            Submit
          </Button>
        </Group>
      </form>
    </div>
  );
};

export default AddCompanyForm;
