import {
  createStyles,
  Paper,
  Title,
  Text,
  TextInput,
  Button,
  Container,
  Group,
  Anchor,
  Center,
  Box,
  rem,
  Stack,
  Flex,
  Alert,
  PasswordInput,
} from '@mantine/core';
import { IconAlertTriangle, IconArrowLeft } from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import COLORS from '../../constants/colors';
import { useState } from 'react';

const useStyles = createStyles((theme) => ({
  title: {
    fontSize: rem(26),
    fontWeight: 900,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  controls: {
    [theme.fn.smallerThan('xs')]: {
      flexDirection: 'column-reverse',
    },
  },

  control: {
    [theme.fn.smallerThan('xs')]: {
      width: '100%',
      textAlign: 'center',
    },
  },
}));

const ResetPassword = () => {
  const { classes } = useStyles();
  const [passMatch, setPassMatch] = useState(true);

  const form = useForm({
    initialValues: {
      password: '',
      againPassword: '',
    },

    validate: {
      password: (value) =>
        value.length < 6 ? 'Password must be 6 Charecters' : null,
      againPassword: (value) =>
        value.length < 6 ? 'Password must be 6 Charecters' : null,
    },
  });

  const handleSubmit = (values) => {
    if (form.values.password !== form.values.againPassword) {
      form.reset();
      setPassMatch(false);
    } else {
      console.log(values);
    }
  };

  return (
    <Stack
      align="center"
      justify="center"
      sx={{
        height: '100vh',
      }}>
      <Container size={460} my={30}>
        <Title className={classes.title} align="center">
          Reset Password
        </Title>
        <Text c="dimmed" fz="sm" ta="center" py="sm">
          Please Enter your new password
        </Text>

        <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
          <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
            <PasswordInput
              withAsterisk
              label="Password"
              placeholder="Ex. 123456"
              required
              {...form.getInputProps('password')}
              py="sm"
            />
            <PasswordInput
              withAsterisk
              label="Repeat Password"
              placeholder="Ex. 123456"
              required
              {...form.getInputProps('againPassword')}
              py="sm"
            />
            <Box py="xs">
              {!passMatch &&
                !form.values.password &&
                !form.values.againPassword && (
                  <Alert
                    icon={<IconAlertTriangle size="1rem" />}
                    title=""
                    color="red">
                    Password didnt matched
                  </Alert>
                )}
            </Box>
            <Box miw={300}>
              <Flex justify="flex-end" py="sm">
                <Button className="primary_btn" type="submit">
                  Change Password
                </Button>
              </Flex>
            </Box>
          </form>
        </Paper>
      </Container>
    </Stack>
  );
};

export default ResetPassword;
