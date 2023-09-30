import axios from './axios';

export const fetchDoctorsGenericList = async () => {
  const response = await axios().get('/generic/doctor-wise');
  return response;
};

export const createGeneric = async (values) => {
  const response = await axios().post('/generic/create', values);
  return response;
};

export const updateGeneric = async (values, id) => {
  const response = await axios().put(`/generic/update/${id}`, values);
  return response;
};
