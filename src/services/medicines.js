import axios from './axios';

export const fetchDoctorsMedicines = async (context) => {
  const response = await axios().get('/medicine/doctor-wise', {
    params: {
      page: context.queryKey[1],
      pageSize: context.queryKey[2],
      name: context.queryKey[3],
      formatId: context.queryKey[4],
      genericId: context.queryKey[5],
      companyId: context.queryKey[6],
      status: context.queryKey[7],
      pageLess: context.queryKey[8],
    },
  });
  return response;
};
export const createMedicine = async (values) => {
  const response = await axios().post('/medicine/create', values);
  return response;
};

export const updateMedicine = async (values, id) => {
  const response = await axios().put(`/medicine/update/${id}`, values);
  return response;
};
