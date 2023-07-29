import { authContext } from '../constants/const';
import { handleErrorResponse } from '../utils/utils';
import axios from './axios';

export const SignInApi = async (email, password) => {
  try {
    const { data } = await axios().post('/auth/login', {
      authContext: authContext,
      identifier: email,
      password: password,
    });

    return data;
  } catch (err) {
    handleErrorResponse(err);
    throw err;
  }
};

export const verifyOtp = async (sessionId, otp) => {
  try {
    const { data } = await axios().post(`/auth/mfa/${sessionId}`, {
      otp: otp,
    });
    return data;
  } catch (err) {
    handleErrorResponse(err);
  }
};

export const logout = async () => {
  try {
    const { data } = await axios().post('/auth/logout');
    return data;
  } catch (error) {
    handleErrorResponse(error);
  }
};
