import * as yup from 'yup';

export const SignInSchema = yup.object().shape({
  email: yup.string().email('Invalid Email').required('Email is required'),
  password: yup.string().required('Password is required'),
});
