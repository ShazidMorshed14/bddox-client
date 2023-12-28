import { Box, Button, Flex, TextInput } from '@mantine/core';
import React from 'react';
import { textFieldStyle } from '../../constants/styles';
import { useQueryClient } from '@tanstack/react-query';
import { useForm } from '@mantine/form';

const DemoForm = () => {
  const queryClient = useQueryClient();

  const form = useForm({
    initialValues: {
      firstName: '',
      email: '',
    },

    validate: {
      firstName: (value) =>
        value.length < 1 ? 'first name must be given' : null,
      email: (value) => (value.length < 1 ? 'email name must be given' : null),
    },
  });

  const handleSubmit = (values) => {
    console.log(values);
  };

  return (
    <div className="card">
      <div className="card-body">
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <Flex direction="column" justify="flex-start" gap={10}>
            <div className="form-title">Basic Form</div>
            <div>
              <p className="form-label">First Name</p>
              <TextInput
                placeholder="Ex. Shazid Morshed"
                styles={textFieldStyle}
                {...form.getInputProps('firstName')}
              />
            </div>

            <div>
              <p className="form-label">Email</p>
              <TextInput
                placeholder="Ex. Shazid Morshed"
                styles={textFieldStyle}
                {...form.getInputProps('email')}
              />
            </div>

            <Flex my="sm" justify="flex-end" gap={10}>
              <Button size="sm" className="danger_btn">
                Cancel
              </Button>
              <Button size="sm" className="primary_btn" type="submit">
                Save
              </Button>
            </Flex>
          </Flex>
        </form>
      </div>
    </div>
  );
};

export default DemoForm;
