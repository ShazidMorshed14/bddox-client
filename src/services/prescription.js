import axios from './axios';

// export const fetchProductsOnly = async (context) => {
//   const response = await axios().get('/products', {
//     params: {
//       page: context.queryKey[1],
//       searchKey: context.queryKey[2],
//       pageSize: context.queryKey[3],
//     },
//   });
//   return response;
// };

export const fetchDoctorPrescription = async () => {
  const response = await axios().get('/prescription/doctor-prescription');
  return response;
};

export const createPrescription = async (values) => {
  const response = await axios().post('/prescription/create', values);
  return response;
};

export const updatePrescription = async (values) => {
  const response = await axios().put(
    `prescription/update/${values.id}`,
    values,
  );
  return response;
};
