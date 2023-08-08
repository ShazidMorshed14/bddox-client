import axios from './axios';

export const fetchDoctorsPatients = async (context) => {
  const response = await axios().get('/patient/doctor-wise', {
    params: {
      page: context.queryKey[1],
      pageSize: context.queryKey[2],
      pid: context.queryKey[3],
      name: context.queryKey[4],
      phone: context.queryKey[5],
      pageLess: context.queryKey[6],
    },
  });
  return response;
};

export const createPaient = async (values) => {
  const response = await axios().post('/patient/create', values);
  return response;
};

export const updatePatientDetails = async (values, id) => {
  const response = await axios().put(`/patient/update/${id}`, values);
  return response;
};

export const deletePatient = async (id) => {
  const response = await axios().delete(`/patient/delete/${id}`);
  return response;
};
