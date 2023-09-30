import axios from './axios';

export const fetchDoctorsCompanyList = async () => {
  const response = await axios().get('/company/doctor-wise');
  return response;
};

export const createCompany = async (values) => {
  const response = await axios().post('/company/create', values);
  return response;
};

export const updateCompany = async (values, id) => {
  const response = await axios().put(`/company/update/${id}`, values);
  return response;
};
