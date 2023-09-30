import axios from './axios';

export const fetchDoctorsFormatList = async () => {
  const response = await axios().get('/format/doctor-wise');
  return response;
};

export const createFormat = async (values) => {
  const response = await axios().post('/format/create', values);
  return response;
};

export const updateFormat = async (values, id) => {
  const response = await axios().put(`/format/update/${id}`, values);
  return response;
};
