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
} from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import COLORS from '../../constants/colors';

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

const ForgotPassword = () => {
  const { classes } = useStyles();

  const form = useForm({
    initialValues: {
      otp: '',
    },

    validate: {
      otp: (value) => (value.length < 6 ? 'OTP must be 6 digit' : null),
    },
  });

  const handleSubmit = (values) => {
    console.log(values);
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
          Forgot your password?
        </Title>
        <Text c="dimmed" fz="sm" ta="center" py="sm">
          Enter 6 Digit OTP sent to your Email!
        </Text>

        <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
          <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
            <TextInput
              withAsterisk
              label="OTP"
              placeholder="Ex. 123456"
              required
              {...form.getInputProps('otp')}
              py="sm"
            />
            <Group position="apart" mt="lg" className={classes.controls}>
              <Anchor color="dimmed" size="sm" className={classes.control}>
                <Center inline>
                  <IconArrowLeft size={rem(12)} stroke={1.5} />
                  <Box ml={5}>Back to the login page</Box>
                </Center>
              </Anchor>
              <Button className="primary_btn" type="submit">
                Reset password
              </Button>
            </Group>
            <Group
              position="apart"
              mt="md"
              className={classes.controls}
              py="sm">
              <Text c="dimmed" size="sm">
                Cant Get OTP ?{' '}
              </Text>
              <Text color={COLORS.redMatt} style={{ cursor: 'pointer' }}>
                Resend
              </Text>
            </Group>
          </form>
        </Paper>
      </Container>
    </Stack>
  );
};

export default ForgotPassword;
