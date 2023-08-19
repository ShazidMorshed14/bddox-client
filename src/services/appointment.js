import axios from './axios';

export const fetchDoctorsAppointments = async (context) => {
  const response = await axios().get('/appointment/doctor-wise', {
    params: {
      page: context.queryKey[1],
      pageSize: context.queryKey[2],
      pid: context.queryKey[3],
      name: context.queryKey[4],
      phone: context.queryKey[5],
      pageLess: context.queryKey[6],
      aid: context.queryKey[7],
      type: context.queryKey[8],
    },
  });
  return response;
};

export const createAppointment = async (values) => {
  const response = await axios().post('/appointment/create', values);
  return response;
};

export const updateAppointmentDetails = async (values, id) => {
  const response = await axios().put(`/appointment/update/${id}`, values);
  return response;
};
