import { yupResolver } from '@hookform/resolvers/yup';
import {
  ActionIcon,
  Alert,
  Button,
  Flex,
  Input,
  Paper,
  PasswordInput,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { IconAlertTriangle, IconMail } from '@tabler/icons-react';
import React, { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SmallLogo from '../../assets/logo/logo-small.png';
import COLORS from '../../constants/colors';
import { SignInApi } from '../../services/auth';
import { SignInSchema } from '../../validators/SignIn';
import { NotificationUtil } from '../../utils/notifications';
import { authActions } from '../../store/reducers/authReducer';
const SignInButton = (props) => {
  // This component is used for performance, otherwise the whole page will re-render on each keystroke
  // Because of useWatch, which is a stupid design from react-hooks-form
  // Because of this, only this component will re-render on keystroke, not the whole page

  const { control, isSubmitting } = props;

  const formVal = useWatch({ control });

  return (
    <Button
      className={
        isSubmitting || !formVal.email || !formVal.password ? '' : 'primary_btn'
      }
      radius="xs"
      type="submit"
      size="md"
      disabled={
        isSubmitting || !formVal.email || !formVal.password
        // This is intentional, I do not wish to use isValid here
      }
      loading={isSubmitting}>
      Login
    </Button>
  );
};

const SignIn = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [signInError, setSignInError] = useState(false);
  const [isPasswordResetRequired, setisPasswordResetRequiredfirst] =
    useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(SignInSchema),
  });

  const handleSignIn = async (values) => {
    try {
      const response = await SignInApi(values.email, values.password);
      if (response.status === 200) {
        NotificationUtil({
          success: true,
          title: 'Welcome',
          message: 'Login Successful!',
        });
        dispatch(
          authActions.signin({
            user: response.data.user,
            accessToken: response.data.token,
            //refreshToken: response.data.refreshToken,
          }),
        );
        navigate('/dashboard');
      }
    } catch (err) {
      setSignInError(true);
      if (err.response.status === 403) {
        if (err.response.data.isPasswordResetRequired) {
          setisPasswordResetRequiredfirst(true);
          setErrorMessage(err.response.data.message);
          navigate('/forgot-password?context=first-time');
        }
        if (err.response.data.hasPasswordExpired) {
          setisPasswordResetRequiredfirst(true);
          setErrorMessage(err.response.data.message);
          navigate('/forgot-password?context=expired');
        }
      }
      if (err.response.status === 401) {
        setisPasswordResetRequiredfirst(true);
        setErrorMessage(err.response.data.message);
      }
    }
  };

  return (
    <Stack
      align="center"
      justify="center"
      sx={{
        height: '100vh',
      }}>
      <Paper p="lg" radius="md" shadow="md">
        <form onSubmit={handleSubmit(handleSignIn)}>
          <Stack
            sx={{
              width: 310,
            }}>
            <Flex justify="center" align="center">
              <img src={SmallLogo} alt="logo" style={{ height: '5rem' }} />
            </Flex>
            <Title order={2} size="h4" align="left" py="xs">
              Welcome to BDDox! 👋
            </Title>
            <Text align="left" color={COLORS.fontSecondary}>
              Please sign-in to your account and start the adventure
            </Text>
            {signInError && (
              <Alert
                icon={<IconAlertTriangle size="1rem" />}
                title=""
                color="red">
                {isPasswordResetRequired
                  ? errorMessage
                  : 'Invalid Login Credentials'}
              </Alert>
            )}
            <div>
              <Input
                {...register('email')}
                type="text"
                rightSection={<IconMail />}
                placeholder="Your Email"
                size="md"
              />
              {errors && errors.email && <p>{errors.email.message}</p>}
            </div>
            <div>
              <PasswordInput
                {...register('password')}
                withAsterisk
                placeholder="Your Password"
                size="md"
              />
              {errors && errors.password && <p>{errors.password.message}</p>}
            </div>

            <ActionIcon
              onClick={() => navigate('/forget-password')}
              variant="transparent"
              color="indigo"
              sx={{
                width: 'max-content',
              }}>
              <Text align="left">Forgot Password?</Text>
            </ActionIcon>

            <SignInButton isSubmitting={isSubmitting} control={control} />
          </Stack>
        </form>
      </Paper>
    </Stack>
  );
};

export default SignIn;
