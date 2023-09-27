import axios from './axios';

export const fetchDoctorsTags = async (context) => {
  const response = await axios().get('/tag/doctor-wise', {
    params: {
      type: context.queryKey[1],
      value: context.queryKey[2],
    },
  });
  return response;
};

export const createTag = async (values) => {
  const response = await axios().post('/tag/create', values);
  return response;
};
