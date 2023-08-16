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
    },
  });
  return response;
};
